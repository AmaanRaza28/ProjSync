import { CheckCircleIcon, ClockIcon, ThumbsUpIcon } from "lucide-react";

export default function TasksStatistics() {
  return (
    <>
      <div className="grid grid-cols-3 gap-4 p-4">
        <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-md">
          <div className="flex items-center">
            <ThumbsUpIcon className="w-8 h-8 text-gray-500" />
            <div className="ml-3">
              <h2 className="text-xl font-bold">Finished</h2>
              <p className="text-green-500">
                18 <span className="text-sm text-gray-500">+8 tasks</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-md">
          <div className="flex items-center">
            <ClockIcon className="w-8 h-8 text-gray-500" />
            <div className="ml-3">
              <h2 className="text-xl font-bold">Tracked</h2>
              <p className="text-red-500">
                31h <span className="text-sm text-gray-500">-6 hours</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-md">
          <div className="flex items-center">
            <CheckCircleIcon className="w-8 h-8 text-gray-500" />
            <div className="ml-3">
              <h2 className="text-xl font-bold">Efficiency</h2>
              <p className="text-green-500">
                93% <span className="text-sm text-gray-500">+12%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
