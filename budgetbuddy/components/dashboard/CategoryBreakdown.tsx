"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const CategoryBreakdown = () => {
  // Mock data - replace with real data from DB
  const data = [
    { name: "Food", value: 450, color: "#F87171" },
    { name: "Transport", value: 200, color: "#60A5FA" },
    { name: "Entertainment", value: 150, color: "#FBBF24" },
    { name: "Shopping", value: 300, color: "#34D399" },
    { name: "Other", value: 134, color: "#A78BFA" },
  ];

  return (
    <Card className="relative overflow-hidden border border-blue-100 dark:border-slate-800 bg-gradient-to-br from-blue-50 via-white to-blue-100/30 dark:from-[#0B1120] dark:via-[#0F172A] dark:to-[#1E293B] shadow-md hover:shadow-lg transition-all duration-300">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent pointer-events-none" />

      <CardHeader className="pb-2">
        <CardTitle className="font-heading text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Category Breakdown
        </CardTitle>
      </CardHeader>

      <CardContent className="relative z-10">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="#fff"
                  strokeWidth={2}
                  className="hover:scale-105 transition-transform"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255,255,255,0.9)",
                border: "1px solid #E5E7EB",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              itemStyle={{ color: "#111827", fontWeight: 500 }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: "10px",
                fontSize: "0.85rem",
                color: "hsl(var(--muted-foreground))",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CategoryBreakdown;
