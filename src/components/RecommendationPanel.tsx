import React from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import {
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

interface RecommendationData {
  verdict: "buy" | "sell" | "hold";
  confidence: number;
  riskLevel: "low" | "medium" | "high";
  keyMetrics: Array<{
    name: string;
    value: number;
    trend: "up" | "down";
  }>;
  summary: string;
}

interface RecommendationPanelProps {
  data?: RecommendationData;
}

const defaultData: RecommendationData = {
  verdict: "buy",
  confidence: 85,
  riskLevel: "medium",
  keyMetrics: [
    { name: "P/E Ratio", value: 22.5, trend: "up" },
    { name: "Revenue Growth", value: 15.2, trend: "up" },
    { name: "Debt/Equity", value: 1.2, trend: "down" },
  ],
  summary:
    "Strong financial position with consistent growth metrics. Recommend accumulating positions with defined risk parameters.",
};

const RecommendationPanel = ({
  data = defaultData,
}: RecommendationPanelProps) => {
  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case "buy":
        return "bg-green-500";
      case "sell":
        return "bg-red-500";
      default:
        return "bg-yellow-500";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-800";
      case "high":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <Card className="w-full max-w-md p-6 bg-white dark:bg-gray-800">
      <div className="space-y-6">
        {/* Verdict Section */}
        <div className="text-center">
          <Badge
            className={`${getVerdictColor(
              data.verdict,
            )} text-white text-lg px-4 py-2 uppercase`}
          >
            {data.verdict}
          </Badge>
          <div className="mt-4 flex items-center justify-center gap-2">
            {data.confidence >= 75 ? (
              <CheckCircle2 className="text-green-500" />
            ) : data.confidence >= 50 ? (
              <AlertTriangle className="text-yellow-500" />
            ) : (
              <AlertCircle className="text-red-500" />
            )}
            <span className="text-xl font-semibold">
              {data.confidence}% Confidence
            </span>
          </div>
        </div>

        <Separator />

        {/* Risk Level */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Risk Level
          </h3>
          <Badge className={`mt-1 ${getRiskColor(data.riskLevel)}`}>
            {data.riskLevel.toUpperCase()}
          </Badge>
        </div>

        {/* Key Metrics */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
            Key Metrics
          </h3>
          <div className="space-y-3">
            {data.keyMetrics.map((metric, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded"
              >
                <span className="text-sm">{metric.name}</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{metric.value}</span>
                  {metric.trend === "up" ? (
                    <TrendingUp className="text-green-500 h-4 w-4" />
                  ) : (
                    <TrendingDown className="text-red-500 h-4 w-4" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analysis Progress */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Analysis Progress</span>
            <span>85%</span>
          </div>
          <Progress value={85} className="w-full" />
        </div>

        {/* Summary */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Summary
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {data.summary}
          </p>
        </div>

        {/* Action Button */}
        <Button className="w-full">
          View Detailed Analysis
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default RecommendationPanel;
