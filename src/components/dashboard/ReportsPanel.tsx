
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Calendar, TrendingUp } from "lucide-react";
import AnomalyGraph from "@/components/dashboard/AnomalyGraph";
import SensorCards from "@/components/dashboard/SensorCards";
import { exportMultipleChartsAsPDF } from "@/lib/pdf-export";
import { toast } from "sonner";

const ReportsPanel = () => {
  const [selectedTab, setSelectedTab] = useState("daily");
  const [selectedSensor, setSelectedSensor] = useState<"all" | "temperature" | "pressure" | "vibration" | "speed">("all");
  const reportRef = useRef<HTMLDivElement>(null);
  
  const downloadReport = async () => {
    if (!reportRef.current) {
      toast.error("Could not generate report");
      return;
    }
    
    // Get all chart elements
    const chartElements = reportRef.current.querySelectorAll(".report-chart");
    
    if (chartElements.length === 0) {
      toast.error("No charts found to export");
      return;
    }
    
    await exportMultipleChartsAsPDF(
      Array.from(chartElements) as HTMLElement[],
      `factory_report_${selectedTab}.pdf`,
      `Factory Sensor ${selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)} Report`
    );
  };
  
  const handleSensorTypeChange = (type: "all" | "temperature" | "pressure" | "vibration" | "speed") => {
    setSelectedSensor(type);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card p-6 rounded-xl"
      ref={reportRef}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-accent" />
          <h2 className="text-xl font-semibold">Sensor Reports</h2>
        </div>
        
        <Button variant="outline" onClick={downloadReport}>
          <Download className="mr-2 h-4 w-4" />
          Export PDF
        </Button>
      </div>
      
      <Tabs defaultValue={selectedTab} onValueChange={(value) => setSelectedTab(value as string)}>
        <TabsList className="mb-6">
          <TabsTrigger value="daily" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Daily
          </TabsTrigger>
          <TabsTrigger value="weekly" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Weekly
          </TabsTrigger>
          <TabsTrigger value="monthly" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Monthly
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            Trends
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily" className="space-y-6">
          <div className="report-chart" data-title="Daily Anomaly Distribution">
            <h3 className="text-lg font-medium mb-3">Daily Anomaly Distribution</h3>
            <div className="bg-background/50 p-4 rounded-lg">
              <AnomalyGraph sensorType={selectedSensor} period="daily" />
            </div>
          </div>
          
          <div className="report-chart" data-title="Sensor Status Overview">
            <h3 className="text-lg font-medium mb-3">Sensor Status Overview</h3>
            <SensorCards />
          </div>
        </TabsContent>
        
        <TabsContent value="weekly" className="space-y-6">
          <div className="report-chart" data-title="Weekly Anomaly Distribution">
            <h3 className="text-lg font-medium mb-3">Weekly Anomaly Trends</h3>
            <div className="bg-background/50 p-4 rounded-lg">
              <AnomalyGraph sensorType={selectedSensor} period="weekly" />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="monthly" className="space-y-6">
          <div className="report-chart" data-title="Monthly Anomaly Distribution">
            <h3 className="text-lg font-medium mb-3">Monthly Analysis</h3>
            <div className="bg-background/50 p-4 rounded-lg">
              <AnomalyGraph sensorType={selectedSensor} period="monthly" />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-6">
          <div className="report-chart" data-title="Anomaly Trends">
            <h3 className="text-lg font-medium mb-3">Long-term Trends</h3>
            <div className="bg-background/50 p-4 rounded-lg">
              <AnomalyGraph sensorType={selectedSensor} period="trends" showTrends />
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 border-t border-border/30 pt-4">
        <h3 className="text-sm font-medium mb-3">Filter by Sensor Type:</h3>
        <div className="flex flex-wrap gap-2">
          {["all", "temperature", "pressure", "vibration", "speed"].map((type) => (
            <Button
              key={type}
              variant={selectedSensor === type ? "default" : "outline"}
              size="sm"
              onClick={() => handleSensorTypeChange(type as any)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ReportsPanel;
