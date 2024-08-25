import { useState } from "react";
import { updateTask } from "../lib/actions";
import { CircleCheck, CircleMinus, Clock, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { convertDate } from "@/lib/utils";
import EditTaskForm from "./project/[id]/EditTaskForm";
import { TeamMember } from "../lib/definitions";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";

export default function TaskDetailCard({
  projectId,
  task,
  onClose,
  teamMembers,
  initialEditMode,
}: {
  projectId?: string;
  task: any;
  onClose: () => void;
  teamMembers: TeamMember[];
  initialEditMode?: boolean;
}) {
  const session = useSession();
  const userId = session?.data?.user?.id;
  const [editMode, setEditMode] = useState(initialEditMode);

  const user = teamMembers.find((member) => member.id === userId);
  const isUserAdmin = user?.role === "admin" || user?.role === "co-admin";

  const formAction = (formData: FormData) => {
    setEditMode(false);
    onClose();
    updateTask(formData, task.id);
  };

  return (
    <div
      className="bg-white w-1/3 p-7 rounded-lg shadow-lg mx-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {editMode ? (
        <EditTaskForm
          projectId={projectId}
          task={task}
          formAction={formAction}
          setEditMode={setEditMode}
          teamMembers={teamMembers}
        />
      ) : (
        <div className="grid gap-6">
          <div className="flex items-start justify-between">
            <div className="grid gap-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium">{task.title}</h3>
                <Badge
                  variant="outline"
                  className={clsx(
                    "ml-5 px-2 py-1 rounded border-none font-medium",
                    {
                      "bg-[#ebfbe7] text-[#4d6744] ": task.priority === "low",
                    },
                    {
                      "bg-[#f1fbfe] text-[#477d86] ":
                        task.priority === "medium",
                    },
                    {
                      "bg-orange-100 text-orange-700 ":
                        task.priority === "high",
                    }
                  )}
                >
                  <div className="flex items-center">
                    <div
                      className={clsx("w-2 h-2 rounded-full", {
                        "bg-[#ec9038]": task.priority === "high",
                        "bg-[#5a9dd7]": task.priority === "medium",
                        "bg-green-500": task.priority === "low",
                      })}
                    />
                    <span className="ml-2">
                      {task.priority === "high"
                        ? "High"
                        : task.priority === "medium"
                        ? "Medium"
                        : "Low"}
                    </span>
                  </div>
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Badge
                  variant="outline"
                  className={clsx(
                    "mt-2 px-2 py-1 rounded border-none font-medium",
                    {
                      "bg-[#ebfbe7] text-[#4d6744] ":
                        task.status === "completed",
                    },
                    {
                      "bg-[#f1fbfe] text-[#477d86] ":
                        task.status === "in progress",
                    },
                    {
                      "bg-purple-100 text-purple-700 ":
                        task.status === "on hold",
                    }
                  )}
                >
                  {task.status === "in progress" ? (
                    <Clock className="w-4 h-4 mr-1" />
                  ) : task.status === "completed" ? (
                    <CircleCheck className="w-4 h-4 mr-1" />
                  ) : (
                    <CircleMinus className="w-4 h-4 mr-1" />
                  )}
                  {task.status === "in progress"
                    ? "In Progress"
                    : task.status === "completed"
                    ? "Completed"
                    : "On Hold"}
                </Badge>
              </div>
            </div>
            <div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={onClose}
              >
                <XIcon className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </div>
          <div className="grid gap-4">
            <p className="text-muted-foreground mb-3">{task.description}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="rounded-full">
                  <AvatarImage src={task.assigned_to.avatar} alt="Avatar" />
                  <AvatarFallback>{task.assigned_to.name[0]}</AvatarFallback>
                </Avatar>
                <div className="grid gap-0.5">
                  <span className="font-medium">{task.assigned_to.name}</span>
                  <span className="text-xs text-muted-foreground">
                    Assigned to
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="rounded-full">
                  <AvatarImage src={task.created_by.avatar} alt="Avatar" />
                  <AvatarFallback>{task.created_by.name[0]}</AvatarFallback>
                </Avatar>
                <div className="grid gap-0.5">
                  <span className="font-medium">{task.created_by.name}</span>
                  <span className="text-xs text-muted-foreground">
                    Created by
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1">
                <span className="text-xs font-medium text-muted-foreground">
                  Start Date
                </span>
                <span>{convertDate(task.start_date)}</span>
              </div>
              <div className="grid gap-1">
                <span className="text-xs font-medium text-muted-foreground">
                  Due Date
                </span>
                <span>{convertDate(task.due_date)}</span>
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center  gap-2">
              <span className="text-xs font-medium text-muted-foreground">
                Project
              </span>
              <div className="font-medium">{task.project_title}</div>
              {(task.created_by_id === userId || isUserAdmin) && (
                <Button
                  onClick={() => setEditMode(true)}
                  className="ml-auto bg-black text-white"
                >
                  Edit Task
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
