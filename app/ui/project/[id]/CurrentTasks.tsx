"use client";

import { DataTable } from "@/app/dashboard/projects/[id]/data-table";
import { Task, TeamMember } from "@/app/lib/definitions";
import { columns } from "@/app/dashboard/projects/[id]/columns";

export default function CurrentTasks({
  isUserAdmin,
  userId,
  teamMembers,
  tasks,
  projectId,
}: {
  isUserAdmin: boolean;
  userId: string;
  teamMembers: TeamMember[];
  tasks: Task[];
  projectId: string;
}) {
  return (
    <>
      <DataTable
        columns={columns}
        data={tasks}
        userId={userId}
        isUserAdmin={isUserAdmin}
        projectId={projectId}
        teamMembers={teamMembers}
      />
    </>
  );
}
