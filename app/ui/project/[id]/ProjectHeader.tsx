"use client";

import { convertDate } from "@/lib/utils";
import { CalendarDays, Ellipsis, Trash2 } from "lucide-react";
import { useState } from "react";
import EditProjectModal from "./EditProjectModal";
import InviteModal from "./InviteModal";
import ManageMembersModal from "./ManageMembersModal";
import { Invite, TeamMember } from "@/app/lib/definitions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { deleteProject } from "@/app/lib/actions";

export default function ProjectHeader({
  isUserAdmin,
  userId,
  project,
  invites,
  teamMembers,
}: {
  isUserAdmin: boolean;
  userId: string;
  project: {
    id: string;
    name: string;
    description: string;
    date: string;
    admin: { avatar: string; name: string };
    status: string;
  };
  invites: Invite[];
  teamMembers: TeamMember[];
}) {
  const [editMode, setEditMode] = useState(false);
  const [inviteMode, setInviteMode] = useState(false);
  const [viewMembers, setViewMembers] = useState(false);

  const onCloseInvite = () => setInviteMode(false);
  const onCloseEdit = () => setEditMode(false);
  const onCloseMembers = () => setViewMembers(false);

  const deleteProjectWithId = deleteProject.bind(null, project.id);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start mt-2">
        <div className="p-5">
          <h2 className="text-3xl font-bold text-[#070716]">{project.name}</h2>
          <p className="text-[#777777] text-sm my-3">{project.description}</p>
          {/* <p className="text-sm text-gray-500">{convertDate(project.date)}</p> */}
        </div>

        <div className="flex gap-3 mt-5">
          <div className="text-sm flex items-center gap-2">
            {convertDate(project.date)}
            <div className="flex justify-center items-center w-10 h-10 bg-[#f2f3f2] rounded-full">
              <CalendarDays className="h-5 w-5 text-[#030913]" />
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setViewMembers(!viewMembers)}>
                Members
              </DropdownMenuItem>
              {isUserAdmin && (
                <>
                  <DropdownMenuItem onClick={() => setInviteMode(!inviteMode)}>
                    Invite
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setEditMode(!editMode)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <AlertDialog>
                      <AlertDialogTrigger
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="text-red-500 flex items-center">
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </div>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone.This will permanently
                            delete your project and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              deleteProjectWithId();
                            }}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* <div className="flex items-center space-x-2 w-72 justify-end ml-10">
          <Avatar className="h-12 w-12">
            <AvatarImage src={project.admin.avatar} />
            <AvatarFallback>{project.admin.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{project.admin.name}</p>
          </div>
          <Button variant="ghost" size="icon">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div> */}
      </div>
      {editMode && <EditProjectModal project={project} onClose={onCloseEdit} />}
      {inviteMode && (
        <InviteModal
          userId={userId}
          onClose={onCloseInvite}
          project={project}
        />
      )}
      {viewMembers && (
        <ManageMembersModal
          projectId={project.id}
          onClose={onCloseMembers}
          invites={invites}
          teamMembers={teamMembers}
          isUserAdmin={isUserAdmin}
        />
      )}
    </>
  );
}
