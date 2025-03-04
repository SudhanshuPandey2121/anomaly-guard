
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileCheck, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const UploadSection = ({ onUpload }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const handleUpload = () => {
    setIsUploading(true);
    toast.info("Starting file upload");
    
    // Simulate file upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setIsUploading(false);
          setIsProcessing(true);
          simulateProcessing();
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  const simulateProcessing = () => {
    toast.success("Upload complete! Processing data...");
    
    // Simulate AI processing time
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Analysis complete!");
      onUpload();
    }, 3000);
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div 
        className="glass-card p-10 rounded-xl max-w-3xl w-full text-center space-y-6 relative overflow-hidden"
        whileHover={{ boxShadow: "0 0 20px rgba(77, 124, 254, 0.3)" }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
        
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {isProcessing ? (
            <div className="mb-6">
              <div className="loading-ring mx-auto">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            <div className="h-20 w-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <Upload className="h-10 w-10 text-accent" />
            </div>
          )}
        </motion.div>
        
        <h2 className="text-2xl md:text-3xl font-bold">
          {isProcessing ? "Processing Your Data" : "Upload Your Sensor Data"}
        </h2>
        
        <p className="text-muted-foreground max-w-md mx-auto">
          {isProcessing 
            ? "Our AI is analyzing your data to identify potential anomalies. This will only take a moment."
            : "Upload your factory sensor data to analyze patterns and detect potential anomalies before they cause issues."
          }
        </p>
        
        {isUploading && (
          <div className="w-full max-w-md mx-auto">
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: `${uploadProgress}%` }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              {uploadProgress}% Uploaded
            </div>
          </div>
        )}
        
        {!isUploading && !isProcessing && (
          <motion.div 
            className="flex flex-col md:flex-row gap-4 justify-center mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 animate-pulse-glow"
              onClick={handleUpload}
            >
              <FileCheck className="mr-2 h-5 w-5" />
              Upload CSV File
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-accent/50 hover:bg-accent/10"
            >
              <AlertCircle className="mr-2 h-5 w-5" />
              View Sample Data
            </Button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default UploadSection;
