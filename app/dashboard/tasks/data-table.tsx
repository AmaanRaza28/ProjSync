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
import { Task, TeamMember } from "@/app/lib/definitions";
import TaskModal from "@/app/ui/TaskModal";
import { Plus } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [teamMembers, setTeamMembers] = React.useState<TeamMember[]>([]);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      assigned_to: false,
      created_at: false,
      est_runtime: false,
    });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnFilters,
      columnVisibility,
    },
  });

  const handleRowClick = React.useCallback(async (row: any) => {
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
    <div className="px-6 py-3">
      <div className="flex items-center py-4">
        <div className="flex justify-start items-center w-full">
          <div className="flex">
            <h1 className="text-4xl font-semibold text-nowrap">All Tasks</h1>
            <div className="w-[1px] bg-[#e2e0e0] mx-5" />
          </div>
          <Input
            placeholder="Search Tasks..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className=" w-96 rounded-full"
          />
        </div>
        <div className="flex gap-2 w-full justify-end">
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
                  className="border-b-0 py-10"
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
              <TableRow className="my-5">
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
