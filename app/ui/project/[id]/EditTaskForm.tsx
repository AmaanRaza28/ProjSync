import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDateForInput } from "@/lib/utils";
import { TeamMember } from "../../../lib/definitions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function EditTaskForm({
  projectId,
  task,
  formAction,
  setEditMode,
  teamMembers,
}: {
  projectId?: string;
  task: any;
  formAction: (formData: FormData) => void;
  setEditMode: (value: boolean) => void;
  teamMembers: TeamMember[];
}) {
  return (
    <form action={formAction}>
      <div className="flex flex-col items-center justify-center ">
        <div className="w-full max-w-md space-y-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Edit Task</h1>
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
                defaultValue={task.title}
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
                defaultValue={task.description}
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
                  <Select name="status" defaultValue={task.status}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Change status" />
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
              <div className=" col-span-2">
                <label htmlFor="priority" className="text-sm font-medium">
                  Priority
                </label>
                <div className="relative">
                  <Select name="priority" defaultValue={task.priority}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Change Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="col-span-2">
                <label htmlFor="priority" className="text-sm font-medium">
                  Due Date
                </label>
                <input
                  type="date"
                  name="dueDate"
                  defaultValue={formatDateForInput(task.due_date)}
                  className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <input type="hidden" name="project_id" value={projectId} />
              </div>
              <div className=" col-span-2">
                <label htmlFor="priority" className="text-sm font-medium">
                  Assigned To
                </label>
                <div className="relative">
                  <Select name="assigned_to" defaultValue={task.assigned_to_id}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Assigned To" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {teamMembers.length > 0 ? (
                          teamMembers.map((member) => (
                            <SelectItem
                              key={member.id}
                              value={member.id}
                              className="p-2"
                            >
                              <div className="flex items-center space-x-2">
                                <Avatar>
                                  <AvatarImage
                                    src={member.avatar}
                                    alt="Avatar"
                                    className="w-9 h-9 rounded-full"
                                  />
                                  <AvatarFallback className="w-9 h-9 rounded-full">
                                    {member.name[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{member.name}</span>
                              </div>
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="" disabled>
                            Loading team members...
                          </SelectItem>
                        )}
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
              onClick={() => setEditMode(false)}
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 mx-2"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
