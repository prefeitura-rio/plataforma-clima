"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  value: {
    label: "Valor",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

interface LineChartComponentProps {
  valueRange: number[];
  stepRange: number[];
  name: string;
  chartData: { time: string; value: number }[];
}

export function LineChartComponent({ valueRange, stepRange, name, chartData }: LineChartComponentProps) {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Gráfico de Linha - {name} </CardTitle>
        <CardDescription>Fonte: GOES16 - Histórico de 12h</CardDescription>
      </CardHeader>
      <CardContent className="pt-[56px] w-[60vw] absolute right-0 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              domain={valueRange}
              tickLine={false}
              axisLine={false}
              ticks={stepRange}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="value"
              type="linear"
              stroke="var(--color-value)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}