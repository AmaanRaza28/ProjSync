import { Task } from "../../lib/definitions";
import { getLatestTasks, getLatestTasksData } from "../../lib/data";
import LatestTasksTable from "./LatestTasksTable";
import { Separator } from "@/components/ui/separator";

export default async function LatestTasks({ userId }: { userId: string }) {
  const latestTasks: Task[] = await getLatestTasks(userId);
  const { totaltasks, completedtasks, inprogresstasks } =
    await getLatestTasksData(userId);

  return (
    <div className="p-6 bg-[#fefffe] rounded-2xl shadow-md border-[1px] border-gray-100">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold text-gray-800">Latest tasks</h2>
          <p className="text-gray-600">
            <span className="font-bold text-gray-700">{totaltasks} total</span>,
            proceed to resolve them
          </p>
        </div>
        <div className="flex items-center space-x-8 mt-4 md:mt-0">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-gray-800">
              {completedtasks}
            </span>
            <span className="text-gray-600">Done</span>
          </div>
          <Separator orientation="vertical" className="mx-2" />
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-gray-800">
              {inprogresstasks}
            </span>
            <span className="text-gray-600">In progress</span>
          </div>
        </div>
      </div>
      <LatestTasksTable latestTasks={latestTasks} />
    </div>
  );
}
