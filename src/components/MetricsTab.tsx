import React from "react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  TrendingUp,
  DollarSign,
  Package,
} from "lucide-react";

interface MetricData {
  name: string;
  value: number;
  change: number;
  trend: "up" | "down";
}

interface MetricsTabProps {
  metrics?: {
    growth: MetricData[];
    valuation: MetricData[];
    inventory: MetricData[];
    custom: MetricData[];
  };
  chartData?: Array<{
    name: string;
    growth: number;
    valuation: number;
    inventory: number;
  }>;
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

const MetricCard = ({ metric }: { metric: MetricData }) => {
  return (
    <Card className="p-4 bg-white dark:bg-gray-800">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {metric.name}
          </p>
          <h3 className="text-2xl font-bold mt-1">{metric.value}%</h3>
        </div>
        <div
          className={`flex items-center ${metric.trend === "up" ? "text-green-500" : "text-red-500"}`}
        >
          {metric.trend === "up" ? (
            <ArrowUpCircle size={24} />
          ) : (
            <ArrowDownCircle size={24} />
          )}
          <span className="ml-1">{Math.abs(metric.change)}%</span>
        </div>
      </div>
    </Card>
  );
};

const MetricsTab = ({
  metrics = defaultMetrics,
  chartData = defaultChartData,
}: MetricsTabProps) => {
  return (
    <div className="w-full h-full p-6 bg-gray-50 dark:bg-gray-900">
      <Tabs defaultValue="growth" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="growth">
            <TrendingUp className="mr-2" />
            Growth Metrics
          </TabsTrigger>
          <TabsTrigger value="valuation">
            <DollarSign className="mr-2" />
            Valuation Ratios
          </TabsTrigger>
          <TabsTrigger value="inventory">
            <Package className="mr-2" />
            Inventory Analysis
          </TabsTrigger>
          <TabsTrigger value="custom">
            <TrendingUp className="mr-2" />
            Custom Parameters
          </TabsTrigger>
        </TabsList>

        {Object.entries(metrics).map(([category, data]) => (
          <TabsContent key={category} value={category} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.map((metric, index) => (
                <MetricCard key={index} metric={metric} />
              ))}
            </div>

            <Card className="p-6 bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold mb-4">Trend Analysis</h3>
              <div className="w-full h-[300px]">
                <LineChart
                  width={800}
                  height={300}
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey={category}
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </div>
            </Card>

            <Card className="p-6 bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold mb-4">Analysis Progress</h3>
              <Progress value={66} className="w-full" />
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MetricsTab;
