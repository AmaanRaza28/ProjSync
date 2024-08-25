import { getNotifications } from "@/app/lib/data";
import { Notification } from "@/app/lib/definitions";
import Notifications from "@/app/ui/notifications/Notifications";
import { auth } from "@/auth";

export default async function Projects() {
  const session = await auth();
  if (!session?.user?.id) return null;
  const userId = session?.user?.id;

  const notifications: Notification[] = await getNotifications(userId);

  return (
    <div className="">
      <main className="flex-1 overflow-auto mx-5 mt-10">
        <h1 className="text-4xl font-semibold text-gray-800">Notifications</h1>
        <div className="container mx-auto py-8">
          <Notifications notifications={notifications} userId={userId} />
        </div>
      </main>
    </div>
  );
}
