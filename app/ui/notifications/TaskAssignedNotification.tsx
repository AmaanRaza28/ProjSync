import { notificationRead } from "@/app/lib/actions";
import { Notification } from "@/app/lib/definitions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleCheckIcon } from "lucide-react";

export default function TaskAssignedNotification({
  notification,
}: {
  notification: Notification;
}) {
  const notificationReadWithId = notificationRead.bind(null, notification);
  return (
    <form action={notificationReadWithId}>
      <button type="submit" className="w-full h-full text-left">
        <Card>
          <CardHeader>
            <CardTitle>Task Assignment</CardTitle>
            <CardDescription>
              You&apos;ve been assigned a new task
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CircleCheckIcon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{notification.task_title}</p>
                    <p className="text-sm text-muted-foreground">
                      Assigned by {notification.assigned_by}
                    </p>
                    <p className="text-sm text-muted-foreground font-semibold">
                      {notification.project_name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </button>
    </form>
  );
}
