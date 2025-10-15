"use client"

import DashboardOverview from "@/components/dashboard/DashboardOverview";
import { useUser } from "@clerk/nextjs";

const Dashboard = () => {
  const {user} = useUser()
  return (
    <div className="flex flex-col px-2 space-y-3">
      <div className="flex flex-col items-start justify-between gap-3 text-primary">
        <h5 className="text-4xl uppercase font-bold font-raleway">Your Dashboard</h5>
        <p className="text-2xl">Welcome back,<span className="uppercase italic font-semibold">{user?.firstName}</span> !</p>
      </div>
        <DashboardOverview />
    </div>
  );
};

export default Dashboard;