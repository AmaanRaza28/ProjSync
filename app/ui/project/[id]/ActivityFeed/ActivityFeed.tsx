"use client";
import { useEffect, useRef } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useIntersection } from "@mantine/hooks";
import { Loader } from "lucide-react";
import { Activity } from "@/app/lib/definitions";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDateTime } from "@/lib/utils";
import { getActivities } from "@/app/lib/data";

// async function getActivities(projectId: string, offset: number) {
//   const res = await fetch(
//     `/api/activities?projectId=${projectId}&offset=${offset}`
//   );
//   if (!res.ok) throw new Error("Failed to fetch activities");
//   return res.json();
// }

export default function ActivityFeed({
  projectId,
  initialActivities,
}: {
  projectId: string;
  initialActivities: Activity[];
}) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["activities", projectId],
      queryFn: ({ pageParam = 0 }) => getActivities(projectId, pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.offset,
      initialData: {
        pages: [
          { result: initialActivities, offset: initialActivities.length },
        ],
        pageParams: [0],
      },
      staleTime: 60000,
      refetchOnWindowFocus: false,
      enabled: initialActivities.length === 0,
    });

  const lastActivityRef = useRef<HTMLLIElement>(null);
  const { ref, entry } = useIntersection({
    root: lastActivityRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage, hasNextPage, isFetchingNextPage]);

  const activities = data?.pages.flatMap((page) => page.result) || [];

  return (
    <div className="p-4">
      <ScrollArea className="h-[19rem]">
        <ul className="space-y-8">
          {activities.map((activity, index) => (
            <li
              ref={index === activities.length - 1 ? ref : undefined}
              key={activity.id}
              className=""
            >
              <div className="flex w-full justify-between">
                <Avatar>
                  <AvatarImage
                    className="w-10 h-10 rounded-full min-w-10 min-h-10"
                    src={activity.user_avatar}
                    alt="avatar"
                  />
                  <AvatarFallback className="w-10 h-10 rounded-ful min-h-10 min-w-10">
                    {activity.user_name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-2 mr-auto">
                  <div className="font-semibold">{activity.user_name}</div>
                  <div className="text-sm text-[#858484]">
                    {activity.details}
                  </div>
                </div>
                <div className="text-sm mr-1 text-[#858484] whitespace-nowrap">
                  {formatDateTime(activity.created_at)}
                </div>
              </div>
              {activity.message && (
                <div className="mt-2 text-base bg-[#e5effb] rounded-xl p-3 ml-6">
                  {activity.message}
                </div>
              )}
            </li>
          ))}
        </ul>
        {hasNextPage && (
          <div className="flex justify-center items-center my-3">
            {isFetchingNextPage ? (
              <Loader className="w-6 h-6 animate-spin-slow" />
            ) : (
              "Nothing more to load"
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
