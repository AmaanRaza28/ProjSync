import {
  getActivities,
  getInvites,
  getProjectById,
  getProjectTasks,
  getTeamMembers,
} from "@/app/lib/data";
import React from "react";
import CurrentTasks from "@/app/ui/project/[id]/CurrentTasks";
import StatCards from "@/app/ui/project/[id]/StatCards";

import ProjectHeader from "@/app/ui/project/[id]/ProjectHeader";
import { auth } from "@/auth";
import {
  Clock3,
  EllipsisVertical,
  LucideLineChart,
  Phone,
  ThumbsUp,
  Video,
} from "lucide-react";
import { PerformanceChart2 } from "@/app/ui/project/[id]/PerformanceChart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Activities from "@/app/ui/project/[id]/ActivityFeed/Activity";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) return null;
  const userId = session?.user?.id;
  const { id } = params;
  const project = await getProjectById(id);
  const projectTasks = await getProjectTasks(id);
  const teamMembers = await getTeamMembers(id);
  const invites = await getInvites(id);
  const initialActivities = await getActivities(project.id, 0);

  if (teamMembers.find((member) => member.id === userId) === undefined) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center font-semibold text-xl space-y-5">
        <div>You are not a member of this project</div>
        <div>
          <Button>
            <Link href={"/dashboard"}>Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  const data = {
    projectDetails: {
      id: project.id,
      name: project.title,
      description: project.description,
      date: project.created_at,
      admin: {
        avatar: project.created_by_avatar,
        name: project.created_by_name,
        email: project.created_by_email,
      },
      status: project.status,
    },
    stats: [
      {
        title: "Finished",
        value: project.finished_tasks,
        change: "+8 tasks",
        icon: <ThumbsUp />,
      },
      {
        title: "Tracked",
        value: `${project.tracked_hours ? project.tracked_hours : 0}h`,
        change: "-6 hours",
        icon: <Clock3 />,
      },
      {
        title: "Completed",
        value: `${Math.floor(project.efficiency)}%`,
        change: "+12%",
        icon: <LucideLineChart />,
      },
    ],
    performanceData: [
      { date: "Mon", "this Month": 8, "last Month": 6 },
      { date: "Tue", "this Month": 7, "last Month": 7 },
      { date: "Wed", "this Month": 8, "last Month": 6 },
      { date: "Thu", "this Month": 9, "last Month": 7 },
      { date: "Fri", "this Month": 8, "last Month": 5 },
      { date: "Sat", "this Month": 9, "last Month": 7 },
      { date: "Sun", "this Month": 10, "last Month": 8 },
    ],
    tasks: projectTasks.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      project_title: task.project_title,
      project_id: task.project_id,
      assigned_to_id: task.assigned_to,
      assigned_to: {
        name: task.assigned_to_name,
        avatar: task.assigned_to_avatar,
      },
      created_by_id: task.created_by,
      created_at: task.created_at,
      updated_at: task.updated_at,
      created_by: {
        name: task.created_by_name,
        avatar: task.created_by_avatar,
      },
      est_hours: task.est_hours,
      actual_hours: task.actual_hours,
      start_date: task.start_date,
      due_date: task.due_date,
      completed_at: task.completed_at,
    })),
    activities: [
      {
        user: { avatar: "/path-to-avatar.jpg", name: "Floyd Miles" },
        action: "Commented on Stark Project",
        time: "10:15 AM",
        message:
          "Hi! Next week we'll start a new project. I'll tell you all the details later",
      },
      {
        user: { avatar: "/path-to-avatar.jpg", name: "Guy Hawkins" },
        action: "Added a file to 7Hero's Project",
        time: "10:15 AM",
        file: { name: "Homepage.fig", size: "13.4 Mb" },
      },
      {
        user: { avatar: "/path-to-avatar.jpg", name: "Kristin Watson" },
        action: "Commented on 7Hero's Project",
        time: "10:15 AM",
      },
    ],
  };

  const user = teamMembers.find((member) => member.id === userId);

  const isUserAdmin = user?.role === "admin" || user?.role === "co-admin";

  return (
    <div className="p-6 bg-[#fefffe] grid grid-cols-2 md:grid-cols-3">
      <div className="col-span-2">
        <ProjectHeader
          userId={userId}
          project={data.projectDetails}
          isUserAdmin={isUserAdmin}
          invites={invites}
          teamMembers={teamMembers}
        />

        <div className="space-y-6">
          <StatCards stats={data.stats} />
          <div className="ml-6">
            <PerformanceChart2 data={data.performanceData} />
            <CurrentTasks
              userId={userId}
              tasks={data.tasks}
              projectId={data.projectDetails.id}
              teamMembers={teamMembers}
              isUserAdmin={isUserAdmin}
            />
          </div>
        </div>
      </div>
      <div className="ml-6 flex right-5 top-5 fixed w-[22rem]">
        <div className="border-[1px] " />
        <div className="w-full">
          <div className="flex flex-col justify-center items-center p-12 ml-4 mb-10 rounded-2xl bg-[#f2f3f2]">
            <Avatar className="w-20 h-20 border border-white">
              <AvatarImage src={data.projectDetails.admin.avatar} />
              <AvatarFallback>
                {data.projectDetails.admin.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="ml-2 flex flex-col justify-center">
              <h2 className="text-lg font-semibold">
                {data.projectDetails.admin.name}
              </h2>
              <p className="text-gray-500 text-sm">admin</p>
            </div>
            <div className="flex gap-4 my-5">
              <div className="flex justify-center items-center w-10 h-10 bg-[#fefffe] rounded-full ">
                <Phone className="w-5 h-5 text-[#09080d]" />
              </div>
              <div className="flex justify-center items-center w-10 h-10 bg-[#fefffe] rounded-full ">
                <Video className="w-5 h-5 text-[#09080d]" />
              </div>
              <div className="flex justify-center items-center w-10 h-10 bg-[#fefffe] rounded-full ">
                <EllipsisVertical className="w-5 h-5 text-[#09080d]" />
              </div>
            </div>
          </div>
          <Activities
            initialActivities={initialActivities}
            userId={userId}
            projectId={id}
          />
        </div>
      </div>
    </div>
  );
}
