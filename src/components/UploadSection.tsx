import React from "react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Upload, FileType, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { motion, AnimatePresence } from "framer-motion";

interface UploadSectionProps {
  onFileUpload?: (file: File) => void;
  isUploading?: boolean;
  uploadProgress?: number;
  error?: string;
  acceptedFileTypes?: string[];
}

const UploadSection = ({
  onFileUpload = () => {},
  isUploading = false,
  uploadProgress = 0,
  error = "",
  acceptedFileTypes = [".pdf", ".xlsx", ".xls"],
}: UploadSectionProps) => {
  const [isDragging, setIsDragging] = React.useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileUpload(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800">
      <Card
        className={`p-8 border-2 border-dashed rounded-lg ${isDragging ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-300 dark:border-gray-600"}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: isDragging ? 1.1 : 1 }}
            className="p-4 rounded-full bg-blue-100 dark:bg-blue-900/30"
          >
            <Upload size={40} className="text-blue-500 dark:text-blue-400" />
          </motion.div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              Drag and drop your financial report
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Supported formats: {acceptedFileTypes.join(", ")}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">or</span>
          </div>

          <Button
            onClick={() => document.getElementById("file-upload")?.click()}
            disabled={isUploading}
          >
            Browse Files
          </Button>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept={acceptedFileTypes.join(",")}
            onChange={handleFileInput}
            disabled={isUploading}
          />
        </div>

        <AnimatePresence>
          {isUploading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 space-y-2"
            >
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6"
            >
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
};

export default UploadSection;
