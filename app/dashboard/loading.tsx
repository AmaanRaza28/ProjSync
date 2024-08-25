import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronRightIcon, Clock, MessageSquareMore } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex-1 p-4 space-y-8 overflow-auto md:p-6">
      <LatestTasksSkeleton />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <ProductivityCardSkeleton />
        <ProjectsInProgressCardSkeleton />
      </div>
    </main>
  );
}

export function LatestTasksSkeleton() {
  return (
    <div className="p-6 bg-[#fefffe] rounded-2xl shadow-md border-[1px] border-gray-100">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold text-gray-800">Latest tasks</h2>
          <p className="text-gray-600  animate-pulse">
            <div className=" bg-gray-300 my-3 rounded-full w-full h-2"></div>
          </p>
        </div>
        <div className="flex items-center space-x-8 mt-4 md:mt-0">
          <Skeleton className="w-32 h-4 rounded-full bg-gray-200" />
          <Skeleton className="w-32 h-4 rounded-full bg-gray-200" />
        </div>
      </div>
      <LatestTasksTableSkeleton />
    </div>
  );
}
export function LatestTasksTableSkeleton() {
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
      </Table>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="animate-pulse w-full my-6 ">
          <Skeleton className="h-4 rounded-full bg-gray-200" />
        </div>
      ))}
    </div>
  );
}
export function ProductivityCardSkeleton() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="px-3">Productivity</CardTitle>
        <CardDescription className=" flex items-center px-3 py-2">
          <div className="w-2 h-2 rounded-full bg-[#448d89] mr-2"></div> Current
          Month
          <div className="w-2 h-2 rounded-full bg-[#e36b52] ml-3 mr-2"></div>{" "}
          Last Month
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-2">
          <Skeleton className="h-[200px] w-full" />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-full" />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
export function ProjectsInProgressCardSkeleton() {
  return (
    <Card className="bg-[#081225] rounded-2xl">
      <CardHeader>
        <CardTitle className="text-[#e7e8ea] px-3 py-1">
          Projects in progress:
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="flex h-80 ">
          {[...Array(3)].map((project, index) => (
            <div
              key={index}
              className={`flex-1 absolute ml-5 transition-all duration-300 ease-in-out ${
                index === 0
                  ? " scale-100 z-20"
                  : index === 1
                  ? "opacity-[0.98] scale-95 translate-x-[30%] z-10"
                  : index === 2
                  ? "opacity-90 scale-90 translate-x-[60%] z-0"
                  : "hidden"
              }`}
            >
              <div>
                <ProjectCardSkeleton />
              </div>
            </div>
          ))}
          <Button
            variant="ghost"
            size="icon"
            className="bg-white absolute right-2 top-1/2 rounded-full transform -translate-y-1/2 z-30"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </Button>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
export function ProjectCardSkeleton() {
  return (
    <>
      <Card className="min-w-64 w-full h-full flex flex-col justify-between bg-white shadow-lg hover:bg-gray-50 rounded-xl">
        <div className="flex-grow">
          <CardHeader>
            <CardTitle className=" overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
              <div className="flex justify-between">
                <div className="ml-3 flex items-center justify-center">
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="outline"
                      className="px-4 py-1 rounded border-none font-medium bg-[#ecf9e6] text-[#7b9f72]"
                    >
                      <Skeleton className="h-4 w-4" />
                    </Badge>
                  </div>
                </div>
                <div className="ml-3 flex items-center justify-center">
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="outline"
                      className="px-4 py-1 rounded border-none font-medium bg-[#f1fbfe] text-[#477d86]"
                    >
                      <Clock className="w-4 h-4 mr-1" />
                      In Progress
                    </Badge>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="py-4">
              <div className="text-base">
                <Skeleton className="w-full h-4 " />
              </div>
              <div className="text-xs text-gray-600 my-2">
                <Skeleton className="w-full h-3" />
              </div>
            </div>
          </CardContent>
        </div>
        <CardFooter className="">
          <div className="flex justify-center">
            <div className="flex items-center ">
              {[...Array(3)].map((member, index) => (
                <Skeleton
                  key={index}
                  className="w-8 h-8 rounded-full"
                  style={{ marginLeft: index > 0 ? "-0.75rem" : "0" }}
                />
              ))}
            </div>
            <div className="flex items-center text-gray-500 ml-16">
              <MessageSquareMore className="w-3 h-3" />
              <span className="ml-1 text-xs">
                <Skeleton className="w-10 h-3" />
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
