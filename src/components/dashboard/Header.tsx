
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Bell, 
  MessageSquare, 
  FileText, 
  Wrench,
  ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Header = ({ username = "User" }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  const stats = {
    filesUploaded: 24,
    anomaliesDetected: 7,
    maintenanceCompleted: 12
  };

  return (
    <motion.div 
      className="flex justify-between items-center mb-8 py-4 border-b border-border/30"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer group">
              <Avatar className="h-10 w-10 border-2 border-accent/50 group-hover:border-accent transition-colors">
                <AvatarFallback className="bg-accent/10 text-foreground">
                  {username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-bold flex items-center">
                  Hi, {username} <ChevronDown className="h-4 w-4 ml-1" />
                </h2>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="glass-card">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2">
              <span className="text-accent">{stats.filesUploaded}</span> Files Uploaded
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <span className="text-accent">{stats.anomaliesDetected}</span> Anomalies Detected
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <span className="text-accent">{stats.maintenanceCompleted}</span> Maintenance Completed
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm"
          className={`${activeTab === "reports" ? "bg-accent/20 text-accent" : "hover:bg-accent/10"} transition-all duration-300 glass-card`}
          onClick={() => setActiveTab("reports")}
        >
          <FileText className="mr-1 h-4 w-4" />
          Reports
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          className={`${activeTab === "alerts" ? "bg-accent/20 text-accent" : "hover:bg-accent/10"} transition-all duration-300 glass-card`}
          onClick={() => setActiveTab("alerts")}
        >
          <Bell className="mr-1 h-4 w-4" />
          Alerts
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          className={`${activeTab === "chatbot" ? "bg-accent/20 text-accent" : "hover:bg-accent/10"} transition-all duration-300 glass-card`}
          onClick={() => setActiveTab("chatbot")}
        >
          <MessageSquare className="mr-1 h-4 w-4" />
          Chatbot
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          className={`${activeTab === "maintenance" ? "bg-accent/20 text-accent" : "hover:bg-accent/10"} transition-all duration-300 glass-card`}
          onClick={() => setActiveTab("maintenance")}
        >
          <Wrench className="mr-1 h-4 w-4" />
          Maintenance
        </Button>
      </div>
    </motion.div>
  );
};

export default Header;
