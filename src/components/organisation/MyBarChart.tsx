"use client"

import { BarChart } from "@/components/BarChart"

export interface MyBarChartDataItem {
    date: string,
    carsLocAmount: number
    driversLocAmount: number
}

interface MyBarChartProps {
  data: MyBarChartDataItem[]
}

export const MyBarChart = ({data}: MyBarChartProps) => (
  <BarChart
    className="h-80 w-full"
    data={data}
    index="date"
    categories={["carsLocAmount", "driversLocAmount"]}
    valueFormatter={(number: number) =>
      `${Intl.NumberFormat("fr-CM").format(number)} XAF`
    }    
    onValueChange={(v) => console.log(v)}
    xAxisLabel="Month"
    yAxisLabel="Amount"
  />
)