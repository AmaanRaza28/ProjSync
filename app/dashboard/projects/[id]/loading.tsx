import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  CalendarDays,
  ChevronDown,
  Clock3,
  Ellipsis,
  LucideLineChart,
  Paperclip,
  Send,
  Smile,
  ThumbsUp,
  Triangle,
} from "lucide-react";

export default function Loading() {
  return (
    <div className="p-6 bg-[#fefffe] grid grid-cols-2 md:grid-cols-3">
      <div className="col-span-2">
        <ProjectHeaderSkeleton />

        <div className="space-y-6">
          <StatCardsSkeleton />
          <div className="ml-6">
            <PerformanceChartSkeleton />
            <CurrentTasksSkeleton />
          </div>
        </div>
      </div>
      <div className="ml-6 flex right-5 top-5 fixed w-[22rem]">
        <div className="border-[1px] " />
        <div className="w-full">
          <div className="flex flex-col justify-center items-center p-12 ml-4 mb-10 rounded-2xl bg-[#f2f3f2]">
            <Skeleton className="w-20 h-20 rounded-full" />
            <div className="ml-2">
              <h2 className="text-lg font-semibold">
                <Skeleton className="w-20 h-5" />
              </h2>
            </div>
            <div className="flex gap-4 my-5">
              <div className="flex justify-center items-center w-10 h-10 bg-[#fefffe] rounded-full ">
                <Skeleton className="w-5 h-5 " />
              </div>
              <div className="flex justify-center items-center w-10 h-10 bg-[#fefffe] rounded-full ">
                <Skeleton className="w-5 h-5 " />
              </div>
              <div className="flex justify-center items-center w-10 h-10 bg-[#fefffe] rounded-full ">
                <Skeleton className="w-5 h-5 " />
              </div>
            </div>
          </div>
          <ActivityFeedSkeleton />
          <div className="mt-3 bg-[#f2f3f2] mx-7 h-14 rounded-lg flex justify-between items-center">
            <div className="flex items-center">
              <Paperclip className=" hover:cursor-pointer w-5 h-5 text-[#7a7a7b] ml-2" />
              <Input
                className=" focus:border-0 bg-[#f2f3f2] border-0"
                placeholder="Write a message"
                disabled={true}
              />
            </div>
            <Smile className="hover:cursor-pointer w-5 h-5 text-[#7a7a7b]" />
            <Send className="hover:cursor-pointer w-5 h-5 text-[#7a7a7b] mr-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectHeaderSkeleton() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start mt-2">
        <div className="p-5">
          <Skeleton className="w-40 h-7" />
          <p className="text-[#777777] text-sm my-3">
            <Skeleton className="w-40 h-5" />
          </p>
        </div>

        <div className="flex gap-3 mt-5">
          <div className="text-sm flex items-center gap-2">
            <Skeleton className="w-20 h-5" />
            <div className="flex justify-center items-center w-10 h-10 bg-[#f2f3f2] rounded-full">
              <CalendarDays className="h-5 w-5 text-[#030913]" />
            </div>
          </div>

          <Ellipsis className="h-5 w-5" />
        </div>
      </div>
    </>
  );
}

const stats = [
  {
    title: "Finished",
    icon: <ThumbsUp />,
  },
  {
    title: "Tracked",
    icon: <Clock3 />,
  },
  {
    title: "Completed",
    icon: <LucideLineChart />,
  },
];

export function StatCardsSkeleton() {
  return (
    <div className="flex flex-col items-center">
      <hr className="w-[95%] my-5" />
      <div className="flex justify-between items-center w-full px-5">
        {stats.map((stat, index) => (
          <div className="flex gap-3 w-full h-full" key={index}>
            <div className="flex justify-center items-center bg-[#f2f3f2] w-12 h-12 rounded-full">
              {stat.icon}
            </div>
            <div className="flex flex-col">
              <div className="">{stat.title}</div>
              <div className="flex items-end gap-2 font-bold">
                <Skeleton className="w-20 h-5" />
                <div className=" text-[#80d1b9] text-sm flex items-center font-medium">
                  <Triangle className="w-3 h-3 text-[#80d1b9]" />
                  <Skeleton className="w-10 h-5" />
                </div>
              </div>
            </div>
            {index !== stats.length - 1 && (
              <div className="ml-auto mr-5 border-r border-[#e0e0e0] h-11" />
            )}
          </div>
        ))}
      </div>
      <hr className="w-[95%] my-5" />
    </div>
  );
}

export function PerformanceChartSkeleton() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold ">Performance</h3>
        <div className="flex justify-center items-center w-24 h-8 bg-[#f2f3f2] rounded-full">
          <span className="text-xs ">01-07 Aug </span>
          <ChevronDown className="ml-1 h-4 w-4" />
        </div>
      </div>
      <div className="w-full h-64 -ml-11">
        <Skeleton className="h-[100%] w-[100%] ml-10" />
      </div>
    </div>
  );
}

export function CurrentTasksSkeleton() {
  return (
    <div>
      <div className="flex items-center py-4 mt-10">
        <div className="flex justify-between items-center w-full">
          <div className="flex">
            <h1 className="text-2xl font-semibold">Current Tasks</h1>
            <div className="w-[1px] bg-[#e2e0e0] mx-5" />
          </div>
          <Input placeholder="Search Tasks..." className=" w-40 rounded-full" />
        </div>
        <div className="flex gap-2 w-full justify-end">
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
        <Table>
          <TableHeader>
            <TableRow className="border-t border-b">
              <TableHead className="">Title</TableHead>
              <TableHead className="">Status</TableHead>
              <TableHead className="">Assigned To</TableHead>
              <TableHead className=" ">Priority</TableHead>
              <TableHead className="">Project</TableHead>
              <TableHead className=" "></TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        {[...Array(3)].map((e, i) => (
          <div key={i} className="animate-pulse w-full my-6 ">
            <Skeleton className="h-4 rounded-full bg-gray-200" />
          </div>
        ))}
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
  );
}

export function ActivityFeedSkeleton() {
  return (
    <div>
      <div className="flex justify-center items-center gap-2 ml-2">
        <div className="border-[1px] w-full h-0" />
        <div className="text-sm font-semibold">Activity</div>
        <div className="border-[1px] w-full h-0" />
      </div>
      <div className="h-full">
        <ActivitiesSkeleton />
      </div>
    </div>
  );
}

export function ActivitiesSkeleton() {
  return (
    <div className="p-4">
      <div className="h-80">
        <ul className="space-y-8">
          {[...Array(4)].map((activity, index) => (
            <li key={index} className="">
              <div className="flex w-full justify-between">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="ml-2 mr-auto">
                  <Skeleton className="w-20 h-5" />
                  <Skeleton className="w-20 h-3" />
                </div>
                <Skeleton className="w-20 h-3" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
