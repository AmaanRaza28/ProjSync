"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { Project } from "@/app/lib/definitions";
import ProjectCard from "../ProjectCard";

export default function ProjectsInProgressCard({
  projects,
}: {
  projects: Project[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  return (
    <Card className="bg-[#081225] rounded-2xl">
      <CardHeader>
        <CardTitle className="text-[#e7e8ea] px-3 py-1">
          Projects in progress:
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="flex h-80 ">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`flex-1 absolute ml-5 transition-all duration-300 ease-in-out ${
                index === currentIndex
                  ? " scale-100 z-20"
                  : index === (currentIndex + 1) % projects.length
                  ? "opacity-[0.98] scale-95 translate-x-[30%] z-10"
                  : index === (currentIndex + 2) % projects.length
                  ? "opacity-90 scale-90 translate-x-[60%] z-0"
                  : "hidden"
              }`}
            >
              <Link href={`/dashboard/projects/${project.id}`}>
                <ProjectCard project={project} />
              </Link>
            </div>
          ))}
          <Button
            variant="ghost"
            size="icon"
            className="bg-white absolute right-2 top-1/2 rounded-full transform -translate-y-1/2 z-30"
            onClick={handleNext}
          >
            <ChevronRightIcon className="h-6 w-6" />
          </Button>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
