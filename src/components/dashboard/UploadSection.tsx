
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Upload, Loader2 } from "lucide-react";

interface UploadSectionProps {
  onUploadComplete: () => void;
}

const UploadSection = ({ onUploadComplete }: UploadSectionProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analyzingProgress, setAnalyzingProgress] = useState(0);
  const [stage, setStage] = useState<"initial" | "uploading" | "analyzing" | "complete">("initial");
  
  const handleUpload = () => {
    setIsUploading(true);
    setStage("uploading");
    setUploadProgress(0);
    
    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(uploadInterval);
          setStage("analyzing");
          simulateAnalysis();
          return 100;
        }
        return newProgress;
      });
    }, 150);
  };
  
  const simulateAnalysis = () => {
    setAnalyzingProgress(0);
    
    // Simulate analysis progress
    const analysisInterval = setInterval(() => {
      setAnalyzingProgress((prev) => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(analysisInterval);
          setStage("complete");
          setIsUploading(false);
          toast.success("Analysis complete! Factory data ready to view.");
          onUploadComplete();
          return 100;
        }
        return newProgress;
      });
    }, 100);
  };
  
  const renderLoadingAnimation = () => {
    if (stage === "uploading") {
      return (
        <div className="space-y-4 w-full max-w-md mx-auto">
          <div className="w-full h-2 bg-muted overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-accent"
              initial={{ width: "0%" }}
              animate={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Uploading sensor data... {uploadProgress}%
          </p>
        </div>
      );
    }
    
    if (stage === "analyzing") {
      const stageTexts = [
        "Preprocessing data...",
        "Analyzing temperature patterns...",
        "Checking pressure readings...",
        "Running vibration analysis...",
        "Detecting anomalies...",
        "Generating insights..."
      ];
      
      const currentStageIndex = Math.min(
        Math.floor(analyzingProgress / (100 / stageTexts.length)),
        stageTexts.length - 1
      );
      
      return (
        <div className="space-y-6 w-full max-w-md mx-auto">
          <div className="loading-ring mx-auto">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="w-full h-2 bg-muted overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-accent"
              initial={{ width: "0%" }}
              animate={{ width: `${analyzingProgress}%` }}
            />
          </div>
          <div className="space-y-1">
            <p className="text-center font-medium">
              {stageTexts[currentStageIndex]}
            </p>
            <p className="text-center text-sm text-muted-foreground">
              AI processing... {analyzingProgress}%
            </p>
          </div>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <motion.div 
      className="bg-muted/30 rounded-xl p-8 text-center glass-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {stage === "initial" ? (
        <>
          <h3 className="text-xl font-semibold mb-4">Upload Sensor Data</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Upload your factory sensor data to analyze and detect anomalies using our AI-powered platform.
          </p>
          <Button 
            onClick={handleUpload} 
            className="bg-accent hover:bg-accent/90 animate-pulse-glow"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Data
          </Button>
        </>
      ) : (
        <>
          <h3 className="text-xl font-semibold mb-6">
            {stage === "uploading" ? "Uploading Data..." : 
             stage === "analyzing" ? "Analyzing with AI..." : 
             "Analysis Complete!"}
          </h3>
          {renderLoadingAnimation()}
          {stage === "complete" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <p className="text-accent font-medium mb-4">
                Your data has been successfully analyzed!
              </p>
              <Button 
                onClick={() => setStage("initial")} 
                variant="outline"
                className="border-accent/30 bg-accent/5 hover:bg-accent/10"
              >
                Upload New Data
              </Button>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default UploadSection;
