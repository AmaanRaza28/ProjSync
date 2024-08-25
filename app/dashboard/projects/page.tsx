import { getProjects } from "@/app/lib/data";
import { Project } from "@/app/lib/definitions";
import NewProjectCard from "@/app/ui/project/NewProjectCard";
import ProjectCard from "@/app/ui/ProjectCard";
import { auth } from "@/auth";
import { Card } from "@/components/ui/card";

import Link from "next/link";

export default async function Projects() {
  const session = await auth();
  if (!session?.user?.id) return null;
  const userId = session?.user?.id;
  const projects: Project[] = await getProjects(userId);
  return (
    <main className="p-4  md:p-6">
      <h2 className="text-5xl font-semibold text-gray-800 p-2 mb-5">
        Projects
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <NewProjectCard />
        {projects.map((project) => {
          return (
            <Link href={`/dashboard/projects/${project.id}`} key={project.id}>
              <ProjectCard project={project} />
            </Link>
          );
        })}
      </div>
    </main>
  );
}
