import { removeTeamMember, updateTeamMemberRole } from "@/app/lib/actions";
import { TeamMember } from "@/app/lib/definitions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardContent } from "@/components/ui/card";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { EllipsisVertical, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function TeamMembers({
  projectId,
  teamMembers,
  isUserAdmin,
}: {
  projectId: string;
  teamMembers: TeamMember[];
  isUserAdmin?: boolean;
}) {
  return (
    <CardContent className="p-4">
      <h3 className="text-lg font-semibold mb-4">Team Members</h3>
      <ScrollArea className="h-80">
        <ul className="space-y-4">
          {teamMembers.map((member, index) => (
            <li key={index} className="flex items-center justify-between ">
              <div className="flex space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
              {member.role !== "admin" && isUserAdmin && (
                <div className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <button className="ml-auto">
                        <EllipsisVertical className="w-5 h-5 text-[#09080d]" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={5} align="end">
                      {member.role === "member" && (
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            Promote
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem
                              onClick={() => {
                                updateTeamMemberRole(
                                  member.team_member_id,
                                  "co-admin",
                                  projectId
                                );
                              }}
                            >
                              Co-admin
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                      )}
                      {member.role === "co-admin" && (
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            Demote
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem
                              onClick={() => {
                                updateTeamMemberRole(
                                  member.team_member_id,
                                  "member",
                                  projectId
                                );
                              }}
                            >
                              Member
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                      )}
                      <DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger
                            asChild
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="text-red-500 flex items-center">
                              <Trash2 className="w-4 h-4 mr-2" /> Remove
                            </div>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Remove {member.name}?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => {
                                  removeTeamMember(
                                    member.team_member_id,
                                    projectId
                                  );
                                }}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </li>
          ))}
        </ul>
      </ScrollArea>
    </CardContent>
  );
}
