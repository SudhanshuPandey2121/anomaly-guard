
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileCheck, AlertCircle, FileSpreadsheet, FileX } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { validateCSVFile } from "@/lib/file-validation";

const UploadSection = ({ onUpload }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleUpload = async (file: File) => {
    setFileError("");
    setIsUploading(true);
    toast.info("Validating file...");
    
    try {
      // Validate the file
      const result = await validateCSVFile(file);
      
      if (!result.valid) {
        setFileError(result.message);
        toast.error(result.message);
        setIsUploading(false);
        return;
      }
      
      toast.success("File validated successfully!");
      
      // Simulate file upload progress
      let progress = 0;
      const uploadInterval = setInterval(() => {
        progress += 5;
        setUploadProgress(progress);
        
        if (progress >= 100) {
          clearInterval(uploadInterval);
          setIsUploading(false);
          setIsProcessing(true);
          simulateProcessing(result.data);
        }
      }, 150);
    } catch (error) {
      console.error("File validation error:", error);
      toast.error("Error validating file");
      setIsUploading(false);
    }
  };
  
  const simulateProcessing = (data: any) => {
    toast.success("Upload complete! Processing data...");
    
    // Simulate AI processing time
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Analysis complete!");
      if (onUpload && typeof onUpload === 'function') {
        onUpload(data);
      }
    }, 3000);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };
  
  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-10 md:py-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div 
        className={`glass-card p-6 md:p-10 rounded-xl max-w-3xl w-full text-center space-y-6 relative overflow-hidden ${
          isDragging ? 'border-accent' : 'border-white/10'
        }`}
        whileHover={{ boxShadow: "0 0 20px rgba(77, 124, 254, 0.3)" }}
        transition={{ duration: 0.3 }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept=".csv,.xlsx,.xls" 
          className="hidden" 
        />
        
        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div 
              key="processing"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="loading-ring mx-auto">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="upload"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="h-20 w-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                {fileError ? (
                  <FileX className="h-10 w-10 text-destructive" />
                ) : (
                  <FileSpreadsheet className="h-10 w-10 text-accent" />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <h2 className="text-2xl md:text-3xl font-bold">
          {isProcessing ? "Processing Your Data" : "Upload Your Sensor Data"}
        </h2>
        
        <p className="text-muted-foreground max-w-md mx-auto">
          {isProcessing 
            ? "Our AI is analyzing your data to identify potential anomalies. This will only take a moment."
            : "Upload your factory sensor data (.CSV or Excel) to analyze patterns and detect potential anomalies before they cause issues."
          }
        </p>
        
        {fileError && (
          <motion.div 
            className="text-destructive bg-destructive/10 p-3 rounded-md max-w-md mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="inline-block mr-2 h-4 w-4" />
            {fileError}
          </motion.div>
        )}
        
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
            className="flex flex-col gap-4 justify-center mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 animate-pulse-glow mx-auto"
              onClick={openFileDialog}
            >
              <FileCheck className="mr-2 h-5 w-5" />
              Upload CSV or Excel File
            </Button>
            
            <div className="text-sm text-muted-foreground mt-2">
              Or drag and drop file here
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default UploadSection;
