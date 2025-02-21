import React from "react";
import MetricsTab from "./MetricsTab";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { RefreshCw, Download, Filter } from "lucide-react";

interface AnalysisDashboardProps {
  metrics?: {
    growth: Array<{
      name: string;
      value: number;
      change: number;
      trend: "up" | "down";
    }>;
    valuation: Array<{
      name: string;
      value: number;
      change: number;
      trend: "up" | "down";
    }>;
    inventory: Array<{
      name: string;
      value: number;
      change: number;
      trend: "up" | "down";
    }>;
    custom: Array<{
      name: string;
      value: number;
      change: number;
      trend: "up" | "down";
    }>;
  };
  chartData?: Array<{
    name: string;
    growth: number;
    valuation: number;
    inventory: number;
  }>;
  onRefresh?: () => void;
  onExport?: () => void;
  onFilter?: () => void;
}

const defaultMetrics = {
  growth: [
    { name: "Revenue Growth", value: 15.2, change: 2.3, trend: "up" },
    { name: "Profit Growth", value: 8.7, change: -1.2, trend: "down" },
  ],
  valuation: [
    { name: "P/E Ratio", value: 22.5, change: 1.5, trend: "up" },
    { name: "EV/EBITDA", value: 12.3, change: -0.8, trend: "down" },
  ],
  inventory: [
    { name: "Turnover Ratio", value: 6.2, change: 0.4, trend: "up" },
    { name: "Days Inventory", value: 45, change: -3, trend: "down" },
  ],
  custom: [
    { name: "Custom Metric 1", value: 84.5, change: 5.2, trend: "up" },
    { name: "Custom Metric 2", value: 67.8, change: -2.1, trend: "down" },
  ],
};

const defaultChartData = [
  { name: "Jan", growth: 65, valuation: 78, inventory: 82 },
  { name: "Feb", growth: 72, valuation: 75, inventory: 85 },
  { name: "Mar", growth: 68, valuation: 82, inventory: 87 },
  { name: "Apr", growth: 75, valuation: 85, inventory: 80 },
];

const AnalysisDashboard = ({
  metrics = defaultMetrics,
  chartData = defaultChartData,
  onRefresh = () => {},
  onExport = () => {},
  onFilter = () => {},
}: AnalysisDashboardProps) => {
  return (
    <Card className="w-full h-full bg-white dark:bg-gray-800">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Financial Analysis Dashboard</h2>
          <div className="flex gap-4">
            <Button variant="outline" onClick={onFilter}>
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" onClick={onRefresh}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" onClick={onExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="mt-6">
          <MetricsTab metrics={metrics} chartData={chartData} />
        </div>
      </div>
    </Card>
  );
};

export default AnalysisDashboard;
