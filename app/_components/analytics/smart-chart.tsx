/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function SmartChart({
  title,
  type,
  dataKey,
  colors,
  height = 300,
}: SmartChartProps) {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/analytics");
        const json = await response.json();

        if (response.ok) {
          let chartData: ChartData[] = [];
          const chartColors =
            colors ||
            (dataKey === "healthDistribution"
              ? DEFAULT_COLORS.health
              : DEFAULT_COLORS.category);

          if (dataKey === "healthDistribution") {
            chartData = [
              { name: "Healthy", value: json.healthDistribution.healthy },
              { name: "Declining", value: json.healthDistribution.declining },
              { name: "Critical", value: json.healthDistribution.critical },
            ];
          } else if (dataKey === "categoryDistribution") {
            chartData = Object.entries(
              json.categoryDistribution as Record<string, number>
            )
              .filter(([, count]) => count > 0)
              .map(([category, count]) => ({
                name: category,
                value: count as number,
              }));
          }

          // Add colors to data
          chartData = chartData.map((item, index) => ({
            ...item,
            color: chartColors[index % chartColors.length],
          }));

          setData(chartData);
        } else {
          setError(json.error || "Failed to load data");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [dataKey, colors]);

  const renderChart = (): React.ReactElement => {
    if (type === "pie" || type === "donut") {
      return (
        <PieChart>
          <Pie
            data={data.filter((item) => item.value > 0)}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={type === "donut" ? 80 : 100}
            innerRadius={type === "donut" ? 40 : 0}
            label={({ value = 0 }) => {
              const total = data.reduce((sum, item) => sum + item.value, 0);
              const percent = total > 0 ? Math.round((value / total) * 100) : 0;
              return value > 0 ? `${percent}%` : "";
            }}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => [value, "Count"]} />
          <Legend />
        </PieChart>
      );
    }

    if (type === "bar") {
      return (
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} />
          <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            formatter={(value: number) => [value, "Count"]}
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "6px",
            }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="#3b82f6">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || "#3b82f6"} />
            ))}
          </Bar>
        </BarChart>
      );
    }

    return <></>;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">
        {title}
      </h2>

      {data.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No data to display</div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={height}>
            {renderChart()}
          </ResponsiveContainer>

          {/* Summary Stats */}
          <div
            className={`mt-4 grid gap-4 text-center ${
              data.length <= 2
                ? "grid-cols-2"
                : data.length <= 3
                ? "grid-cols-3"
                : "grid-cols-4"
            }`}
          >
            {data.map((item) => (
              <div key={item.name} className="text-sm">
                <div
                  className="w-3 h-3 rounded-full mx-auto mb-1"
                  style={{ backgroundColor: item.color }}
                />
                <div className="font-medium text-gray-900">{item.value}</div>
                <div className="text-gray-600">{item.name}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
type ChartType = "pie" | "bar" | "donut";

type ChartData = {
  name: string;
  value: number;
  color?: string;
};

type SmartChartProps = {
  title: string;
  type: ChartType;
  dataKey: "healthDistribution" | "categoryDistribution";
  colors?: string[];
  height?: number;
};

const DEFAULT_COLORS = {
  health: ["#22c55e", "#eab308", "#ef4444"],
  category: ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"],
};
