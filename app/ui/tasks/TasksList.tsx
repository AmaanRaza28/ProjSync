export default function TasksList() {
  return (
    <div className="p-4 bg-white shadow-md rounded-md mt-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Current Tasks</h2>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Done 30%</span>
          <button className="p-2 rounded-md bg-gray-100">Week</button>
        </div>
      </div>
      <ul>
        <li className="flex items-center justify-between py-2 border-b">
          <div className="flex items-center">
            <span className="w-4 h-4 bg-orange-500 rounded-full"></span>
            <span className="ml-2">Product Review for UI8 Market</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">In progress</span>
            <span className="text-gray-500">4h</span>
            <button className="p-2 rounded-md bg-gray-100">...</button>
          </div>
        </li>
        <li className="flex items-center justify-between py-2 border-b">
          <div className="flex items-center">
            <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
            <span className="ml-2">UX Research for Product</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">On hold</span>
            <span className="text-gray-500">8h</span>
            <button className="p-2 rounded-md bg-gray-100">...</button>
          </div>
        </li>
        <li className="flex items-center justify-between py-2 border-b">
          <div className="flex items-center">
            <span className="w-4 h-4 bg-green-500 rounded-full"></span>
            <span className="ml-2">App design and development</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">Done</span>
            <span className="text-gray-500">32h</span>
            <button className="p-2 rounded-md bg-gray-100">...</button>
          </div>
        </li>
      </ul>
    </div>
  );
}
