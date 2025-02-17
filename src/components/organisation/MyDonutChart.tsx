import React, { useCallback, useEffect, useState } from "react"
import { DonutChart, TooltipProps } from "@/components/DonutChart"

export interface DataItem {
  name: string
  amount: number
}

interface MyDonutChartProps {
  title: string
  data: DataItem[]
  defaultValue: number
}

export default function MyDonutChart({ title, data, defaultValue }: MyDonutChartProps) {
  const [datas, setDatas] = useState<TooltipProps | null>(null)
  const [tooltipData, setTooltipData] = useState<TooltipProps | null>(null)

  const handleTooltipCallback = useCallback((props: TooltipProps) => {
    requestAnimationFrame(() => {
      setTooltipData((prev) => (prev?.active !== props.active ? props : prev));
    });
  }, []);

  useEffect(() => {
    setDatas(tooltipData);
  }, [tooltipData]);

  const sumNumericArray = (arr: number[]): number =>
    arr.reduce((sum, num) => sum + num, 0);

  const payload = datas?.payload?.[0];
  const value = payload?.value ?? 0;

  const formattedValue = payload
    ? value || defaultValue
    : sumNumericArray(data.map((dataPoint) => dataPoint.amount));

  return (
    <div>
      <p className="text-center text-sm font-bold text-gray-700">{title}</p>
      <p className="w-full text-center text-xl font-semibold text-primary-blue">
        {formattedValue}
      </p>
      <DonutChart
        data={data}
        category="name"
        value="amount"
        className="mx-auto mt-8"
        colors={["blue", "emerald", "cyan", "emerald"]}
        tooltipCallback={handleTooltipCallback}
      />
    </div>
  );
}
