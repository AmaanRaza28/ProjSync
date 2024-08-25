import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavLinks from "./NavLinks";
import { LogInIcon, SquareScissorsIcon, Waypoints } from "lucide-react";
import { auth } from "@/auth";
import { getNotifications } from "@/app/lib/data";

export default async function SideNav() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  let userName = session?.user?.name;
  if (userName && userName?.length > 10) {
    userName = `${userName.slice(0, 10)}...`;
  }
  const notificationCount = await getNotifications(
    session?.user?.id as string
  ).then((data) => data.length);

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-[#f1f2f4] p-4 hidden md:w-64 md:block">
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-7 mt-5">
          <Waypoints className="w-10 h-10 mr-3 mt-1" />
          <span className="text-2xl font-bold">ProjSync.</span>
        </div>
        <hr />
        <NavLinks notificationCount={notificationCount} />
        {/* User Profile */}
        <div className="mt-auto flex flex-col justify-center items-center mb-3">
          <Avatar className="border-2 border-white w-16 h-16 mb-2">
            <AvatarImage
              className="rounded-full"
              src={session?.user?.image as string}
            />
            <AvatarFallback className="w-20 h-20 rounded-full text-2xl bg-gray-500">
              {session?.user?.name?.[0] ?? "/placeholder-user.jpg"}
            </AvatarFallback>
          </Avatar>

          <p className="font-semibold text-base mb-1">{userName}</p>
          <p className="font-normal text-xs text-[#88898d] mb-1">
            {session.user.email}
          </p>
        </div>
      </div>
    </aside>
  );
}
