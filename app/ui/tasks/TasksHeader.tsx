import { ClockIcon } from "lucide-react";

export default function TasksHeader() {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md">
      <div>
        <h1 className="text-2xl font-bold">Hello, Amaan</h1>
        <p className="text-gray-500">
          Track team progress here. You almost reach a goal!
        </p>
      </div>
      <div className="text-gray-500">
        <span>16 May, 2023</span>
        <button className="ml-2 p-2 rounded-full hover:bg-gray-100">
          <ClockIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
