"use client";
import { deleteTask, updateTaskStatus } from "@/app/lib/actions";
import { Task } from "@/app/lib/definitions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CircleCheck,
  CircleMinus,
  Clock,
  MoreHorizontal,
  Pencil,
  Trash,
  UserPlus,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ActionDropdown({ task }: { task: Task }) {
  const session = useSession();
  const userId = session?.data?.user?.id;
  const canEditDelete = task.created_by_id === userId;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {task.assigned_to_id === userId && (
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Update Status</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    onClick={() => updateTaskStatus(task.id, "in progress")}
                  >
                    <Badge
                      variant="outline"
                      className="px-2 py-1 rounded border-none font-medium bg-[#f1fbfe] text-[#477d86]"
                    >
                      <Clock className="w-4 h-4 mr-1" />
                      In progress
                    </Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => updateTaskStatus(task.id, "on hold")}
                  >
                    <Badge
                      variant="outline"
                      className="px-2 py-1 rounded border-none font-medium bg-purple-100 text-purple-700"
                    >
                      <CircleMinus className="w-4 h-4 mr-1" />
                      On hold
                    </Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => updateTaskStatus(task.id, "completed")}
                  >
                    <Badge
                      variant="outline"
                      className="px-2 py-1 rounded border-none font-medium bg-[#ebfbe7] text-[#4d6744]"
                    >
                      <CircleCheck className="w-4 h-4 mr-1" />
                      Completed
                    </Badge>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          )}
          {canEditDelete && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => deleteTask(task.id)}>
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
