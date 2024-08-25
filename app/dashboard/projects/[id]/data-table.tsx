"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TaskModal from "@/app/ui/TaskModal";
import { Task, TeamMember } from "@/app/lib/definitions";
import NewTaskForm from "@/app/ui/project/[id]/NewTaskForm";
import { Plus } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  userId: string;
  isUserAdmin: boolean;
  projectId: string;
  teamMembers: TeamMember[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  userId,
  isUserAdmin,
  projectId,
  teamMembers,
}: DataTableProps<TData, TValue>) {
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);
  const [isModalOpen, setModalOpen] = React.useState(false);
  // const [teamMembers, setTeamMembers] = React.useState<TeamMember[]>([]);
  const [addTask, setAddTask] = React.useState<boolean>(false);
  const onClose = () => setAddTask(false);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      created_by: false,
      start_date: false,
      est_runtime: false,
      due_date: false,
    });

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnFilters,
      columnVisibility,
      pagination,
    },
  });

  const handleRowClick = (row: any) => {
    setSelectedTask(row);
    setModalOpen(true);
  };

  // const handleRowClick = React.useCallback(async (row: any) => {
  //   setSelectedTask(row);
  //   setModalOpen(true);

  // try {
  //   const response = await fetch(
  //     `/api/team-members?projectId=${row.project_id}`
  //   );
  //   if (!response.ok) throw new Error("Failed to fetch team members");
  //   const fetchedTeamMembers = await response.json();
  //   setTeamMembers(fetchedTeamMembers);
  // } catch (error) {
  //   console.error("Error fetching team members:", error);
  // }
  // }, []);

  const closeModal = () => {
    setSelectedTask(null);
  };

  return (
    <div>
      <div className="flex items-center py-4 mt-10">
        <div className="flex justify-between items-center w-full">
          <div className="flex">
            <h1 className="text-2xl font-semibold">Current Tasks</h1>
            <div className="w-[1px] bg-[#e2e0e0] mx-5" />
          </div>
          <Input
            placeholder="Search Tasks..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className=" w-40 rounded-full"
          />
        </div>
        <div className="flex gap-2 w-full justify-end">
          {isUserAdmin && (
            <Button
              className="bg-[#fefffe] text-[#010001] border-[1px] rounded-full hover:bg-[#f2f3f2]"
              onClick={() => setAddTask(true)}
            >
              <span className="text-sm flex items-center justify-center">
                <Plus className="w-4 h-4 mr-1" /> Add Task
              </span>
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-[#fefffe] text-[#010001] border-[1px] rounded-full hover:bg-[#f2f3f2]"
              >
                Views
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mt-4">
        <hr className="w-full" />
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => handleRowClick(row.original)}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b-0 my-5"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center border-b-0 my-5"
                >
                  No tasks yet!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      {addTask && (
        <NewTaskForm
          userId={userId}
          teamMembers={teamMembers}
          onClose={onClose}
          projectId={projectId}
        />
      )}
      {isModalOpen && (
        <TaskModal
          projectId={selectedTask?.project_id}
          teamMembers={teamMembers}
          task={selectedTask}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
