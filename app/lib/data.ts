"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import {
  Activity,
  Invite,
  LatestTasksData,
  Notification,
  Project,
  Task,
  TeamMember,
} from "./definitions";
import { QueryResultRow, sql } from "@vercel/postgres";

export async function getLatestTasks(userId: string): Promise<Task[]> {
  noStore();
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const data = await sql<Task>`
      SELECT 
            t.id,
          t.title,
          t.status,
          t.description,
          TO_CHAR(t.created_at, 'DD-MM-YYYY') AS created_at,
          TO_CHAR(t.updated_at, 'DD-MM-YYYY') AS updated_at,
          t.priority,
          t.created_by AS created_by_id,
          t.assigned_to AS assigned_to_id,
          p.title AS project_title,
          t.project_id,
          json_build_object('id', at.id, 'name', at.name, 'avatar', at.image) AS assigned_to,
          json_build_object('id', cb.id, 'name', cb.name, 'avatar', cb.image) AS created_by,
          t.est_hours,
          t.actual_hours,
          TO_CHAR(t.start_date, 'DD-MM-YYYY') AS start_date,
          TO_CHAR(t.due_date, 'DD-MM-YYYY') AS due_date,
          TO_CHAR(t.completed_at, 'DD-MM-YYYY') AS completed_at
        FROM 
            tasks t
        JOIN 
            projects p ON t.project_id = p.id
        JOIN 
            users AS cb ON t.created_by = cb.id
        JOIN 
            users AS at ON t.assigned_to = at.id
        WHERE 
            t.assigned_to = ${userId}
        ORDER BY 
        CASE 
            WHEN t.status = 'in progress' THEN 1
            WHEN t.status = 'on hold' THEN 2
            WHEN t.status = 'completed' THEN 3
        END,
        t.updated_at DESC
        LIMIT 4;`;
    return data.rows;
  } catch (error) {
    console.error("Error getting latest tasks: ", error);
    throw error;
  }
}

export async function getLatestTasksData(
  userId: string
): Promise<LatestTasksData> {
  noStore();
  try {
    const data = await sql<LatestTasksData>`
    SELECT 
        COUNT(*) AS totalTasks,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) AS completedTasks,
        COUNT(CASE WHEN status = 'in progress' THEN 1 END) AS inProgressTasks
    FROM 
        tasks
    WHERE 
        assigned_to = ${userId};
    `;
    return data.rows[0];
  } catch (error) {
    console.error("Error getting latest tasks data: ", error);
    throw error;
  }
}

export async function getProjectsInProgress(
  userId: string
): Promise<Project[]> {
  noStore();
  try {
    const data = await sql<Project>`
      SELECT 
      p.id::text,
      p.title,
      p.description,
      p.status,
      TO_CHAR(p.updated_at, 'dd-mm-yyyy') AS updated_at,
      (SELECT COUNT(*) FROM comments c WHERE c.project_id = p.id) AS comments,
      admin_user.name AS admin_name,
      admin_user.image AS admin_avatar,
      (
        SELECT json_agg(json_build_object(
          'id', tm.user_id::text,
          'name', u.name,
          'avatar', u.image
        ))
        FROM team_members tm
        JOIN users u ON tm.user_id = u.id
        WHERE tm.team_id IN (SELECT team_id FROM project_teams WHERE project_id = p.id)
      ) AS team,
       (SELECT COUNT(*) FROM tasks t WHERE t.project_id = p.id) AS total_tasks,
        COALESCE(
          ROUND(
            (COUNT(CASE WHEN t.status = 'completed' THEN 1 END)::float / 
            NULLIF(COUNT(t.id), 0) * 100
            )::numeric
          ), 
          0
        ) AS percent_done
    FROM 
      projects p
    JOIN 
      project_teams pt ON p.id = pt.project_id
    JOIN 
      team_members tm ON pt.team_id = tm.team_id
    LEFT JOIN
      users admin_user ON p.created_by = admin_user.id
    LEFT JOIN
      tasks t ON p.id = t.project_id
    WHERE 
      tm.user_id = ${userId}
      AND p.status = 'in progress'
    GROUP BY 
      p.id, admin_user.name, admin_user.image
    ORDER BY 
      p.updated_at DESC;`;
    return data.rows;
  } catch (error) {
    console.error("Error getting projects in progress: ", error);
    throw error;
  }
}

export async function getProjects(userId: string): Promise<Project[]> {
  noStore();
  try {
    const data = await sql<Project>`
      SELECT 
        p.id::text,
        p.title,
        p.description,
        p.status,
        TO_CHAR(p.updated_at,'dd-mm-yyyy') AS updated_at,
        (SELECT COUNT(*) FROM comments c WHERE c.project_id = p.id) AS comments,
        admin_user.name AS admin_name,
        admin_user.image AS admin_avatar,
        (
          SELECT json_agg(json_build_object(
            'id', tm.user_id::text,
            'name', u.name,
            'avatar', u.image
          ))
          FROM team_members tm
          JOIN users u ON tm.user_id = u.id
          WHERE tm.team_id IN (SELECT team_id FROM project_teams WHERE project_id = p.id)
        ) AS team,
       (SELECT COUNT(*) FROM tasks t WHERE t.project_id = p.id) AS total_tasks,
        COALESCE(
          ROUND(
            (COUNT(CASE WHEN t.status = 'completed' THEN 1 END)::float / 
            NULLIF(COUNT(t.id), 0) * 100
            )::numeric
          ), 
          0
        ) AS percent_done
      FROM 
        projects p
      JOIN 
        project_teams pt ON p.id = pt.project_id
      JOIN 
        team_members tm ON pt.team_id = tm.team_id
      LEFT JOIN
        users admin_user ON p.created_by = admin_user.id
      LEFT JOIN
        tasks t ON p.id = t.project_id
      WHERE 
        tm.user_id = ${userId}
      GROUP BY 
        p.id, admin_user.name, admin_user.image
      ORDER BY 
        p.updated_at DESC;`;
    return data.rows;
  } catch (error) {
    console.error("Error getting projects: ", error);
    throw error;
  }
}

export async function getTasks(userId: string): Promise<Task[]> {
  noStore();
  try {
    const data = await sql<Task>`
        SELECT 
            t.id,
          t.title,
          t.status,
          t.description,
          TO_CHAR(t.created_at, 'DD-MM-YYYY') AS created_at,
          TO_CHAR(t.updated_at, 'DD-MM-YYYY') AS updated_at,
          t.priority,
          t.created_by AS created_by_id,
          t.assigned_to AS assigned_to_id,
          p.title AS project_title,
          t.project_id,
          json_build_object('id', at.id, 'name', at.name, 'avatar', at.image) AS assigned_to,
          json_build_object('id', cb.id, 'name', cb.name, 'avatar', cb.image) AS created_by,
          t.est_hours,
          t.actual_hours,
          TO_CHAR(t.start_date, 'DD-MM-YYYY') AS start_date,
          TO_CHAR(t.due_date, 'DD-MM-YYYY') AS due_date,
          TO_CHAR(t.completed_at, 'DD-MM-YYYY') AS completed_at
        FROM 
            tasks t
        JOIN 
            projects p ON t.project_id = p.id
        JOIN 
            users AS cb ON t.created_by = cb.id
        JOIN 
            users AS at ON t.assigned_to = at.id
        WHERE 
            t.assigned_to = ${userId}
        ORDER BY 
          t.due_date DESC;`;
    return data.rows;
  } catch (error) {
    console.error("Error getting tasks: ", error);
    throw error;
  }
}

export async function getProjectById(
  projectId: string
): Promise<QueryResultRow> {
  noStore();
  try {
    const data = await sql`
    SELECT 
      p.*,
      TO_CHAR(p.created_at, 'DD-MM-YYYY') as created_at,
      u.name AS created_by_name,
      u.image AS created_by_avatar,
      u.email AS created_by_email,
      COUNT(CASE WHEN t.status = 'completed' THEN 1 END) AS finished_tasks,
      SUM(t.actual_hours) AS tracked_hours,
      (COUNT(CASE WHEN t.status = 'completed' THEN 1 END) * 100.0 / NULLIF(COUNT(*), 0)) AS efficiency
    FROM projects p
    JOIN users u ON p.created_by = u.id
    LEFT JOIN tasks t ON p.id = t.project_id
    WHERE p.id = ${projectId}
    GROUP BY p.id,u.name,u.image,u.email;`;

    return data.rows[0];
  } catch (error) {
    console.error("Error getting project by id: ", error);
    throw error;
  }
}

export async function getProjectTasks(
  projectId: string
): Promise<QueryResultRow[]> {
  noStore();
  try {
    const data = await sql`
    SELECT 
      t.id,
      t.title,
      t.status,
      t.description,
      TO_CHAR(t.created_at, 'DD-MM-YYYY') AS created_at,
      TO_CHAR(t.updated_at, 'DD-MM-YYYY') AS updated_at,
      t.priority,
      t.created_by,
      t.assigned_to,
      p.title AS project_title,
      t.project_id,
      at.name AS assigned_to_name,
      at.image AS assigned_to_avatar,
      cb.name AS created_by_name,
      cb.image AS created_by_avatar,
      t.est_hours,
      t.actual_hours,
      TO_CHAR(t.start_date, 'DD-MM-YYYY') AS start_date,
      TO_CHAR(t.due_date, 'DD-MM-YYYY') AS due_date,
      TO_CHAR(t.completed_at, 'DD-MM-YYYY') AS completed_at
    FROM tasks t
    JOIN projects p ON t.project_id = p.id
    JOIN users at ON t.assigned_to = at.id
    JOIN users cb ON t.created_by = cb.id
    WHERE t.project_id = ${projectId}
    ORDER BY 
    
    t.due_date ASC ;`;
    return data.rows;
  } catch (error) {
    console.error("Error getting project tasks: ", error);
    throw error;
  }
}

export async function getTeamMembers(projectId: string): Promise<TeamMember[]> {
  noStore();
  try {
    const data = await sql<TeamMember>`
      SELECT DISTINCT u.id, u.name, u.image AS avatar, tm.role, tm.id AS team_member_id
      FROM users u
      JOIN team_members tm ON u.id = tm.user_id
      JOIN project_teams pt ON tm.team_id = pt.team_id
      JOIN projects p ON pt.project_id = p.id
      WHERE p.id = ${projectId}
      ORDER BY tm.role ASC ;`;
    return data.rows;
  } catch (error) {
    console.error("Error getting team members: ", error);
    throw error;
  }
}

export async function getNotifications(
  userId: string
): Promise<Notification[]> {
  noStore();
  try {
    const data = await sql<Notification>`
      SELECT *
      FROM 
          notifications
      WHERE 
          user_id = ${userId} AND is_read = false
      ORDER BY 
          created_at DESC;`;
    return data.rows;
  } catch (error) {
    console.error("Error getting notifications: ", error);
    throw error;
  }
}

export async function getActivities(
  projectId: string,
  offset: number
): Promise<{ result: Activity[]; offset: number | null }> {
  noStore();
  try {
    const data = await sql<Activity>`
    SELECT 
        a.id,
        a.details,
        a.message,
        to_char(a.created_at, 'YYYYMMDDHH24MISS') as created_at,
        u.name AS user_name,
        u.image AS user_avatar
    FROM 
        activities a
    JOIN 
        users u ON a.user_id = u.id
    WHERE 
        a.project_id = ${projectId}
    ORDER BY 
        a.created_at DESC
    LIMIT 2
    OFFSET ${offset};`;
    if (data.rows.length === 0) {
      return { result: [], offset: null };
    }
    const result = data.rows;
    return { result, offset: offset + 2 };
  } catch (error) {
    console.error("Error getting activities: ", error);
    throw error;
  }
}

export async function getInvites(projectId: string): Promise<Invite[]> {
  noStore();
  try {
    const data = await sql<Invite>`
      SELECT
        i.id,
        i.invitee_email,
        i.status,
        i.created_at,
        i.expires_at
      FROM invitations i
      WHERE project_id = ${projectId} AND status != 'accepted';
    `;
    return data.rows;
  } catch (error) {
    console.error("Error getting invites: ", error);
    throw error;
  }
}

export async function deleteInvite(formData: FormData) {
  noStore();
  try {
    const invite_id = formData.get("invite_id") as string;
    await sql`
    DELETE FROM invitations
    WHERE id = ${invite_id};`;
    revalidatePath("/dashboard/projects/[id]");
  } catch (error) {
    console.error("Error deleting invite: ", error);
    throw error;
  }
}
