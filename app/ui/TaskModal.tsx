import { TeamMember } from "../lib/definitions";
import TaskDetailCard from "./TaskDetailCard";

export default function TaskModal({
  projectId,
  task,
  onClose,
  teamMembers,
}: {
  projectId?: string;
  task: any | null;
  onClose: () => void;
  teamMembers: TeamMember[];
}) {
  if (task === null) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center"
      onClick={onClose}
    >
      <TaskDetailCard
        projectId={projectId}
        teamMembers={teamMembers}
        task={task}
        onClose={onClose}
      />
    </div>
  );
}
