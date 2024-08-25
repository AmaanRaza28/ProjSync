"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { Notification } from "./definitions";
const { v4: uuidv4 } = require("uuid");

const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.enum(["in progress", "completed", "on hold"]),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
});

const CreateProjects = ProjectSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export async function createProject(formData: FormData) {
  const { title, description, status, createdBy } = CreateProjects.parse({
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    createdBy: formData.get("createdBy"),
  });
  const projectId = uuidv4();
  await sql`INSERT INTO projects (id,title, description, status, created_by)
    VALUES (${projectId},${title}, ${description}, ${status}, ${createdBy})`;

  const teamId = uuidv4();
  await sql`INSERT INTO teams (id) VALUES (${teamId})`;

  await sql`INSERT INTO project_teams (project_id, team_id)
    VALUES (${projectId}, ${teamId})`;

  await sql`INSERT INTO team_members (team_id, user_id, role) VALUES (${teamId}, ${createdBy}, 'admin')`;

  const details = `created ${title}`;
  await sql`INSERT INTO activities (project_id, user_id, action, details)
    VALUES (${projectId}, ${createdBy}, 'created_project', ${details})`;

  revalidatePath("/dashboard/projects");
  redirect(`/dashboard/projects/${projectId}`);
}

export async function deleteTask(taskId: string) {
  await sql`DELETE FROM tasks WHERE id = ${taskId}`;
  revalidatePath("/dashboard/tasks");
  revalidatePath("/dashboard/projects/[id]");
}

export async function updateTaskStatus(taskId: string, status: string) {
  await sql`
  UPDATE tasks 
  SET status = ${status}, updated_at = NOW()
  WHERE id = ${taskId}`;
  if (status === "completed") {
    const assigned_to =
      await sql`SELECT assigned_to FROM tasks WHERE id = ${taskId}`;
    const task_title = await sql`SELECT title FROM tasks WHERE id = ${taskId}`;
    const details = `finished the task: ${task_title.rows[0].title}`;
    await sql`INSERT INTO activities (project_id, user_id, action, details)
      VALUES (
        (SELECT project_id FROM tasks WHERE id = ${taskId}),
        ${assigned_to.rows[0].assigned_to},
        'completed_task',
        ${details}
      )`;
  }
  revalidatePath("/dashboard/tasks");
  revalidatePath("/dashboard/projects/[id]");
}

const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.enum(["completed", "in progress", "on hold"]),
  priority: z.enum(["low", "medium", "high"]),
  assigned_to: z.string(),
  dueDate: z.string(),
  project_id: z.string(),
});

const UpdateTask = TaskSchema.omit({
  id: true,
});

export async function updateTask(formData: FormData, taskId: string) {
  const {
    title,
    description,
    status,
    priority,
    dueDate,
    assigned_to,
    project_id,
  } = UpdateTask.parse({
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    priority: formData.get("priority"),
    dueDate: formData.get("dueDate"),
    assigned_to: formData.get("assigned_to"),
    project_id: formData.get("project_id"),
  });
  await sql`
  UPDATE tasks 
  SET title = ${title}, description = ${description}, status = ${status}, priority = ${priority}, due_date = ${dueDate},assigned_to = ${assigned_to} , updated_at = NOW()
  WHERE id = ${taskId}`;
  revalidatePath("/dashboard/tasks");
  revalidatePath(`/dashboard/projects/${project_id}`);
}

const CreateTask = TaskSchema.omit({
  id: true,
  project_id: true,
});

export async function createTask(
  formData: FormData,
  projectId: string,
  created_by: string
) {
  const { title, description, status, priority, dueDate, assigned_to } =
    CreateTask.parse({
      title: formData.get("title"),
      description: formData.get("description"),
      status: formData.get("status"),
      priority: formData.get("priority"),
      dueDate: formData.get("dueDate"),
      assigned_to: formData.get("assigned_to"),
    });
  const start_date = new Date().toISOString().split("T")[0];
  const taskId = uuidv4();

  await sql`INSERT INTO tasks (id, title, description, status, priority, due_date, assigned_to, project_id,created_by, start_date)
    VALUES (${taskId},${title}, ${description}, ${status}, ${priority}, ${dueDate}, ${assigned_to}, ${projectId}, ${created_by}, ${start_date})`;

  const projectResult = await sql`
    SELECT title FROM projects WHERE id = ${projectId}
  `;
  const projectName = projectResult.rows[0].title;

  const createdByResult = await sql`
    SELECT name FROM users WHERE id = ${created_by}
  `;
  const createdByName = createdByResult.rows[0].name;

  await sql`
      INSERT INTO notifications (user_id, type, link, assigned_by, project_name, task_title)
      VALUES (
        ${assigned_to}, 
        'task_assigned', 
        ${`/dashboard/projects/${projectId}`}, 
        ${createdByName}, 
        ${projectName}, 
        ${title}
      )
    `;
  const assigned_to_name =
    await sql`SELECT name FROM users WHERE id = ${assigned_to}`;
  const details = `assigned ${title} to ${assigned_to_name.rows[0].name}`;
  await sql`
      INSERT INTO activities (project_id, user_id, action, details)
      VALUES (${projectId}, ${created_by}, 'assigned_task', ${details})
    `;
  revalidatePath("/dashboard/tasks");
  revalidatePath("/dashboard/notifications");
  revalidatePath("/dashboard/projects/[id]");
}

const UpdateProject = ProjectSchema.omit({
  id: true,
  createdAt: true,
  createdBy: true,
  updatedAt: true,
});

export async function updateProject(formData: FormData, projectId: string) {
  const { title, description, status } = UpdateProject.parse({
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
  });
  const oldProject = await sql`SELECT * FROM projects WHERE id = ${projectId}`;
  await sql`
  UPDATE projects 
  SET title = ${title}, description = ${description}, status = ${status}, updated_at = NOW()
  WHERE id = ${projectId}`;

  if (oldProject.rows[0].status !== status) {
    const details = `changed the project status to ${status}`;
    await sql`
      INSERT INTO activities (project_id, user_id, action, details)
      VALUES (${projectId}, ${oldProject.rows[0].created_by}, 'updated_project', ${details})
    `;
  }
  if (oldProject.rows[0].title !== title) {
    const details = `Updated the project title`;
    await sql`
      INSERT INTO activities (project_id, user_id, action, details)
      VALUES (${projectId}, ${oldProject.rows[0].created_by}, 'updated_project', ${details})
    `;
  }
  if (oldProject.rows[0].description !== description) {
    const details = `Updated the project description`;
    await sql`
      INSERT INTO activities (project_id, user_id, action, details)
      VALUES (${projectId}, ${oldProject.rows[0].created_by}, 'updated_project', ${details})
    `;
  }
  revalidatePath("/dashboard/projects");
  revalidatePath("/dashboard/projects/[id]");
}

export async function inviteMembers(
  emails: string[],
  userId: string,
  projectId: string
) {
  const status = "pending";

  const projectResult = await sql`
    SELECT title FROM projects WHERE id = ${projectId}
  `;
  const projectName = projectResult.rows[0]?.title || "Unknown Project";

  const userResult = await sql`
    SELECT name FROM users WHERE id = ${userId}
  `;
  const inviterName = userResult.rows[0]?.name || "Unknown User";

  const existingMembers = await sql`
    SELECT DISTINCT tm.user_id 
    FROM team_members tm
    JOIN project_teams pt ON tm.team_id = pt.team_id
    WHERE pt.project_id = ${projectId}
  `;
  const existingMemberIds = new Set(
    existingMembers.rows.map((row) => row.user_id)
  );

  const invitationResults = await Promise.all(
    emails.map(async (email) => {
      // Check if user already exists
      const user = await sql`SELECT id FROM users WHERE email = ${email}`;

      if (user.rows.length > 0) {
        const userIdFromEmail = user.rows[0].id;

        // Check if user is already a project member
        if (existingMemberIds.has(userIdFromEmail)) {
          return { email, result: "already_member" };
        }

        const invitationId = uuidv4();
        // Create invitation
        await sql`
          INSERT INTO invitations (id,invitee_email, invited_by, project_id, status)
          VALUES (${invitationId},${email}, ${userId}, ${projectId}, ${status})
        `;

        // Create notification for existing user
        const link = `/dashboard/projects/${projectId}`;
        await sql`
          INSERT INTO notifications (user_id, type, associated_id, project_name, link, invited_by)
          VALUES (
            ${userIdFromEmail},
            'project_invitation',
            ${invitationId},
            ${projectName},
            ${link},
            ${inviterName}
          )
        `;

        return { email, result: "invited_existing_user" };
      } else {
        // Create invitation for non-existing user
        await sql`
          INSERT INTO invitations (invitee_email, invited_by, project_id, status)
          VALUES (${email}, ${userId}, ${projectId}, ${status})
        `;

        return { email, result: `invited: ${email}` };
      }
    })
  );
  revalidatePath("/dashboard/notifications");

  return invitationResults;
}

export async function declineInvite(
  notificationId: string,
  invitationId: string
) {
  await sql`
    UPDATE invitations
    SET status = 'declined'
    WHERE id = ${invitationId}
  `;
  await sql`
  DELETE FROM notifications WHERE associated_id = ${notificationId}`;
  revalidatePath("/dashboard/notifications");
}

export async function acceptInvite(
  notificationId: string,
  invitationId: string,
  userId: string
) {
  // Start a transaction
  await sql`BEGIN`;

  try {
    const invitation = await sql`
      SELECT project_id
      FROM invitations
      WHERE id = ${invitationId}
      `;
    if (invitation.rows.length === 0) {
      try {
        await sql`
        DELETE FROM notifications
        WHERE id = ${notificationId}
      `;

        revalidatePath("/dashboard/notifications");
        throw new Error("Invitation not found");
      } catch (e) {
        console.error(e);
      }
    }

    // Update invitation status
    await sql`
      UPDATE invitations
      SET status = 'accepted'
      WHERE id = ${invitationId}
    `;

    // Get project and team information
    const invitationInfo = await sql`
      SELECT i.project_id, pt.team_id
      FROM invitations i
      JOIN project_teams pt ON i.project_id = pt.project_id
      WHERE i.id = ${invitationId}
      LIMIT 1
    `;

    if (invitationInfo.rows.length === 0) {
      throw new Error("Invitation or project team not found");
    }

    const { project_id, team_id } = invitationInfo.rows[0];

    // Add user to team
    await sql`
      INSERT INTO team_members (user_id, team_id, role)
      VALUES (${userId}, ${team_id}, 'member')
      ON CONFLICT (user_id, team_id) DO NOTHING
    `;

    // Delete the notification
    await sql`
      DELETE FROM notifications
      WHERE id = ${notificationId}
    `;

    // Create an activity log
    const details = `joined the team`;
    await sql`
      INSERT INTO activities (project_id, user_id, action, details)
      VALUES (${project_id}, ${userId}, 'joined_project', ${details})
    `;

    // Commit the transaction
    await sql`COMMIT`;

    revalidatePath("/dashboard/projects");

    return { success: true, message: "Invitation accepted successfully" };
  } catch (error) {
    // Rollback the transaction in case of any error
    await sql`ROLLBACK`;
    console.error("Error accepting invitation:", error);
    return { success: false, message: "Failed to accept invitation" };
  }
}

export async function notificationRead(notification: Notification) {
  await sql`
    UPDATE notifications
    SET is_read = true
    WHERE id = ${notification.id}
  `;
  revalidatePath("/dashboard/notifications");
  redirect(notification.link);
}

interface FormState {
  message: string | null;
  errors: Record<string, string[]>;
}

export async function addComment(
  projectId: string,
  userId: string,
  formData: FormData
): Promise<FormState> {
  try {
    const comment = formData.get("comment");
    if (typeof comment !== "string") {
      return {
        message: null,
        errors: { comment: ["Comment must be a string"] },
      };
    }
    if (comment.length === 0) {
      return {
        message: null,
        errors: { comment: ["Comment cannot be empty"] },
      };
    }
    const action = "commented";
    const details = `commented`;

    const result = await sql`
      INSERT INTO activities (project_id, user_id, message, action, details)
      VALUES (${projectId}, ${userId}, ${comment}, ${action}, ${details});
    `;

    revalidatePath(`/dashboard/projects/${projectId}`);
    return { message: "Comment added successfully", errors: {} };
  } catch (e) {
    console.error(e);
    return { message: null, errors: { server: ["Failed to add comment"] } };
  }
}

export async function deleteProject(projectId: string) {
  try {
    // Start a transaction
    await sql`BEGIN`;

    // Delete related records in project_teams table
    await sql`
      DELETE FROM project_teams
      WHERE project_id = ${projectId}
    `;

    // Delete related tasks
    await sql`
      DELETE FROM tasks
      WHERE project_id = ${projectId}
    `;

    // Delete related invitations
    await sql`
      DELETE FROM invitations
      WHERE project_id = ${projectId}
    `;

    // Delete related activities
    await sql`
      DELETE FROM activities
      WHERE project_id = ${projectId}
    `;

    // Delete the project
    const result = await sql`
      DELETE FROM projects
      WHERE id = ${projectId}
      RETURNING id
    `;

    if (result.rowCount === 0) {
      throw new Error("Project not found");
    }

    // Commit the transaction
    await sql`COMMIT`;

    // Revalidate the projects page to reflect the changes
    revalidatePath("/projects");
    redirect("/projects");
  } catch (error) {
    // Rollback the transaction in case of any error
    await sql`ROLLBACK`;
    console.error("Failed to delete project and related data:", error);
    return {
      success: false,
      message: "Failed to delete project and related data",
    };
  }
}

export async function updateTeamMemberRole(
  teamMemberId: string,
  role: string,
  projectId: string
) {
  console.log("updating");
  await sql`
    UPDATE team_members
    SET role = ${role}
    WHERE id = ${teamMemberId}
  `;
  revalidatePath(`/dashboard/projects/${projectId}`);
}

export async function removeTeamMember(
  teamMemberId: string,
  projectId: string
) {
  await sql`
    DELETE FROM team_members
    WHERE id = ${teamMemberId}
  `;
  revalidatePath(`/dashboard/projects/${projectId}`);
}
