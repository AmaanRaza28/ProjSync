"use client";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCallback, useState } from "react";
import { Task, TeamMember } from "@/app/lib/definitions";
import TaskModal from "../TaskModal";
import ActionDropdown from "../ActionDropdown";
import { CircleCheck, CircleMinus, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function LatestTasksTable({
  latestTasks,
}: {
  latestTasks: Task[];
}) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  const handleRowClick = useCallback(async (row: any) => {
    setSelectedTask(row);
    setModalOpen(true);

    try {
      const response = await fetch(
        `/api/team-members?projectId=${row.project_id}`
      );
      if (!response.ok) throw new Error("Failed to fetch team members");
      const fetchedTeamMembers = await response.json();
      setTeamMembers(fetchedTeamMembers);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  }, []);

  const closeModal = () => {
    setSelectedTask(null);
  };

  return (
    <div>
      <Table className="min-w-full bg-white">
        <TableHeader>
          <TableRow className="border-t border-b">
            <TableHead className="">Title</TableHead>
            <TableHead className="">Admin</TableHead>
            <TableHead className="">Project</TableHead>
            <TableHead className=" ">Status</TableHead>
            <TableHead className="">Due date</TableHead>
            <TableHead className=" "></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {latestTasks.map((todo) => (
            <TableRow
              key={todo.id}
              className=" border-b-0"
              onClick={() => handleRowClick(todo)}
            >
              <TableCell className="py-2">{todo.title}</TableCell>
              <TableCell className="py-2">
                <div className="flex items-center space-x-2 rounded-full">
                  <Avatar className=" w-8 h-8 ">
                    <AvatarImage src={todo.created_by.avatar} />
                    <AvatarFallback>{todo.created_by.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-normal">
                    {todo.created_by.name.split(" ")[0]}
                  </span>
                </div>
              </TableCell>
              <TableCell className="py-2">{todo.project_title}</TableCell>

              <TableCell className="py-2">
                <Badge
                  variant="outline"
                  className={clsx(
                    "px-2 py-1 rounded border-none font-medium",
                    {
                      "bg-[#ebfbe7] text-[#4d6744] ":
                        todo.status === "completed",
                    },
                    {
                      "bg-[#f1fbfe] text-[#477d86] ":
                        todo.status === "in progress",
                    },
                    {
                      "bg-purple-100 text-purple-700 ":
                        todo.status === "on hold",
                    }
                  )}
                >
                  {todo.status === "in progress" ? (
                    <Clock className="w-4 h-4 mr-1" />
                  ) : todo.status === "completed" ? (
                    <CircleCheck className="w-4 h-4 mr-1" />
                  ) : (
                    <CircleMinus className="w-4 h-4 mr-1" />
                  )}
                  {todo.status === "in progress"
                    ? "In Progress"
                    : todo.status === "completed"
                    ? "Completed"
                    : "On Hold"}
                </Badge>
              </TableCell>
              <TableCell className="py-2">
                <Badge
                  variant="outline"
                  className="px-2 py-1 rounded border-none bg-gray-100 text-gray-700 font-normal"
                >
                  {formatDate(todo.due_date)}
                </Badge>
              </TableCell>
              <TableCell className="py-2">
                <ActionDropdown task={todo} />
              </TableCell>
            </TableRow>
          ))}
          {latestTasks.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No tasks found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {isModalOpen && (
        <TaskModal
          teamMembers={teamMembers}
          task={selectedTask}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
