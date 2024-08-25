import { deleteInvite } from "@/app/lib/data";
import { Invite } from "@/app/lib/definitions";
import { CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash } from "lucide-react";

export default function Invitations({ invites }: { invites: Invite[] }) {
  return (
    <CardContent className="p-4">
      <h3 className="text-lg font-semibold mb-3">Invitations</h3>
      <ScrollArea className="h-80 px-3">
        <ul className="space-y-4">
          {invites.map((invite, index) => (
            <li
              key={index}
              className="flex items-center justify-between space-x-4"
            >
              <div>
                <p className="font-medium">{invite.invitee_email}</p>
                <p className="text-sm text-gray-500">{invite.status}</p>
              </div>
              <form action={deleteInvite}>
                <input type="hidden" name="invite_id" value={invite.id} />
                <button type="submit" className="pr-3">
                  <Trash className="w-5 h-5 " />
                </button>
              </form>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </CardContent>
  );
}
