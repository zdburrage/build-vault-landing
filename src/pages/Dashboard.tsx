import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Building2,
  Calculator,
  FileText,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";

const Dashboard = () => {
  // Mock data - replace with real data from your backend
  const stats = [
    {
      title: "Active Projects",
      value: "12",
      icon: Building2,
      change: "+2",
      changeType: "positive",
    },
    {
      title: "Estimates Created",
      value: "48",
      icon: Calculator,
      change: "+12",
      changeType: "positive",
    },
    {
      title: "Reports Generated",
      value: "24",
      icon: FileText,
      change: "+5",
      changeType: "positive",
    },
  ];

  const recentProjects = [
    {
      name: "Storage Facility - Downtown",
      status: "In Progress",
      lastUpdated: "2 hours ago",
    },
    {
      name: "Self Storage Complex - Westside",
      status: "Completed",
      lastUpdated: "1 day ago",
    },
    {
      name: "Mini Storage Units - Eastside",
      status: "Pending",
      lastUpdated: "3 days ago",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button asChild>
          <Link to="/estimator/start" className="flex items-center gap-2">
            New Estimate <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.changeType === "positive" ? "text-green-500" : "text-red-500"
              }`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div
                key={project.name}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <p className="font-medium">{project.name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {project.lastUpdated}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {project.status === "Completed" ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : project.status === "In Progress" ? (
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                  ) : (
                    <Clock className="h-4 w-4 text-yellow-500" />
                  )}
                  <span className="text-sm">{project.status}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Button asChild variant="outline" className="justify-start">
                <Link to="/estimator/start" className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Create New Estimate
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link to="/projects" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  View All Projects
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link to="/reports" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Generate Reports
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current Plan</span>
                <span className="font-medium">Professional</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Next Billing Date</span>
                <span className="font-medium">March 1, 2024</span>
              </div>
              <Button asChild variant="outline" className="w-full">
                <Link to="/subscription">Manage Subscription</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard; 