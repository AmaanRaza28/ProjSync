import { signIn } from "@/auth";
import { Button } from "./ui/button";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/dashboard" });
      }}
    >
      <Button className="w-full">Sign in with Google</Button>
    </form>
  );
}
