const { v4: uuidv4 } = require("uuid");

const users = [
  {
    id: uuidv4(),
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "password123", // Note: This should be hashed in production
    avatar: "https://example.com/avatar1.png",
  },
  {
    id: uuidv4(),
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    password: "securePassword",
    avatar: "https://example.com/avatar2.png",
  },
  {
    id: uuidv4(),
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    password: "alicePassword",
    avatar: "https://example.com/avatar3.png",
  },
  {
    id: uuidv4(),
    firstName: "Bob",
    lastName: "Brown",
    email: "bob.brown@example.com",
    password: "bobPassword",
    avatar: "https://example.com/avatar4.png",
  },
  // Add more users as needed
];

const getRandomStatus = () => {
  const statuses = ["completed", "in progress", "on hold"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const projects = [
  {
    id: uuidv4(),
    name: "Project Alpha",
    description: "This is project Alpha description.",
    adminId: users[0].id, // User ID of the project admin
    status: getRandomStatus(),
  },
  {
    id: uuidv4(),
    name: "Project Beta",
    description: "Description for project Beta.",
    adminId: users[1].id,
    status: getRandomStatus(),
  },
  {
    id: uuidv4(),
    name: "Project Gamma",
    description: "Description for project Gamma.",
    adminId: users[2].id,
    status: getRandomStatus(),
  },
  {
    id: uuidv4(),
    name: "Project Delta",
    description: "Description for project Delta.",
    adminId: users[3].id,
    status: getRandomStatus(),
  },
  {
    id: uuidv4(),
    name: "Project Epsilon",
    description: "Description for project Epsilon.",
    adminId: users[0].id,
    status: getRandomStatus(),
  },
  {
    id: uuidv4(),
    name: "Project Zeta",
    description: "Description for project Zeta.",
    adminId: users[1].id,
    status: getRandomStatus(),
  },
  {
    id: uuidv4(),
    name: "Project Eta",
    description: "Description for project Eta.",
    adminId: users[2].id,
    status: getRandomStatus(),
  },
  {
    id: uuidv4(),
    name: "Project Theta",
    description: "Description for project Theta.",
    adminId: users[3].id,
    status: getRandomStatus(),
  },
];

const tasks = [
  // At least 10 tasks per user
  ...Array.from({ length: 10 }).map(() => ({
    id: uuidv4(),
    title: "Task for John",
    description: "Description of task for John.",
    status: getRandomStatus(),
    priority: "high",
    project_id: projects[Math.floor(Math.random() * 2) + 1].id,
    assigned_to: users[0].id,
    assigned_by: users[1].id,
    start_date: new Date("2024-07-01"),
    due_date: new Date("2024-07-15"),
    est_hours: Math.floor(Math.random() * 20) + 1,
  })),
  ...Array.from({ length: 10 }).map(() => ({
    id: uuidv4(),
    title: "Task for Jane",
    description: "Description of task for Jane.",
    status: getRandomStatus(),
    priority: "medium",
    project_id: projects[Math.floor(Math.random() * 2) + 2].id,
    assigned_to: users[1].id,
    assigned_by: users[2].id,
    start_date: new Date("2024-07-05"),
    due_date: new Date("2024-07-20"),
  })),
  ...Array.from({ length: 10 }).map(() => ({
    id: uuidv4(),
    title: "Task for Alice",
    description: "Description of task for Alice.",
    status: getRandomStatus(),
    priority: "low",
    project_id: projects[Math.floor(Math.random() * 2) + 4].id,
    assigned_to: users[2].id,
    assigned_by: users[3].id,
    start_date: new Date("2024-07-10"),
    due_date: new Date("2024-07-25"),
  })),
  ...Array.from({ length: 10 }).map(() => ({
    id: uuidv4(),
    title: "Task for Bob",
    description: "Description of task for Bob.",
    status: getRandomStatus(),
    priority: "high",
    project_id: projects[Math.floor(Math.random() * 2) + 5].id,
    assigned_to: users[3].id,
    assigned_by: users[0].id,
    start_date: new Date("2024-07-15"),
    due_date: new Date("2024-07-30"),
  })),
  // Add more tasks as needed
];

const teams = [
  {
    id: uuidv4(),
  },
  {
    id: uuidv4(),
  },
  {
    id: uuidv4(),
  },
  {
    id: uuidv4(),
  },
  {
    id: uuidv4(),
  },
  {
    id: uuidv4(),
  },
  {
    id: uuidv4(),
  },
  {
    id: uuidv4(),
  },
  // Add more teams as needed
];

const teamMembers = [
  {
    id: uuidv4(),
    user_id: users[0].id, // User ID
    team_id: teams[0].id, // Team ID
    role: "admin",
  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    team_id: teams[1].id,
    role: "admin",
  },
  {
    id: uuidv4(),
    user_id: users[2].id,
    team_id: teams[2].id,
    role: "admin",
  },
  {
    id: uuidv4(),
    user_id: users[3].id,
    team_id: teams[3].id,
    role: "admin",
  },
  // Each user is a member in another team
  {
    id: uuidv4(),
    user_id: users[0].id,
    team_id: teams[1].id,
    role: "member",
  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    team_id: teams[2].id,
    role: "member",
  },
  {
    id: uuidv4(),
    user_id: users[2].id,
    team_id: teams[3].id,
    role: "member",
  },
  {
    id: uuidv4(),
    user_id: users[3].id,
    team_id: teams[0].id,
    role: "member",
  },
  // Add more team members as needed
];

const projectTeams = [
  {
    id: uuidv4(),
    project_id: projects[0].id, // Project ID
    team_id: teams[0].id, // Team ID
  },
  {
    id: uuidv4(),
    project_id: projects[1].id,
    team_id: teams[1].id,
  },
  {
    id: uuidv4(),
    project_id: projects[2].id,
    team_id: teams[2].id,
  },
  {
    id: uuidv4(),
    project_id: projects[3].id,
    team_id: teams[3].id,
  },
  {
    id: uuidv4(),
    project_id: projects[4].id,
    team_id: teams[4].id,
  },
  {
    id: uuidv4(),
    project_id: projects[5].id,
    team_id: teams[5].id,
  },
  {
    id: uuidv4(),
    project_id: projects[6].id,
    team_id: teams[6].id,
  },
  {
    id: uuidv4(),
    project_id: projects[7].id,
    team_id: teams[7].id,
  },
  // Add more project teams as needed
];

const comments = [
  {
    id: uuidv4(),
    project_id: projects[0].id, // Project ID
    user_id: users[0].id, // User ID
    content: "This is a comment on project Alpha.",
  },
  {
    id: uuidv4(),
    project_id: projects[1].id,
    user_id: users[1].id,
    content: "This is a comment on project Beta.",
  },
  {
    id: uuidv4(),
    project_id: projects[2].id,
    user_id: users[2].id,
    content: "This is a comment on project Gamma.",
  },
  {
    id: uuidv4(),
    project_id: projects[3].id,
    user_id: users[3].id,
    content: "This is a comment on project Delta.",
  },
  // Add more comments as needed
];

const activities = [
  {
    id: uuidv4(),
    project_id: projects[0].id, // Project ID
    user_id: users[0].id, // User ID
    action: "Created the project.",
    details: "John created project Alpha.",
  },
  {
    id: uuidv4(),
    project_id: projects[1].id,
    user_id: users[1].id,
    action: "Updated the project description.",
    details: "Jane updated the description for project Beta.",
  },
  {
    id: uuidv4(),
    project_id: projects[2].id,
    user_id: users[2].id,
    action: "Changed the project status.",
    details: "Alice changed the status of project Gamma to active.",
  },
  {
    id: uuidv4(),
    project_id: projects[3].id,
    user_id: users[3].id,
    action: "Added a new task.",
    details: "Bob added a new task to project Delta.",
  },
  // Add more activities as needed
];

module.exports = {
  users,
  projects,
  tasks,
  teams,
  teamMembers,
  projectTeams,
  comments,
  activities,
};
