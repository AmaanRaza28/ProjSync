import { inviteMembers } from "@/app/lib/actions";

export default function InviteModal({
  userId,
  project,
  onClose,
}: {
  userId: string;
  project: {
    id: string;
    name: string;
    description: string;
    date: string;
    admin: { avatar: string; name: string };
    status: string;
  };
  onClose: () => void;
}) {
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const formAction = (formData: FormData) => {
    formData.get("emails");
    const data = formData.get("emails")?.toString().trim().split(/\s+/);
    const emails = data?.filter((email) => isValidEmail(email));
    if (emails) {
      inviteMembers(emails, userId, project.id);
    }

    onClose();
  };
  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white sm:w-1/3 p-7 rounded-lg shadow-lg mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <form action={formAction}>
          <div className="flex flex-col items-center justify-center ">
            <div className="w-full max-w-md space-y-4">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">Invite Members</h1>
                <p>Add emails separated by space.</p>
              </div>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Emails:
                  </label>
                  <textarea
                    id="emails"
                    name="emails"
                    rows={3}
                    className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 mx-2"
                >
                  Invite
                </button>
                <button
                  onClick={onClose}
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 mx-2"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
