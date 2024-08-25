import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ActivityFeed from "./ActivityFeed";
import { Activity } from "@/app/lib/definitions";

export default function ActivitySection({
  initialActivities,
  projectId,
}: {
  initialActivities: {
    result: Activity[];
    offset: number | null;
  };
  projectId: string;
}) {
  const queryClient = new QueryClient();
  return (
    <div>
      <div className="flex justify-center items-center gap-2 ml-2">
        <div className="border-[1px] w-full h-0" />
        <div className="text-sm font-semibold">Activity</div>
        <div className="border-[1px] w-full h-0" />
      </div>
      <div className="h-full">
        <QueryClientProvider client={queryClient}>
          <ActivityFeed
            initialActivities={initialActivities.result}
            projectId={projectId}
          />
        </QueryClientProvider>
      </div>
    </div>
  );
}
