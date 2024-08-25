import { Notification } from "@/app/lib/definitions";
import { BellIcon } from "lucide-react";
import ProjectInvitationNotification from "./ProjectInvitationNotification";
import TaskAssignedNotification from "./TaskAssignedNotification";
import ProjectStatusChangeNotification from "./ProjectStatusChangeNotification";

export default function Notifications({
  notifications,
  userId,
}: {
  notifications: Notification[];
  userId: string;
}) {
  return (
    <div className="grid gap-6">
      {notifications.length === 0 && (
        <div className="grid gap-6 justify-center items-center h-full">
          <div className="flex flex-col items-center gap-4">
            <BellIcon className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-2xl font-bold">No new notifications</h3>
            <p className="text-muted-foreground">
              You&apos;re all caught up! Check back later for updates.
            </p>
          </div>
        </div>
      )}
      {notifications.map((notification) => {
        if (notification.type === "project_invitation") {
          return (
            <ProjectInvitationNotification
              userId={userId}
              notification={notification}
              key={notification.id}
            />
          );
        } else if (notification.type === "task_assigned") {
          return (
            <TaskAssignedNotification
              notification={notification}
              key={notification.id}
            />
          );
        } else if (notification.type === "project_status_change") {
          return (
            <ProjectStatusChangeNotification
              notification={notification}
              key={notification.id}
            />
          );
        }
      })}
    </div>
  );
}
