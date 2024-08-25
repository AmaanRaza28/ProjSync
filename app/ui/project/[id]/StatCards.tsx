import clsx from "clsx";
import { Triangle } from "lucide-react";

export default function StatCards({
  stats,
}: {
  stats: {
    title: string;
    value: string;
    change: string;
    icon: JSX.Element;
  }[];
}) {
  return (
    <div className="flex flex-col items-center">
      <hr className="w-[95%] my-5" />
      <div className="flex justify-between items-center w-full px-5">
        {stats.map((stat, index) => (
          <div className="flex gap-3 w-full h-full" key={index}>
            <div
              key={index}
              className="flex justify-center items-center bg-[#f2f3f2] w-12 h-12 rounded-full"
            >
              {stat.icon}
            </div>
            <div className="flex flex-col">
              <div className="">{stat.title}</div>
              <div className="flex items-end gap-2 font-bold">
                <div>{stat.value}</div>
                <div
                  className={clsx("text-sm flex items-center font-medium", {
                    "text-[#80d1b9]": stat.change.includes("+"),
                    "text-[#fd080c]": stat.change.includes("-"),
                  })}
                >
                  <Triangle
                    className={clsx("w-3 h-3", {
                      "text-[#80d1b9]": stat.change.includes("+"),
                      "text-[#fd080c] rotate-180": stat.change.includes("-"),
                    })}
                  />
                  {stat.change}
                </div>
              </div>
            </div>
            {index !== stats.length - 1 && (
              <div className="ml-auto mr-5 border-r border-[#e0e0e0] h-11" />
            )}
          </div>
        ))}
      </div>
      <hr className="w-[95%] my-5" />
    </div>
  );
}
