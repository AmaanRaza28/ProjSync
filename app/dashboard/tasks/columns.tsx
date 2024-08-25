"use client";

import { Task } from "@/app/lib/definitions";
import ActionDropdown from "@/app/ui/ActionDropdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck, CircleMinus, Clock } from "lucide-react";
import clsx from "clsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { convertDate } from "@/lib/utils";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Title",
    enableHiding: false,
    cell: ({ row }) => {
      const { title } = row.original;
      return (
        <span className="text-base">
          {title.length > 20 ? `${title.slice(0, 20)}...` : title}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status } = row.original;
      return (
        <Badge
          variant="outline"
          className={clsx(
            "px-2 py-1 rounded border-none font-medium",
            {
              "bg-[#ebfbe7] text-[#4d6744] ": status === "completed",
            },
            {
              "bg-[#f1fbfe] text-[#477d86] ": status === "in progress",
            },
            {
              "bg-purple-100 text-purple-700 ": status === "on hold",
            }
          )}
        >
          {status === "in progress" ? (
            <Clock className="w-4 h-4 mr-1" />
          ) : status === "completed" ? (
            <CircleCheck className="w-4 h-4 mr-1" />
          ) : (
            <CircleMinus className="w-4 h-4 mr-1" />
          )}
          {status === "in progress"
            ? "In Progress"
            : status === "completed"
            ? "Completed"
            : "On Hold"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "assigned_to",
    header: "Assigned To",
    cell: ({ row }) => {
      const { assigned_to } = row.original;
      return (
        <div className="flex items-center justify-center space-x-2 rounded-full">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Avatar className=" w-9 h-9 mr-2">
                  <AvatarImage src={assigned_to.avatar} />
                  <AvatarFallback>{assigned_to.name[0]}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent className="w-auto">
                {assigned_to.name}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    accessorKey: "created_by",
    header: () => <div>Admin</div>,
    cell: ({ row }) => {
      const { created_by } = row.original;
      return (
        <div className="mx-auto">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Avatar className=" w-9 h-9 ">
                  <AvatarImage src={created_by.avatar} />
                  <AvatarFallback>{created_by.name[0]}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>{created_by.name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const { priority } = row.original;
      return (
        <div className="flex items-center">
          <div
            className={clsx("w-2 h-2 rounded-full", {
              "bg-[#ec9038]": priority === "high",
              "bg-[#5a9dd7]": priority === "medium",
              "bg-green-500": priority === "low",
            })}
          />
          <span className="ml-2">
            {priority === "high"
              ? "High"
              : priority === "medium"
              ? "Medium"
              : "Low"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "project_title",
    header: "Project",
  },

  {
    accessorKey: "est_runtime",
    header: "Runtime",
    cell({ row }) {
      const { est_hours } = row.original;
      return <span>{est_hours} hours</span>;
    },
  },
  {
    accessorKey: "due_date",
    header: "Due Date",
    cell: ({ row }) => convertDate(row.original.due_date),
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => convertDate(row.original.created_at),
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const task = row.original;

      return <ActionDropdown task={task} />;
    },
  },
];
