import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { auth } from "@/auth";

export async function SignInForm() {
  const session = await auth();
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Login to your account.</CardDescription>
      </CardHeader>
      <CardFooter>{session ? <SignOut /> : <SignIn />}</CardFooter>
    </Card>
  );
}
