import { Notification } from "@/app/lib/definitions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FlagIcon } from "lucide-react";

export default function ProjectStatusChangeNotification({
  notification,
}: {
  notification: Notification;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Status Change</CardTitle>
        <CardDescription>The status of a project has changed</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FlagIcon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{notification.project_name}</p>
                <p className="text-sm text-muted-foreground">
                  Status changed to &quot;{notification.new_status}&quot; by{" "}
                  {notification.changed_by}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
