"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A linear line chart"



const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

interface LineChartComponentProps {
  sateliteView: string;
  data: any;
};


export function LineChartComponent({ sateliteView, data }: LineChartComponentProps) {
  const chartData = [
    { time: data.time, val: Number(data[sateliteView.toLowerCase()]["val"]) },
    // { time: "February", desktop: 305 },
    // { time: "March", desktop: 237 },
    // { time: "April", desktop: 73 },
    // { time: "May", desktop: 209 },
    // { time: "June", desktop: 214 },
  ]
  console.log("val", chartData)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gráfico de Linha - {sateliteView}</CardTitle>
        <CardDescription>Fonte: GOES16</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -28,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              dataKey="val"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="val"
              type="linear"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
