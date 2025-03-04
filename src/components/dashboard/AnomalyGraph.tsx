import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  Legend
} from "recharts";
import { Thermometer, Gauge, Activity, RotateCw } from "lucide-react";

interface AnomalyGraphProps {
  sensorType?: "all" | "temperature" | "pressure" | "vibration" | "speed";
}

type SensorType = "temperature" | "pressure" | "vibration" | "speed";

// Generate mock anomaly data
const generateAnomalyData = (type: SensorType, days = 14) => {
  const data = [];
  const now = new Date();
  
  // Different threshold values based on sensor type
  let normalRange, criticalThreshold;
  
  switch (type) {
    case "temperature":
      normalRange = { min: 70, max: 85 };
      criticalThreshold = 90;
      break;
    case "pressure":
      normalRange = { min: 90, max: 110 };
      criticalThreshold = 120;
      break;
    case "vibration":
      normalRange = { min: 0.5, max: 1.5 };
      criticalThreshold = 2.5;
      break;
    case "speed":
      normalRange = { min: 1500, max: 1800 };
      criticalThreshold = 1950;
      break;
  }
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Create a value within normal range most of the time
    let value = normalRange.min + Math.random() * (normalRange.max - normalRange.min);
    
    // Add some anomalies
    if (i === 3 || i === 8 || i === 12) {
      // Spike above normal but below critical
      value = normalRange.max + Math.random() * (criticalThreshold - normalRange.max);
    } else if (i === 5) {
      // Critical spike
      value = criticalThreshold + Math.random() * 10;
    }
    
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: parseFloat(value.toFixed(2)),
      threshold: normalRange.max,
      critical: criticalThreshold
    });
  }
  
  return data;
};

const AnomalyGraph = ({ sensorType = "temperature" }: AnomalyGraphProps) => {
  // If sensorType is "all", default to "temperature" for display
  const effectiveSensorType = sensorType === "all" ? "temperature" : sensorType as SensorType;
  const [selectedType, setSelectedType] = useState<SensorType>(effectiveSensorType);
  const [data, setData] = useState(generateAnomalyData(selectedType));
  
  const handleTypeChange = (type: SensorType) => {
    setSelectedType(type);
    setData(generateAnomalyData(type));
  };
  
  const getUnit = () => {
    switch (selectedType) {
      case "temperature": return "°C";
      case "pressure": return "PSI";
      case "vibration": return "mm/s";
      case "speed": return "RPM";
    }
  };
  
  const getGraphGradient = () => {
    switch (selectedType) {
      case "temperature": return ["#f87171", "#ef4444"];
      case "pressure": return ["#60a5fa", "#2563eb"];
      case "vibration": return ["#a78bfa", "#7c3aed"];
      case "speed": return ["#4ade80", "#16a34a"];
    }
  };
  
  const formatTooltipValue = (value: number) => {
    return `${value} ${getUnit()}`;
  };
  
  return (
    <motion.div
      className="rounded-xl overflow-hidden glass-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <div className="p-4 border-b border-border">
        <div className="flex flex-wrap items-center justify-between">
          <h3 className="text-lg font-medium">Anomaly Detection</h3>
          
          <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
            <button
              onClick={() => handleTypeChange("temperature")}
              className={`px-3 py-1.5 text-xs rounded-full transition-colors flex items-center ${
                selectedType === "temperature" 
                  ? "bg-red-500 text-white" 
                  : "bg-secondary/50 hover:bg-secondary"
              }`}
            >
              <Thermometer size={12} className="mr-1" /> Temperature
            </button>
            <button
              onClick={() => handleTypeChange("pressure")}
              className={`px-3 py-1.5 text-xs rounded-full transition-colors flex items-center ${
                selectedType === "pressure" 
                  ? "bg-blue-500 text-white" 
                  : "bg-secondary/50 hover:bg-secondary"
              }`}
            >
              <Gauge size={12} className="mr-1" /> Pressure
            </button>
            <button
              onClick={() => handleTypeChange("vibration")}
              className={`px-3 py-1.5 text-xs rounded-full transition-colors flex items-center ${
                selectedType === "vibration" 
                  ? "bg-purple-500 text-white" 
                  : "bg-secondary/50 hover:bg-secondary"
              }`}
            >
              <Activity size={12} className="mr-1" /> Vibration
            </button>
            <button
              onClick={() => handleTypeChange("speed")}
              className={`px-3 py-1.5 text-xs rounded-full transition-colors flex items-center ${
                selectedType === "speed" 
                  ? "bg-green-500 text-white" 
                  : "bg-secondary/50 hover:bg-secondary"
              }`}
            >
              <RotateCw size={12} className="mr-1" /> Speed
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-2 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={getGraphGradient()[0]} stopOpacity={0.3} />
                <stop offset="95%" stopColor={getGraphGradient()[1]} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="date" 
              tick={{ fill: "#9ca3af" }}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            />
            <YAxis 
              tick={{ fill: "#9ca3af" }}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              domain={["auto", "auto"]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "rgba(17,17,17,0.9)",
                borderColor: "rgba(255,255,255,0.1)",
                borderRadius: "0.375rem",
                color: "#f9fafb" 
              }}
              formatter={(value: number) => [formatTooltipValue(value)]}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="threshold" 
              stroke="#fbbf24" 
              strokeDasharray="5 5"
              fill="none"
              strokeWidth={2}
              name="Threshold"
            />
            <Area 
              type="monotone" 
              dataKey="critical" 
              stroke="#ef4444" 
              strokeDasharray="5 5"
              fill="none"
              strokeWidth={2}
              name="Critical"
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={getGraphGradient()[0]} 
              fillOpacity={1}
              fill="url(#colorValue)" 
              strokeWidth={3}
              name={`${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} (${getUnit()})`}
              activeDot={{ r: 6, fill: getGraphGradient()[0], stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default AnomalyGraph;
