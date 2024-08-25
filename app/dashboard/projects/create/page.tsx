import { createProject } from "@/app/lib/actions";
import { auth } from "@/auth";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

export default async function Page() {
  const session = await auth();
  if (!session?.user?.id) return null;
  const userId = session?.user?.id;
  return (
    <form action={createProject}>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-lg space-y-4 bg-white p-5 rounded-xl">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Add New Project</h1>
            <p>Fill out the details below to create a new project.</p>
          </div>
          <div className="space-y-4">
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="Enter project title"
                className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                placeholder="Describe your project"
                className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <input type="hidden" name="createdBy" value={userId} />
            <div className="grid gap-2">
              <label htmlFor="status" className="text-sm font-medium">
                Status
              </label>
              <div className="relative">
                <Select name="status">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="in progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="on hold">On hold</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Create Project
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
