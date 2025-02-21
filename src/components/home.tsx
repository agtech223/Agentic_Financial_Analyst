import React from "react";
import UploadSection from "./UploadSection";
import AnalysisDashboard from "./AnalysisDashboard";
import RecommendationPanel from "./RecommendationPanel";

interface HomeProps {
  onFileUpload?: (file: File) => void;
  isUploading?: boolean;
  uploadProgress?: number;
  uploadError?: string;
  analysisData?: {
    metrics: {
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
    chartData: Array<{
      name: string;
      growth: number;
      valuation: number;
      inventory: number;
    }>;
    recommendation: {
      verdict: "buy" | "sell" | "hold";
      confidence: number;
      riskLevel: "low" | "medium" | "high";
      keyMetrics: Array<{
        name: string;
        value: number;
        trend: "up" | "down";
      }>;
      summary: string;
    };
  };
}

const defaultAnalysisData = {
  metrics: {
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
  },
  chartData: [
    { name: "Jan", growth: 65, valuation: 78, inventory: 82 },
    { name: "Feb", growth: 72, valuation: 75, inventory: 85 },
    { name: "Mar", growth: 68, valuation: 82, inventory: 87 },
    { name: "Apr", growth: 75, valuation: 85, inventory: 80 },
  ],
  recommendation: {
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
  },
};

const Home = ({
  onFileUpload = () => {},
  isUploading = false,
  uploadProgress = 0,
  uploadError = "",
  analysisData = defaultAnalysisData,
}: HomeProps) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Financial Report Analysis
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <UploadSection
              onFileUpload={onFileUpload}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
              error={uploadError}
              acceptedFileTypes={[".pdf", ".xlsx", ".xls"]}
            />

            <AnalysisDashboard
              metrics={analysisData.metrics}
              chartData={analysisData.chartData}
              onRefresh={() => {}}
              onExport={() => {}}
              onFilter={() => {}}
            />
          </div>

          <div className="lg:col-span-1">
            <RecommendationPanel data={analysisData.recommendation} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
