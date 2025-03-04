
import { motion } from "framer-motion";
import { Thermometer, Gauge, Activity, RotateCw, AlertTriangle } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

// Generate mock sensor data
const generateSensorData = (min: number, max: number, unit: string, isAnomaly = false) => {
  const points = 20;
  const data = [];
  
  for (let i = 0; i < points; i++) {
    let value;
    
    if (isAnomaly && i > 14) {
      // Create anomaly spike for the last few points
      value = max + Math.random() * (max - min) * 0.3;
    } else {
      // Normal range
      value = min + Math.random() * (max - min) * 0.7;
    }
    
    data.push({
      time: i,
      value: parseFloat(value.toFixed(1)),
      unit
    });
  }
  
  return data;
};

const SensorCards = () => {
  const sensorData = [
    {
      id: 1,
      name: "Temperature Sensor A1",
      type: "temperature",
      icon: Thermometer,
      data: generateSensorData(70, 85, "°C"),
      status: "normal",
      color: "green",
    },
    {
      id: 2,
      name: "Pressure Sensor B2",
      type: "pressure",
      icon: Gauge,
      data: generateSensorData(90, 110, "PSI", true),
      status: "critical",
      color: "red",
    },
    {
      id: 3,
      name: "Vibration Sensor C3",
      type: "vibration",
      icon: Activity,
      data: generateSensorData(0.5, 1.5, "mm/s"),
      status: "normal",
      color: "green",
    },
    {
      id: 4,
      name: "Speed Sensor D4",
      type: "speed",
      icon: RotateCw,
      data: generateSensorData(1500, 1800, "RPM", true),
      status: "warning",
      color: "amber",
    }
  ];
  
  const getStatusColorClasses = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-500/10 text-green-400 border-green-500/30";
      case "warning":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "critical":
        return "bg-red-500/10 text-red-400 border-red-500/30";
    }
  };
  
  const getChartColor = (status: string) => {
    switch (status) {
      case "normal": return "#22c55e";
      case "warning": return "#f59e0b";
      case "critical": return "#ef4444";
    }
  };
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/80 backdrop-blur-sm p-2 rounded text-xs border border-white/10">
          <p>{`${payload[0].value} ${payload[0].payload.unit}`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {sensorData.map((sensor, index) => (
        <motion.div
          key={sensor.id}
          className={`glass-card border rounded-xl overflow-hidden ${getStatusColorClasses(sensor.status)}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <div className="p-4 flex flex-col h-full">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center">
                <sensor.icon className="h-5 w-5 mr-2" />
                <h3 className="font-medium">{sensor.name}</h3>
              </div>
              {sensor.status !== "normal" && (
                <div className={`flex items-center text-xs ${
                  sensor.status === "warning" ? "text-amber-400" : "text-red-400"
                }`}>
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  <span>{sensor.status.charAt(0).toUpperCase() + sensor.status.slice(1)}</span>
                </div>
              )}
            </div>
            
            <div className="h-20 mt-1 mb-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sensor.data}>
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={getChartColor(sensor.status)} 
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={true}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex justify-between items-end mt-auto">
              <div>
                <div className="text-sm text-muted-foreground">Current</div>
                <div className="text-xl font-semibold">
                  {sensor.data[sensor.data.length - 1].value} {sensor.data[0].unit}
                </div>
              </div>
              <button className="text-xs underline underline-offset-2">Details</button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SensorCards;
