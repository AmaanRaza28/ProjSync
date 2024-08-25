import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Plus } from "lucide-react";

export default function Loading() {
  return (
    <main className="p-4 md:p-6">
      <div className="w-full bg-[#fefffe] rounded-2xl">
        <div className="px-6 py-3">
          <div className="flex items-center py-4">
            <div className="flex justify-start items-center w-full">
              <div className="flex">
                <h1 className="text-4xl font-semibold text-nowrap">
                  All Tasks
                </h1>
                <div className="w-[1px] bg-[#e2e0e0] mx-5" />
              </div>
              <Input
                placeholder="Search Tasks..."
                className=" w-96 rounded-full"
              />
            </div>
            <div className="flex gap-2 w-full justify-end">
              <Button className="bg-[#fefffe] text-[#010001] border-[1px] rounded-full hover:bg-[#f2f3f2]">
                <span className="text-sm flex items-center justify-center">
                  <Plus className="w-4 h-4 mr-1" /> Add Task
                </span>
              </Button>

              <Button
                variant="outline"
                className="bg-[#fefffe] text-[#010001] border-[1px] rounded-full hover:bg-[#f2f3f2]"
              >
                Views
              </Button>
            </div>
          </div>

          <div className="mt-4">
            <hr className="w-full" />
            <div>
              <Table className="min-w-full bg-white">
                <TableHeader>
                  <TableRow className="border-t border-b">
                    <TableHead className="">Title</TableHead>
                    <TableHead className="">Status</TableHead>
                    <TableHead className="">Admin</TableHead>
                    <TableHead className=" ">Priority</TableHead>
                    <TableHead className="">Project</TableHead>
                    <TableHead className=" ">Due Date</TableHead>
                    <TableHead className=" "></TableHead>
                  </TableRow>
                </TableHeader>
              </Table>
              {[...Array(8)].map((e, i) => (
                <div key={i} className="animate-pulse w-full my-6 ">
                  <Skeleton className="h-4 rounded-full bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button variant="outline" size="sm" disabled={true}>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled={true}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
