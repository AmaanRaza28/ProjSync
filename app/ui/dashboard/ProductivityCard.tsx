"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Line, LineChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "Mon", research: 186, productivity: 80 },
  { month: "Tue", research: 305, productivity: 200 },
  { month: "Wed", research: 237, productivity: 120 },
  { month: "Thu", research: 73, productivity: 190 },
  { month: "Fri", research: 209, productivity: 130 },
  { month: "Sat", research: 214, productivity: 140 },
];
const chartConfig = {
  research: {
    label: "Last Month",
    color: "hsl(var(--chart-1))",
  },
  productivity: {
    label: "Current Month",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function ProductivityCard({ userId }: { userId: string }) {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="px-3">Productivity</CardTitle>
        <CardDescription className=" flex items-center px-3 py-2">
          <div className="w-2 h-2 rounded-full bg-[#448d89] mr-2"></div> Current
          Month
          <div className="w-2 h-2 rounded-full bg-[#e36b52] ml-3 mr-2"></div>{" "}
          Last Month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="research"
              type="monotone"
              stroke="var(--color-research)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="productivity"
              type="monotone"
              stroke="var(--color-productivity)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
