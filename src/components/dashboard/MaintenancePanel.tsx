
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Wrench, Check, Clock, AlertTriangle, CalendarDays, CalendarRange } from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

interface MaintenanceTask {
  id: string;
  title: string;
  description: string;
  status: "scheduled" | "in-progress" | "completed";
  priority: "high" | "medium" | "low";
  dueDate: string;
  sensor: string;
  progress: number;
}

const MaintenancePanel = () => {
  const [selectedTab, setSelectedTab] = useState("scheduled");
  
  const mockTasks: MaintenanceTask[] = [
    {
      id: "task-1",
      title: "Replace Temperature Sensor A1",
      description: "Sensor showing intermittent readings, needs replacement",
      status: "scheduled",
      priority: "high",
      dueDate: "Tomorrow",
      sensor: "Temperature Sensor A1",
      progress: 0
    },
    {
      id: "task-2",
      title: "Calibrate Pressure Sensors",
      description: "Quarterly calibration of all pressure sensors",
      status: "scheduled",
      priority: "medium",
      dueDate: "Next week",
      sensor: "Pressure Sensors B1-B6",
      progress: 0
    },
    {
      id: "task-3",
      title: "Vibration Dampener Inspection",
      description: "Check and adjust vibration dampeners on production line",
      status: "in-progress",
      priority: "medium",
      dueDate: "Today",
      sensor: "Vibration Sensors C1-C4",
      progress: 65
    },
    {
      id: "task-4",
      title: "Speed Sensor Wiring Repair",
      description: "Fix faulty wiring on Speed Sensor D4",
      status: "in-progress",
      priority: "high",
      dueDate: "Today",
      sensor: "Speed Sensor D4",
      progress: 80
    },
    {
      id: "task-5",
      title: "Quarterly Maintenance Check",
      description: "Complete system inspection and testing",
      status: "completed",
      priority: "high",
      dueDate: "Last week",
      sensor: "All sensors",
      progress: 100
    }
  ];
  
  const filteredTasks = mockTasks.filter(task => {
    if (selectedTab === "all") return true;
    return task.status === selectedTab;
  });
  
  const taskCounts = {
    scheduled: mockTasks.filter(t => t.status === "scheduled").length,
    "in-progress": mockTasks.filter(t => t.status === "in-progress").length,
    completed: mockTasks.filter(t => t.status === "completed").length,
    all: mockTasks.length
  };
  
  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-4 border-destructive";
      case "medium":
        return "border-l-4 border-amber-500";
      case "low":
        return "border-l-4 border-green-500";
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Calendar className="h-4 w-4 text-accent" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "completed":
        return <Check className="h-4 w-4 text-green-500" />;
    }
  };
  
  const handleStartTask = (id: string) => {
    toast.success("Task marked as in-progress");
  };
  
  const handleCompleteTask = (id: string) => {
    toast.success("Task marked as completed");
  };
  
  const handleScheduleMaintenance = () => {
    toast.info("Maintenance scheduler opened");
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card p-6 rounded-xl"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Wrench className="h-5 w-5 text-accent" />
          <h2 className="text-xl font-semibold">Maintenance Schedule</h2>
        </div>
        
        <Button onClick={handleScheduleMaintenance}>
          <CalendarRange className="mr-2 h-4 w-4" />
          Schedule Maintenance
        </Button>
      </div>
      
      <Tabs defaultValue={selectedTab} onValueChange={(value) => setSelectedTab(value as string)}>
        <TabsList className="w-full mb-6">
          <TabsTrigger value="scheduled" className="flex-1">
            Scheduled ({taskCounts.scheduled})
          </TabsTrigger>
          <TabsTrigger value="in-progress" className="flex-1">
            In Progress ({taskCounts["in-progress"]})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex-1">
            Completed ({taskCounts.completed})
          </TabsTrigger>
          <TabsTrigger value="all" className="flex-1">
            All ({taskCounts.all})
          </TabsTrigger>
        </TabsList>
        
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Wrench className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p>No maintenance tasks in this category</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-background/30 rounded-lg p-4 ${getPriorityStyles(task.priority)}`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(task.status)}
                      <h3 className="font-medium">{task.title}</h3>
                      
                      {task.priority === "high" && (
                        <span className="bg-destructive/20 text-destructive text-xs px-2 py-0.5 rounded-full flex items-center">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          High Priority
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                    
                    <div className="flex items-center gap-4 mt-2 text-xs">
                      <span className="flex items-center">
                        <CalendarDays className="h-3 w-3 mr-1 text-muted-foreground" />
                        Due: {task.dueDate}
                      </span>
                      <span>{task.sensor}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                    {task.status === "in-progress" && (
                      <div className="w-full md:w-32">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-2" />
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      {task.status === "scheduled" && (
                        <Button size="sm" onClick={() => handleStartTask(task.id)}>
                          Start Task
                        </Button>
                      )}
                      
                      {task.status === "in-progress" && (
                        <Button size="sm" onClick={() => handleCompleteTask(task.id)}>
                          Complete
                        </Button>
                      )}
                      
                      {task.status === "completed" && (
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </Tabs>
    </motion.div>
  );
};

export default MaintenancePanel;
