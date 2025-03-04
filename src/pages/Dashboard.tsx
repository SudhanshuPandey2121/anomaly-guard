
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/dashboard/Header";
import UploadSection from "@/components/dashboard/UploadSection";
import FactoryMap from "@/components/dashboard/FactoryMap";
import AnomalyGraph from "@/components/dashboard/AnomalyGraph";
import SensorCards from "@/components/dashboard/SensorCards";

const Dashboard = () => {
  const [dataUploaded, setDataUploaded] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
    }
  }, [navigate]);
  
  const handleUploadComplete = () => {
    setDataUploaded(true);
  };
  
  return (
    <motion.div 
      className="min-h-screen bg-background text-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {!dataUploaded ? (
          <div className="py-20">
            <UploadSection onUploadComplete={handleUploadComplete} />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <FactoryMap />
              <AnomalyGraph />
            </div>
            
            <SensorCards />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Dashboard;
