"use client";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboardIcon,
  ListTodoIcon,
  MailsIcon,
  ProjectorIcon,
} from "lucide-react";

export default function NavLinks({
  notificationCount,
}: {
  notificationCount: number;
}) {
  const navLinks = [
    {
      title: "Dashboard",
      icon: <LayoutDashboardIcon className="w-5 h-5" />,
      href: "/dashboard",
    },
    {
      title: "Projects",
      icon: <ProjectorIcon className="w-5 h-5" />,
      href: "/dashboard/projects",
    },
    {
      title: "Task list",
      icon: <ListTodoIcon className="w-5 h-5" />,
      href: "/dashboard/tasks",
    },
    {
      title: "Notifications",
      icon: <MailsIcon className="w-5 h-5" />,
      href: "/dashboard/notifications",
      notifications: notificationCount,
    },
  ];
  const pathname = usePathname();
  return (
    <nav className="flex flex-col mt-5">
      {navLinks.map((link) => {
        if (link.notifications) {
          return (
            <Link
              key={link.title}
              href={link.href}
              className={clsx(
                "mb-6 flex items-center space-x-2 py-2 px-4 rounded-md ",
                {
                  "bg-[#081225] hover:bg-[#091428] text-white/90":
                    pathname === link.href,
                  "hover:bg-gray-200": pathname !== link.href,
                }
              )}
            >
              {link.icon}
              <span>{link.title}</span>
              <Badge
                variant="destructive"
                className="ml-auto bg-[#b4dea0] hover:bg-emerald-200 text-[#293738]"
              >
                {link.notifications}
              </Badge>
            </Link>
          );
        }
        if (link.title === "Dashboard") {
          return (
            <Link
              key={link.title}
              href={link.href}
              className={clsx(
                "mb-6 flex items-center space-x-2 py-2 px-4 rounded-md ",
                {
                  "bg-[#081225] hover:bg-[#091428] text-white/90":
                    pathname === link.href,
                  "hover:bg-gray-200": pathname !== link.href,
                }
              )}
            >
              {link.icon}
              <span>{link.title}</span>
            </Link>
          );
        }
        return (
          <Link
            key={link.title}
            href={link.href}
            className={clsx(
              "mb-6 flex items-center space-x-2 py-2 px-4 rounded-lg ",
              {
                "bg-[#081225] hover:bg-[#091428] text-white/90":
                  pathname.startsWith(link.href),
                "hover:bg-gray-200": pathname !== link.href,
              }
            )}
          >
            {link.icon}
            <span>{link.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
