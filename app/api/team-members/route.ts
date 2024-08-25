import { NextResponse } from "next/server";
import { getTeamMembers } from "@/app/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId");

  if (!projectId) {
    return NextResponse.json(
      { error: "Project ID is required" },
      { status: 400 }
    );
  }

  const teamMembers = await getTeamMembers(projectId);
  return NextResponse.json(teamMembers);
}
