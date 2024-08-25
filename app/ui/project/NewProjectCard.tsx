"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";
export default function NewProjectCard() {
  return (
    <Link href={"/dashboard/projects/create"}>
      <Card className=" min-w-72 w-full h-full flex flex-col justify-between bg-white shadow-lg hover:bg-gray-50 rounded-xl">
        <CardContent className="mx-auto my-auto flex flex-col items-center">
          <div />
          <Plus className="h-12 w-12 text-black stroke-1" />
          <p className="text-sm text-black ">New Project</p>
        </CardContent>
      </Card>
    </Link>
  );
}
