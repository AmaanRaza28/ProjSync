import LatestTasks from "@/app/ui/dashboard/LatestTasks";
import ProductivityCard from "@/app/ui/dashboard/ProductivityCard";
import ProjectsInProgressCard from "@/app/ui/dashboard/ProjectsInProgressCard";
import { Project } from "../../lib/definitions";
import { getProjectsInProgress } from "../../lib/data";
import { Suspense } from "react";
import {
  LatestTasksSkeleton,
  ProductivityCardSkeleton,
} from "@/app/dashboard/loading";

export default async function Dashboard({ userId }: { userId: string }) {
  const projects: Project[] = await getProjectsInProgress(userId);
  return (
    <main className="flex-1 p-4 space-y-8 overflow-auto md:p-6">
      <Suspense fallback={<LatestTasksSkeleton />}>
        <LatestTasks userId={userId} />
      </Suspense>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Suspense fallback={<ProductivityCardSkeleton />}>
          <ProductivityCard userId={userId} />
        </Suspense>
        <ProjectsInProgressCard projects={projects} />
      </div>
    </main>
  );
}
