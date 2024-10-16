// @ts-nocheck
"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"

// Helper function to format date to HH:mm
const formatHour = (date: Date) => date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })

const chartConfig = {
  value: {
    label: "Valor",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

type DataPoint = {
  valueRange: number[];
  stepRange: number[];
  name: string;
  sateliteView: string;
  unit: string;
}

export function LineChartComponent({ valueRange, stepRange, name, sateliteView, unit }: DataPoint) {
  const [data, setData] = useState<DataPoint[]>([])
  const currentTime = new Date();
  currentTime.setSeconds(20, 0);
  const minutes = currentTime.getMinutes();
  currentTime.setMinutes(Math.floor(minutes / 10) * 10);
  const currentTimeBrasilia = new Date(currentTime.getTime());
  const startTimeBrasilia = new Date(currentTimeBrasilia.getTime() - 12 * 60 * 60 * 1000); // 12 horas atrás

  const startTime = startTimeBrasilia;
  const endTime = currentTimeBrasilia;

  const fetchData = async () => {
    try {
      const product = sateliteView.toLowerCase();

      const response = await fetch(
        `https://gw.dados.rio/plataforma-clima-staging/satellite/goes16/chart/${product}?start_time=${startTimeBrasilia.toISOString()}&end_time=${currentTimeBrasilia.toISOString()}`
      );
      const jsonData = await response.json()
      // console.log(jsonData)

      const sortedData = jsonData
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
        .map(item => ({
          timestamp: new Date(item.timestamp),
          value: item.value
        }))

      setData(sortedData)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    fetchData()
    const intervalId = setInterval(fetchData, 60000); // refresh each 1 minute 

    return () => clearInterval(intervalId); // cleanup the interval on component unmount
  }, [sateliteView])

  const customTickFormatter = (timestamp: number) => {
    return formatHour(new Date(timestamp))
  }

  const customTicks = () => {
    const ticks = []
    for (let i = 0; i < 13; i++) {
      ticks.push(new Date(startTime.getTime() + i * 60 * 60 * 1000))
    }
    return ticks
  }

  return (
    <Card className="w-full h-full">
      <CardContent className=" w-[70vw] absolute right-0 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <CardHeader>
          <CardTitle>Gráfico de Linha - {name} </CardTitle>
          <CardDescription>Fonte: GOES16 - Histórico de 12h</CardDescription>
        </CardHeader>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{
              left: 12,
              right: 12,
            }}>
              <CartesianGrid vertical={true} />
              <XAxis
                dataKey="timestamp"
                type="number"
                domain={[startTime.getTime(), endTime.getTime()]}
                tickFormatter={customTickFormatter}
                ticks={customTicks().map(d => d.getTime())}
                label={{ value: "Horas", position: "center", dy: 10 }}
              />
              <YAxis
                domain={valueRange}
                tickLine={false}
                axisLine={false}
                ticks={stepRange}
                tickMargin={8}
                label={{ value: unit, angle: -90, position: "insideLeft", }}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                isAnimationActive={false}
                dataKey="value"
                type="linear"
                stroke="var(--color-value)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}