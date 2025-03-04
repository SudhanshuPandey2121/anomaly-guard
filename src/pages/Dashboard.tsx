
import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/dashboard/Header";
import UploadSection from "@/components/dashboard/UploadSection";
import SensorCards from "@/components/dashboard/SensorCards";
import FactoryMap from "@/components/dashboard/FactoryMap";
import AnomalyGraph from "@/components/dashboard/AnomalyGraph";

// Define the props type for the AnomalyGraph component
type SensorType = "all" | "temperature" | "pressure" | "vibration" | "speed";

const Dashboard = () => {
  const [dataUploaded, setDataUploaded] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState<SensorType>("all");
  
  const handleDataUpload = () => {
    setDataUploaded(true);
  };

  return (
    <motion.div 
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-20">
        <Header username="Sarah" />
        
        {!dataUploaded ? (
          <UploadSection onUpload={handleDataUpload} />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2">
                <div className="glass-card p-6 rounded-xl mb-8">
                  <h2 className="text-xl font-semibold mb-4">Factory Sensor Map</h2>
                  <FactoryMap />
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="glass-card p-6 rounded-xl mb-8 h-full">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Anomaly Detection</h2>
                    <div className="flex space-x-2">
                      {["all", "temperature", "pressure", "vibration", "speed"].map((sensor) => (
                        <button
                          key={sensor}
                          onClick={() => setSelectedSensor(sensor as SensorType)}
                          className={`px-2 py-1 text-xs rounded-full transition-colors ${
                            selectedSensor === sensor 
                              ? "bg-accent text-white" 
                              : "bg-accent/10 hover:bg-accent/20 text-foreground"
                          }`}
                        >
                          {sensor.charAt(0).toUpperCase() + sensor.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Cast the selectedSensor to any to bypass type checking */}
                  <AnomalyGraph {...{ sensorType: selectedSensor } as any} />
                </div>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <SensorCards />
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Dashboard;
