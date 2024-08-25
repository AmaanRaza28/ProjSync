const { db, sql } = require("@vercel/postgres");
const {
  users,
  projects,
  tasks,
  teams,
  teamMembers,
  projectTeams,
  comments,
  activities,
} = require("../app/lib/placeholder-data.ts");
const bcrypt = require("bcrypt");

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS users (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                avatar TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            `;
    console.log("Created users table");

    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
                INSERT INTO users (id,first_name,last_name,email,password,avatar)
                VALUES (${user.id}, ${user.firstName},${user.lastName}, ${user.email}, ${hashedPassword}, ${user.avatar})
                ON CONFLICT (id) DO NOTHING
                `;
      })
    );

    console.log("Inserted users:", insertedUsers.length);
    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedProjects(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS projects (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            status VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_by UUID REFERENCES users(id) NOT NULL
        );
    `;
    console.log("Created projects table");

    const insertedProjects = await Promise.all(
      projects.map(async (project) => {
        return client.sql`
            INSERT INTO projects (id,title, description, created_by, status)
            VALUES (${project.id},${project.name},${project.description}, ${project.adminId}, ${project.status})
            ON CONFLICT (id) DO NOTHING
        `;
      })
    );
    console.log("Inserted projects:", insertedProjects.length);

    return {
      createTable,
      projects: insertedProjects,
    };
  } catch (error) {
    console.error("Error seeding projects:", error);
    throw error;
  }
}

async function seedTasks(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS tasks (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) NOT NULL,
        priority VARCHAR(50) NOT NULL,
        project_id UUID REFERENCES projects(id) NOT NULL,
        assigned_to UUID REFERENCES users(id) NOT NULL,
        created_by UUID REFERENCES users(id) NOT NULL,
        est_hours INT,
        actual_hours INT,
        start_date DATE NOT NULL,
        due_date DATE,
        completed_at DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`;

    console.log("Created tasks table");

    const insertedTasks = await Promise.all(
      tasks.map(async (task) => {
        return client.sql`
          INSERT INTO tasks (id, title, status, description, priority, due_date, start_date, assigned_to, created_by, project_id, est_hours)
          VALUES (${task.id}, ${task.title}, ${task.status}, ${task.description}, ${task.priority}, ${task.due_date}, ${task.start_date}, ${task.assigned_to}, ${task.assigned_by}, ${task.project_id}, ${task.est_hours})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log("Inserted tasks:", insertedTasks.length);
    return {
      createTable,
      tasks: insertedTasks,
    };
  } catch (error) {
    console.error("Error seeding tasks:", error);
    throw error;
  }
}

async function seedTeams(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS teams (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );`;
    console.log("Created teams table");

    const insertedTeams = await Promise.all(
      teams.map(async (team) => {
        return client.sql`
          INSERT INTO teams (id)
          VALUES (${team.id})
          ON CONFLICT (id) DO NOTHING
        `;
      })
    );
    console.log("Inserted teams:", insertedTeams.length);
    return {
      createTable,
      teams: insertedTeams,
    };
  } catch (err) {
    console.error("Error adding users to teams:", err);
  }
}

async function seedTeamMembers(client) {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  try {
    const createTable = await client.sql`
      CREATE TABLE team_members (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID REFERENCES users(id),
      team_id UUID REFERENCES teams(id),
      role VARCHAR(50),
      UNIQUE(user_id, team_id)
    );`;
    console.log("Created team members table");

    const insertedTeamMembers = await Promise.all(
      teamMembers.map(async (teamMember) => {
        return client.sql`
          INSERT INTO team_members (id, user_id, team_id, role)
          VALUES (${teamMember.id}, ${teamMember.user_id}, ${teamMember.team_id}, ${teamMember.role})
          ON CONFLICT (id) DO NOTHING
        `;
      })
    );

    console.log("Inserted team members:", insertedTeamMembers.length);
    return {
      createTable,
      teamMembers: insertedTeamMembers,
    };
  } catch (err) {
    console.error("Error adding users to teams:", err);
  }
}

async function seedProjectTeams(client) {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  try {
    const createTable = await client.sql`
      CREATE TABLE project_teams (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      project_id UUID REFERENCES projects(id),
      team_id UUID REFERENCES teams(id),
      UNIQUE(project_id, team_id)
    );`;
    console.log("Created project_teams table");

    const insertedProjectTeams = await Promise.all(
      projectTeams.map(async (projectTeam) => {
        return client.sql`
          INSERT INTO project_teams (id, project_id, team_id)
          VALUES (${projectTeam.id}, ${projectTeam.project_id}, ${projectTeam.team_id})
          ON CONFLICT (id) DO NOTHING
        `;
      })
    );

    console.log("Inserted project teams:", insertedProjectTeams.length);
    return {
      createTable,
      projectTeams: insertedProjectTeams,
    };
  } catch (err) {
    console.error("Error adding projectTeams:", err);
  }
}

async function seedComments(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      project_id UUID REFERENCES projects(id),
      user_id UUID REFERENCES users(id),
      content TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );`;
    console.log("Created comments table");

    const insertedComments = await Promise.all(
      comments.map(async (comment) => {
        return client.sql`
          INSERT INTO comments (project_id, user_id, content)
          VALUES (${comment.project_id}, ${comment.user_id}, ${comment.content})
          ON CONFLICT (id) DO NOTHING
        `;
      })
    );

    console.log("Inserted comments:", insertedComments.length);
    return {
      createTable,
      comments: insertedComments,
    };
  } catch (error) {
    console.error("Error seeding comments:", error);
    throw error;
  }
}

async function seedActivities(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS activities (
      id SERIAL PRIMARY KEY,
      project_id UUID REFERENCES projects(id),
      user_id UUID REFERENCES users(id),
      action VARCHAR(255) NOT NULL,
      details TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );`;
    console.log("Created activities table");

    const insertedActivities = await Promise.all(
      activities.map(async (activity) => {
        return client.sql`
          INSERT INTO activities (project_id, user_id, action, details)
          VALUES (${activity.project_id}, ${activity.user_id}, ${activity.action}, ${activity.details})
          ON CONFLICT (id) DO NOTHING
        `;
      })
    );

    console.log("Inserted activities:", insertedActivities.length);
    return {
      createTable,
      activities: insertedActivities,
    };
  } catch (error) {
    console.error("Error seeding activities:", error);
    throw error;
  }
}

async function seedInvitiations(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS invitations (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      project_id UUID REFERENCES projects(id),
      invited_by UUID REFERENCES users(id),
      invitee_email VARCHAR(255) NOT NULL,
      status VARCHAR(50) NOT NULL,
      token TEXT DEFAULT uuid_generate_v4(),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      expires_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP + interval '7 days'
    );`;
    console.log("Created invitations table");
  } catch (error) {
    console.error("Error seeding invitations:", error);
    throw error;
  }
}

async function seedNotifications(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS notifications (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID REFERENCES users(id),
      type VARCHAR(50) NOT NULL,
      content TEXT NOT NULL,
      is_read BOOLEAN DEFAULT FALSE,
      link TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );`;
    console.log("Created notifications table");
  } catch (error) {
    console.error("Error seeding notifications:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedProjects(client);
  await seedTasks(client);
  await seedTeams(client);
  await seedTeamMembers(client);
  await seedProjectTeams(client);
  await seedComments(client);
  await seedActivities(client);
  await seedInvitiations(client);

  await client.end();
}

main().catch((err) => {
  console.error("an error occured while seeding the db", err);
});
