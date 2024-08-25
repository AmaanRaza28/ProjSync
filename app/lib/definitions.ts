export interface Task {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in progress" | "on hold";
  priority: "low" | "medium" | "high";
  project_title: string;
  project_id: string;
  assigned_to_id: string;
  assigned_to: {
    name: string;
    avatar: string;
  };
  created_by_id: string;
  created_at: string;
  updated_at: string;
  created_by: {
    name: string;
    avatar: string;
  };
  est_hours: number;
  actual_hours: number;
  start_date: string;
  due_date: string;
  completed_at: string;
}

export interface LatestTasksData {
  totaltasks: number;
  completedtasks: number;
  inprogresstasks: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in progress" | "on hold";
  updated_at: string;
  comments: number;
  admin_name: string;
  admin_avatar: string;
  team: {
    id: string;
    name: string;
    avatar: string;
  }[];
  percent_done: number;
}

export interface TeamMember {
  id: string;
  team_member_id: string;
  name: string;
  avatar: string;
  role: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  is_read: boolean;
  link: string;
  created_at: string;
  associated_id?: string;
  invited_by?: string;
  assigned_by?: string;
  new_status?: string;
  project_name?: string;
  task_title?: string;
  changed_by?: string;
}

export interface Invite {
  id: string;
  invitee_email: string;
  status: string;
  created_at: string;
  expires_at: string;
}
export interface Activity {
  id: string;
  details: string;
  created_at: string;
  user_name: string;
  user_avatar: string;
  message?: string;
}
