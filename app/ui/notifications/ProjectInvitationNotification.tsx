import { acceptInvite, declineInvite } from "@/app/lib/actions";
import { Notification } from "@/app/lib/definitions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BriefcaseIcon } from "lucide-react";

export default function ProjectInvitationNotification({
  notification,
  userId,
}: {
  notification: Notification;
  userId: string;
}) {
  const declineInviteWithId = declineInvite.bind(
    null,
    notification.associated_id as string,
    notification.id
  );

  const acceptInviteWithId = acceptInvite.bind(
    null,
    notification.id,
    notification.associated_id as string,
    userId
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Invite</CardTitle>
        <CardDescription>
          You&apos;ve been invited to a new project
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BriefcaseIcon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{notification.project_name}</p>
                <p className="text-sm text-muted-foreground">
                  Invited by {notification.invited_by}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <form action={declineInviteWithId}>
                <Button variant="outline" size="sm">
                  Decline
                </Button>
              </form>
              <form action={acceptInviteWithId}>
                <Button size="sm">Accept</Button>
              </form>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
