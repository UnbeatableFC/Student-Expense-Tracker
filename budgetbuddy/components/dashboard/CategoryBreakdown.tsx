"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const CategoryBreakdown = () => {
  // Mock data - will be replaced with real data
    const data = [
    { name: "Food", value: 450, color: "#F87171" },
    { name: "Transport", value: 200, color: "#60A5FA" },
    { name: "Entertainment", value: 150, color: "#FBBF24" },
    { name: "Shopping", value: 300, color: "#34D399" },
    { name: "Other", value: 134, color: "#A78BFA" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">Category Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: " transparent",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend className="text-xs"/>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CategoryBreakdown;
