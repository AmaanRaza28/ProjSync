import { signOut } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <Button className="w-full">Sign Out</Button>
    </form>
  );
}
