"use client";

import { addComment } from "@/app/lib/actions";
import { Paperclip, Send, Smile } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { useRef, useState } from "react";
import ActivitySection from "./ActivitySection";
import { Activity } from "@/app/lib/definitions";
import { useSession } from "next-auth/react";

const initialState = { message: null, errors: {} };

interface FormState {
  message: string | null;
  errors: Record<string, string[]>;
}

export default function Activities({
  initialActivities,
  projectId,
  userId,
}: {
  initialActivities: {
    result: Activity[];
    offset: number | null;
  };
  projectId: string;
  userId: string;
}) {
  const [activities, setActivities] = useState<Activity[]>(
    initialActivities.result
  );
  const formRef = useRef<HTMLFormElement>(null);
  const addCommentWithIds = async (
    prevState: FormState,
    formData: FormData
  ): Promise<FormState> => {
    return addComment(projectId, userId, formData);
  };

  const session = useSession();

  const [state, formAction] = useFormState(addCommentWithIds, initialState);

  const handleSubmit = async (formData: FormData) => {
    const message = formData.get("comment") as string;
    // Optimistic update
    const newActivity = {
      id: Date.now().toString(), // Temporary ID
      user_name: session?.data?.user?.name || "",
      user_avatar: session?.data?.user?.image || "",
      details: "commented",
      message: message,
      created_at: new Date().toISOString(),
    };

    setActivities([...activities, newActivity]);
    await formAction(formData);

    formRef.current?.reset();
  };

  return (
    <>
      <ActivitySection
        initialActivities={{
          result: activities,
          offset: initialActivities.offset,
        }}
        projectId={projectId}
      />
      <form ref={formRef} action={handleSubmit}>
        <div className="mt-3 bg-[#f2f3f2] mx-7 h-14 rounded-lg flex justify-between items-center">
          <div className="flex items-center">
            <Paperclip className="hover:cursor-pointer w-5 h-5 text-[#7a7a7b] ml-2" />
            <Input
              autoComplete="off"
              name="comment"
              className="bg-[#f2f3f2] border-0 focus:outline-0 focus-visible:ring-0 focus:border-0"
              placeholder="Write a message"
            />
          </div>
          <Smile className="hover:cursor-pointer w-5 h-5 text-[#7a7a7b]" />
          <SubmitButton />
        </div>
      </form>
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="bg-[#f2f3f2]" disabled={pending}>
      <Send className="hover:cursor-pointer w-5 h-5 text-[#7a7a7b] mr-2" />
    </Button>
  );
}
