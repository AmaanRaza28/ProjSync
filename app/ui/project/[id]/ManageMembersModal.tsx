import { Invite, TeamMember } from "@/app/lib/definitions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeamMembers from "./TeamMembers";
import Invitations from "./Invitations";

export default function ManageMembersModal({
  projectId,
  onClose,
  invites,
  teamMembers,
  isUserAdmin,
}: {
  projectId: string;
  onClose: () => void;
  invites: Invite[];
  teamMembers: TeamMember[];
  isUserAdmin: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white sm:w-1/4 p-3 rounded-lg shadow-lg mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {isUserAdmin ? (
          <Tabs defaultValue="teamMembers" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="teamMembers">Team Members</TabsTrigger>
              <TabsTrigger value="invitations">Invitations</TabsTrigger>
            </TabsList>
            <TabsContent value="teamMembers" className="px-2 h-96">
              <TeamMembers
                projectId={projectId}
                teamMembers={teamMembers}
                isUserAdmin={isUserAdmin}
              />
            </TabsContent>
            <TabsContent value="invitations" className="px-2 h-96">
              <Invitations invites={invites} />
            </TabsContent>
          </Tabs>
        ) : (
          <TeamMembers projectId={projectId} teamMembers={teamMembers} />
        )}
      </div>
    </div>
  );
}
