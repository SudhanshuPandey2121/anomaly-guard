import { useState } from "react";
import { motion } from "framer-motion";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { Thermometer, Gauge, Activity, RotateCw } from "lucide-react";

interface AnomalyGraphProps {
  sensorType?: "all" | "temperature" | "pressure" | "vibration" | "speed";
}

type SensorType = "temperature" | "pressure" | "vibration" | "speed";

const sensorIcons = {
  temperature: <Thermometer className="text-red-500" />,
  pressure: <Gauge className="text-blue-500" />,
  vibration: <Activity className="text-green-500" />,
  speed: <RotateCw className="text-yellow-500" />
};

const generateAnomalyData = (type: SensorType) => {
  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      name: `Day ${i + 1}`,
      value: Math.floor(Math.random() * 100),
      type: type,
    });
  }
  return data;
};

const AnomalyGraph = ({ sensorType = "all" }: AnomalyGraphProps) => {
  const effectiveSensorType = sensorType === "all" ? "temperature" : sensorType as SensorType;
  const [selectedType, setSelectedType] = useState<SensorType>(effectiveSensorType);
  const [data, setData] = useState(generateAnomalyData(selectedType));
  
  const handleTypeChange = (type: SensorType) => {
    setSelectedType(type);
    setData(generateAnomalyData(type));
  };

  return (
    <div>
      <div className="flex space-x-2 mb-4">
        {Object.keys(sensorIcons).map((key) => (
          <button
            key={key}
            onClick={() => handleTypeChange(key as SensorType)}
            className={`flex items-center space-x-1 p-2 rounded-md ${
              selectedType === key ? "bg-accent text-white" : "bg-accent/10 text-foreground"
            }`}
          >
            {sensorIcons[key as SensorType]}
            <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
          </button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnomalyGraph;
