
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, BellOff, CheckCircle, Settings, ArrowUpCircle, AlertTriangle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

type AlertPriority = "high" | "medium" | "low";
type AlertStatus = "new" | "acknowledged" | "resolved";

interface Alert {
  id: string;
  title: string;
  description: string;
  sensor: string;
  timestamp: string;
  priority: AlertPriority;
  status: AlertStatus;
}

const AlertsPanel = () => {
  const [selectedTab, setSelectedTab] = useState("new");
  const [autoNotifications, setAutoNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  
  // Mock alerts data
  const mockAlerts: Alert[] = [
    {
      id: "alert-1",
      title: "Temperature Spike Detected",
      description: "Temperature Sensor A1 reported values above threshold (95°C)",
      sensor: "Temperature Sensor A1",
      timestamp: "10 minutes ago",
      priority: "high",
      status: "new"
    },
    {
      id: "alert-2",
      title: "Pressure Fluctuation",
      description: "Pressure Sensor B2 showing unusual fluctuation patterns",
      sensor: "Pressure Sensor B2",
      timestamp: "35 minutes ago",
      priority: "medium",
      status: "new"
    },
    {
      id: "alert-3",
      title: "Vibration Anomaly",
      description: "Vibration Sensor C3 detected abnormal frequency patterns",
      sensor: "Vibration Sensor C3",
      timestamp: "2 hours ago",
      priority: "low",
      status: "acknowledged"
    },
    {
      id: "alert-4",
      title: "Speed Reduction",
      description: "Speed Sensor D4 showing gradual reduction in RPM",
      sensor: "Speed Sensor D4", 
      timestamp: "Yesterday, 14:30",
      priority: "medium",
      status: "acknowledged"
    },
    {
      id: "alert-5",
      title: "Temperature Normal",
      description: "Temperature Sensor A2 returned to normal operating range",
      sensor: "Temperature Sensor A2",
      timestamp: "Yesterday, 10:15",
      priority: "low",
      status: "resolved"
    }
  ];
  
  const filteredAlerts = mockAlerts.filter(alert => {
    if (selectedTab === "all") return true;
    return alert.status === selectedTab;
  });
  
  const alertCounts = {
    new: mockAlerts.filter(a => a.status === "new").length,
    acknowledged: mockAlerts.filter(a => a.status === "acknowledged").length,
    resolved: mockAlerts.filter(a => a.status === "resolved").length,
    all: mockAlerts.length
  };
  
  const getPriorityStyles = (priority: AlertPriority) => {
    switch (priority) {
      case "high":
        return "border-l-4 border-destructive bg-destructive/10";
      case "medium":
        return "border-l-4 border-amber-500 bg-amber-500/10";
      case "low":
        return "border-l-4 border-green-500 bg-green-500/10";
    }
  };
  
  const getStatusBadge = (status: AlertStatus) => {
    switch (status) {
      case "new":
        return <Badge variant="destructive">New</Badge>;
      case "acknowledged":
        return <Badge variant="outline" className="border-amber-500 text-amber-400">Acknowledged</Badge>;
      case "resolved":
        return <Badge variant="outline" className="border-green-500 text-green-400">Resolved</Badge>;
    }
  };
  
  const handleAcknowledge = (id: string) => {
    toast.success("Alert acknowledged");
  };
  
  const handleResolve = (id: string) => {
    toast.success("Alert marked as resolved");
  };
  
  const toggleAutoNotifications = () => {
    setAutoNotifications(!autoNotifications);
    toast.info(`Auto notifications ${!autoNotifications ? 'enabled' : 'disabled'}`);
  };
  
  const toggleEmailAlerts = () => {
    setEmailAlerts(!emailAlerts);
    toast.info(`Email alerts ${!emailAlerts ? 'enabled' : 'disabled'}`);
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
          <Bell className="h-5 w-5 text-accent" />
          <h2 className="text-xl font-semibold">Alerts & Notifications</h2>
        </div>
        
        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4 mr-1" />
          Configure
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue={selectedTab} onValueChange={(value) => setSelectedTab(value as string)}>
            <TabsList className="w-full mb-4">
              <TabsTrigger value="new" className="flex-1">
                New ({alertCounts.new})
              </TabsTrigger>
              <TabsTrigger value="acknowledged" className="flex-1">
                Acknowledged ({alertCounts.acknowledged})
              </TabsTrigger>
              <TabsTrigger value="resolved" className="flex-1">
                Resolved ({alertCounts.resolved})
              </TabsTrigger>
              <TabsTrigger value="all" className="flex-1">
                All ({alertCounts.all})
              </TabsTrigger>
            </TabsList>
            
            <div className="space-y-3 max-h-[400px] overflow-y-auto p-1">
              {filteredAlerts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <BellOff className="mx-auto h-8 w-8 mb-2 opacity-50" />
                  <p>No alerts in this category</p>
                </div>
              ) : (
                filteredAlerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`rounded-lg p-4 ${getPriorityStyles(alert.priority)}`}
                  >
                    <div className="flex justify-between flex-wrap gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{alert.title}</h3>
                          {getStatusBadge(alert.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                      </div>
                      
                      {alert.status === "new" && (
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleAcknowledge(alert.id)}>
                            <CheckCircle className="h-3.5 w-3.5 mr-1" />
                            Acknowledge
                          </Button>
                          <Button size="sm" onClick={() => handleResolve(alert.id)}>
                            <ArrowUpCircle className="h-3.5 w-3.5 mr-1" />
                            Resolve
                          </Button>
                        </div>
                      )}
                      
                      {alert.status === "acknowledged" && (
                        <Button size="sm" onClick={() => handleResolve(alert.id)}>
                          <ArrowUpCircle className="h-3.5 w-3.5 mr-1" />
                          Resolve
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
                      <span>{alert.sensor}</span>
                      <span>{alert.timestamp}</span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </Tabs>
        </div>
        
        <div className="bg-background/20 rounded-lg p-4">
          <h3 className="font-medium mb-4 flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Notification Settings
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Real-time Notifications</p>
                <p className="text-xs text-muted-foreground">Receive alerts in real-time</p>
              </div>
              <Switch checked={autoNotifications} onCheckedChange={toggleAutoNotifications} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Email Alerts</p>
                <p className="text-xs text-muted-foreground">Receive critical alerts via email</p>
              </div>
              <Switch checked={emailAlerts} onCheckedChange={toggleEmailAlerts} />
            </div>
            
            <div className="pt-2 border-t border-border/30">
              <p className="text-xs text-muted-foreground mb-2">Alert Priority Thresholds</p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-3 w-3 text-destructive" />
                  <span className="text-xs">High: +15% from baseline</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-3 w-3 text-amber-500" />
                  <span className="text-xs">Medium: +10% from baseline</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-3 w-3 text-green-500" />
                  <span className="text-xs">Low: +5% from baseline</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AlertsPanel;
