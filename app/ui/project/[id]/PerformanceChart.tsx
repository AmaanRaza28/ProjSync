"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChevronDown, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid } from "recharts";

import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
const chartConfig = {
  desktop: {
    label: "This Month",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Last Month",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function PerformanceChart({
  data,
}: {
  data: { date: string; thisMonth: number; lastMonth: number }[];
}) {
  return (
    <Card className="bg-white">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-4">Performance</h3>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="thisMonth" stroke="#8884d8" />
              <Line type="monotone" dataKey="lastMonth" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function PerformanceChart2({
  data,
}: {
  data: {
    date: string;
    "this Month": number;
    "last Month": number;
  }[];
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold ">Performance</h3>
        <div className="flex justify-center items-center w-24 h-8 bg-[#f2f3f2] rounded-full">
          <span className="text-xs ">01-07 Aug </span>
          <ChevronDown className="ml-1 h-4 w-4" />
        </div>
      </div>
      <div className="w-full h-64 -ml-11">
        <ChartContainer className="h-[100%] w-[100%]" config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={5}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="this Month"
              type="monotone"
              stroke="#75aedd"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="last Month"
              type="monotone"
              stroke="#fab476"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
}
