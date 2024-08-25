import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import clsx from "clsx";
import { Project } from "../lib/definitions";
import {
  CircleCheck,
  CircleMinus,
  Clock,
  MessageSquareMore,
  Percent,
  ReplyIcon,
} from "lucide-react";

export default function ProjectCard({ project }: { project: Project }) {
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
                      className={clsx(
                        "px-4 py-1 rounded border-none font-medium",

                        {
                          "bg-[#dce2a0a9] text-[#837d35] ":
                            project.percent_done >= 50,
                        },
                        {
                          "bg-[#f9e6e6] text-[#9f7b7b] ":
                            project.percent_done < 50,
                        },
                        {
                          "bg-[#ecf9e6] text-[#7b9f72] ":
                            project.percent_done > 80,
                        }
                      )}
                    >
                      {project.percent_done} % Done
                    </Badge>
                  </div>
                </div>
                <div className="ml-3 flex items-center justify-center">
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="outline"
                      className={clsx(
                        "px-4 py-1 rounded border-none font-medium",
                        {
                          "bg-[#ebfbe7] text-[#4d6744] ":
                            project.status === "completed",
                        },
                        {
                          "bg-[#f1fbfe] text-[#477d86] ":
                            project.status === "in progress",
                        },
                        {
                          "bg-purple-100 text-purple-700 ":
                            project.status === "on hold",
                        }
                      )}
                    >
                      {project.status === "in progress" ? (
                        <Clock className="w-4 h-4 mr-1" />
                      ) : project.status === "completed" ? (
                        <CircleCheck className="w-4 h-4 mr-1" />
                      ) : (
                        <CircleMinus className="w-4 h-4 mr-1" />
                      )}
                      {project.status === "in progress"
                        ? "In Progress"
                        : project.status === "completed"
                        ? "Completed"
                        : "On Hold"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="py-4">
              <div className="text-base">{project.title}</div>
              <div className="text-xs text-gray-600 my-2">
                {project.updated_at.split("-").map((x, i) => {
                  if (i === 0) {
                    return x + ".";
                  } else if (i === 1) {
                    return x + ".";
                  } else {
                    return x;
                  }
                })}
              </div>
            </div>
          </CardContent>
        </div>
        <CardFooter className="">
          <div className="flex justify-center">
            <div className="flex items-center ">
              {project.team.slice(0, 2).map((member, index) => (
                <Avatar
                  key={member.id}
                  className="w-8 h-8"
                  style={{ marginLeft: index > 0 ? "-0.75rem" : "0" }}
                >
                  <AvatarImage
                    className="rounded-full"
                    src={member.avatar}
                    alt={member.name}
                  />
                  <AvatarFallback>
                    <div className="flex justify-center items-center w-8 h-8 border-2 rounded-full bg-gray-100">
                      {member.name[0]}
                    </div>
                  </AvatarFallback>
                </Avatar>
              ))}
              {project.team.length > 2 && (
                <div
                  className="w-8 h-8 rounded-full bg-[#081225] flex items-center justify-center text-sm font-medium"
                  style={{ marginLeft: "-0.75rem" }}
                >
                  <span className="text-white">+{project.team.length - 2}</span>
                </div>
              )}
            </div>
            <div className="flex items-center text-gray-500 ml-16">
              <MessageSquareMore className="w-3 h-3" />
              <span className="ml-1 text-xs">{project.comments} comments</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
