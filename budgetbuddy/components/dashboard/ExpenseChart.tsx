"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ExpenseChart = () => {
  // Mock data - replace with actual data later
  const data = [
    { name: "Mon", amount: 45 },
    { name: "Tue", amount: 78 },
    { name: "Wed", amount: 52 },
    { name: "Thu", amount: 91 },
    { name: "Fri", amount: 65 },
    { name: "Sat", amount: 120 },
    { name: "Sun", amount: 88 },
  ];

  return (
    <Card className="relative overflow-hidden border border-blue-100 dark:border-slate-800 bg-gradient-to-br from-blue-50 via-white to-blue-100/30 dark:from-[#0B1120] dark:via-[#0F172A] dark:to-[#1E293B] shadow-md hover:shadow-lg transition-all duration-300">
      {/* soft gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/10 to-transparent pointer-events-none" />

      <CardHeader className="pb-2">
        <CardTitle className="font-heading text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Weekly Spending Trend
        </CardTitle>
      </CardHeader>

      <CardContent className="relative z-10">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="rgba(148, 163, 184, 0.2)"
            />
            <XAxis
              dataKey="name"
              tick={{
                fontSize: 12,
                fill: "hsl(var(--muted-foreground))",
              }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{
                fontSize: 12,
                fill: "hsl(var(--muted-foreground))",
              }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255,255,255,0.9)",
                border: "1px solid #E5E7EB",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              itemStyle={{ color: "#111827", fontWeight: 500 }}
              labelStyle={{ color: "#2563EB", fontWeight: 600 }}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="url(#colorGradient)"
              strokeWidth={3}
              dot={{ fill: "#0A74DA", r: 5 }}
              activeDot={{ r: 7, fill: "#083D77", strokeWidth: 2 }}
            />
            <defs>
              <linearGradient
                id="colorGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#0A74DA"
                  stopOpacity={0.9}
                />
                <stop
                  offset="100%"
                  stopColor="#60A5FA"
                  stopOpacity={0.5}
                />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;
