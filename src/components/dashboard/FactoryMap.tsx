
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Thermometer, Gauge, Activity, RotateCw } from "lucide-react";

// Define sensor types and their status
type SensorType = "temperature" | "pressure" | "vibration" | "speed";
type SensorStatus = "normal" | "warning" | "critical";

interface Sensor {
  id: string;
  type: SensorType;
  name: string;
  status: SensorStatus;
  value: number;
  unit: string;
  position: { x: number; y: number };
}

// Mock sensor data
const generateSensors = (): Sensor[] => {
  const types: SensorType[] = ["temperature", "pressure", "vibration", "speed"];
  const statuses: SensorStatus[] = ["normal", "warning", "critical"];
  const sensors: Sensor[] = [];
  
  // Create 24 sensors with different types and positions
  for (let i = 0; i < 24; i++) {
    const type = types[i % types.length];
    // 70% normal, 20% warning, 10% critical for demo
    const randomStatus = Math.random() < 0.7 ? "normal" : Math.random() < 0.9 ? "warning" : "critical";
    
    let value: number;
    let unit: string;
    
    switch (type) {
      case "temperature":
        value = 65 + Math.random() * 30; // 65-95°C
        unit = "°C";
        break;
      case "pressure":
        value = 85 + Math.random() * 40; // 85-125 PSI
        unit = "PSI";
        break;
      case "vibration":
        value = 0.5 + Math.random() * 2.5; // 0.5-3.0 mm/s
        unit = "mm/s";
        break;
      case "speed":
        value = 1400 + Math.random() * 600; // 1400-2000 RPM
        unit = "RPM";
        break;
    }
    
    sensors.push({
      id: `sensor-${i}`,
      type,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} Sensor ${Math.floor(i / 4) + 1}-${i % 4 + 1}`,
      status: randomStatus,
      value: parseFloat(value.toFixed(1)),
      unit,
      position: {
        x: 10 + Math.random() * 80, // 10-90% of container width
        y: 10 + Math.random() * 80  // 10-90% of container height
      }
    });
  }
  
  return sensors;
};

const FactoryMap = () => {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [selectedType, setSelectedType] = useState<SensorType | "all">("all");
  const [hoveredSensor, setHoveredSensor] = useState<Sensor | null>(null);
  
  useEffect(() => {
    setSensors(generateSensors());
  }, []);
  
  const getIconForType = (type: SensorType) => {
    switch (type) {
      case "temperature":
        return <Thermometer size={16} />;
      case "pressure":
        return <Gauge size={16} />;
      case "vibration":
        return <Activity size={16} />;
      case "speed":
        return <RotateCw size={16} />;
    }
  };
  
  const getStatusColor = (status: SensorStatus) => {
    switch (status) {
      case "normal":
        return "bg-green-500 shadow-glow-green";
      case "warning":
        return "bg-amber-500 shadow-amber-500/50";
      case "critical":
        return "bg-red-500 shadow-glow-red";
    }
  };
  
  const filteredSensors = selectedType === "all" 
    ? sensors 
    : sensors.filter(sensor => sensor.type === selectedType);
  
  const stats = {
    total: sensors.length,
    normal: sensors.filter(s => s.status === "normal").length,
    warning: sensors.filter(s => s.status === "warning").length,
    critical: sensors.filter(s => s.status === "critical").length
  };
  
  return (
    <motion.div
      className="rounded-xl overflow-hidden glass-card min-h-[500px] relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="absolute top-0 left-0 right-0 bg-black/30 backdrop-blur-sm p-4 z-10 flex flex-wrap items-center justify-between">
        <h3 className="text-lg font-medium">Factory Sensor Map</h3>
        
        <div className="flex flex-wrap items-center space-x-2">
          <button
            onClick={() => setSelectedType("all")}
            className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
              selectedType === "all" 
                ? "bg-accent text-white" 
                : "bg-secondary/50 hover:bg-secondary"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedType("temperature")}
            className={`px-3 py-1.5 text-xs rounded-full transition-colors flex items-center ${
              selectedType === "temperature" 
                ? "bg-accent text-white" 
                : "bg-secondary/50 hover:bg-secondary"
            }`}
          >
            <Thermometer size={12} className="mr-1" /> Temperature
          </button>
          <button
            onClick={() => setSelectedType("pressure")}
            className={`px-3 py-1.5 text-xs rounded-full transition-colors flex items-center ${
              selectedType === "pressure" 
                ? "bg-accent text-white" 
                : "bg-secondary/50 hover:bg-secondary"
            }`}
          >
            <Gauge size={12} className="mr-1" /> Pressure
          </button>
          <button
            onClick={() => setSelectedType("vibration")}
            className={`px-3 py-1.5 text-xs rounded-full transition-colors flex items-center ${
              selectedType === "vibration" 
                ? "bg-accent text-white" 
                : "bg-secondary/50 hover:bg-secondary"
            }`}
          >
            <Activity size={12} className="mr-1" /> Vibration
          </button>
          <button
            onClick={() => setSelectedType("speed")}
            className={`px-3 py-1.5 text-xs rounded-full transition-colors flex items-center ${
              selectedType === "speed" 
                ? "bg-accent text-white" 
                : "bg-secondary/50 hover:bg-secondary"
            }`}
          >
            <RotateCw size={12} className="mr-1" /> Speed
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-4 z-10 bg-black/50 backdrop-blur-md rounded-md p-3 text-xs">
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span>Normal: {stats.normal}</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
            <span>Warning: {stats.warning}</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span>Critical: {stats.critical}</span>
          </div>
        </div>
      </div>
      
      {/* Factory background */}
      <div className="h-[500px] w-full relative">
        <img 
          src="https://utfs.io/f/7bb60de3-d750-43fc-9f4c-1bd7d36d5cee-c9nxsg.jpg"
          alt="Factory floor"
          className="w-full h-full object-cover opacity-30"
        />
        
        {/* Sensors */}
        {filteredSensors.map((sensor) => (
          <motion.div
            key={sensor.id}
            className={`absolute rounded-full flex items-center justify-center ${getStatusColor(sensor.status)}`}
            style={{
              left: `${sensor.position.x}%`,
              top: `${sensor.position.y}%`,
              width: hoveredSensor?.id === sensor.id ? "36px" : "24px",
              height: hoveredSensor?.id === sensor.id ? "36px" : "24px",
              zIndex: hoveredSensor?.id === sensor.id ? 30 : 20,
              transform: "translate(-50%, -50%)",
              boxShadow: `0 0 10px ${sensor.status === "normal" ? "rgba(34, 197, 94, 0.5)" : 
                          sensor.status === "warning" ? "rgba(245, 158, 11, 0.5)" : 
                          "rgba(239, 68, 68, 0.7)"}`
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 15,
              delay: Math.random() * 0.5 
            }}
            whileHover={{ scale: 1.2 }}
            onMouseEnter={() => setHoveredSensor(sensor)}
            onMouseLeave={() => setHoveredSensor(null)}
          >
            {getIconForType(sensor.type)}
          </motion.div>
        ))}
        
        {/* Tooltip */}
        {hoveredSensor && (
          <motion.div
            className="absolute z-40 bg-black/80 backdrop-blur-md rounded-md p-2 text-xs pointer-events-none"
            style={{
              left: `${hoveredSensor.position.x}%`,
              top: `${hoveredSensor.position.y - 10}%`,
              transform: "translate(-50%, -100%)"
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="font-medium mb-1">{hoveredSensor.name}</div>
            <div className="flex items-center justify-between">
              <span>Status: </span>
              <span className={
                hoveredSensor.status === "normal" ? "text-green-400" :
                hoveredSensor.status === "warning" ? "text-amber-400" : "text-red-400"
              }>
                {hoveredSensor.status.charAt(0).toUpperCase() + hoveredSensor.status.slice(1)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Value: </span>
              <span>{hoveredSensor.value} {hoveredSensor.unit}</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default FactoryMap;
