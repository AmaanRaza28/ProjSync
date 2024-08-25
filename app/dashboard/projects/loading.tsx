import NewProjectCard from "@/app/ui/project/NewProjectCard";
import { ProjectCardSkeleton } from "../loading";

export default function Loading() {
  return (
    <main className="p-4  md:p-6">
      <h2 className="text-5xl font-semibold text-gray-800 p-2 mb-5">
        Projects
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <NewProjectCard />
        <div>
          <ProjectCardSkeleton />
        </div>
      </div>
    </main>
  );
}
