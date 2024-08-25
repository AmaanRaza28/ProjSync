import { SignInForm } from "@/components/SignInForm";

export default async function Home() {
  return (
    <div className="flex justify-center items-center h-screen border-8">
      <div className="m-5">
        <SignInForm />
      </div>
    </div>
  );
}
