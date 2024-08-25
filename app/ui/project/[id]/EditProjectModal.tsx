import { updateProject } from "@/app/lib/actions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EditProjectModal({
  project,
  onClose,
}: {
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
  const formAction = (formData: FormData) => {
    updateProject(formData, project.id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-1/3 p-7 rounded-lg shadow-lg mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <form action={formAction}>
          <div className="flex flex-col items-center justify-center ">
            <div className="w-full max-w-md space-y-4">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">Edit Project</h1>
                <p>Update the details below.</p>
              </div>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    defaultValue={project.name}
                    name="title"
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
                    defaultValue={project.description}
                    rows={3}
                    className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div className="col-span-2">
                    <label htmlFor="status" className="text-sm font-medium">
                      Status
                    </label>
                    <div className="relative">
                      <Select name="status" defaultValue={project.status}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Change status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="in progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="on hold">On hold</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 mx-2"
                >
                  Save Changes
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
