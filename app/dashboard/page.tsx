import { auth } from "@/auth";
import Dashboard from "../ui/dashboard/dashboard";

export default async function Page() {
  const session = await auth();
  if (!session?.user?.id) return null;

  return <Dashboard userId={session?.user?.id} />;
}
