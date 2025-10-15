import { CreditCard, DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ExpenseChart from "./ExpenseChart";
import CategoryBreakdown from "./CategoryBreakdown";


const DashboardOverview = () => {
  // Mock data - will be replaced with real data from Lovable Cloud
  const stats = [
    {
      title: "Total Expenses",
      value: "$1,234.56",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "This Month",
      value: "$456.78",
      change: "-8.3%",
      trend: "down",
      icon: CreditCard,
    },
    {
      title: "Average Daily",
      value: "$41.23",
      change: "+5.2%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Budget Left",
      value: "$543.22",
      change: "45%",
      trend: "down",
      icon: TrendingDown,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-heading font-bold text-foreground">
                {stat.value}
              </div>
              <p
                className={`text-xs ${
                  stat.trend === "up" ? "text-success" : "text-destructive"
                } mt-1`}
              >
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <ExpenseChart />
        <CategoryBreakdown />
      </div>

      {/* Suggestions Card */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle className="font-heading">💡 Smart Suggestions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2" />
            <div>
              <p className="font-medium text-foreground">
                Reduce dining expenses
              </p>
              <p className="text-sm text-muted-foreground">
                You&apos;ve spent 30% more on dining out this month. Consider meal prepping to save $150.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2" />
            <div>
              <p className="font-medium text-foreground">
                Entertainment budget alert
              </p>
              <p className="text-sm text-muted-foreground">
                You&apos;re approaching your entertainment budget limit. $80 remaining for this month.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
