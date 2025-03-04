
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Bell, MessageSquare, Tool, LogOut, User, ChevronDown } from "lucide-react";

const Header = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/");
    }
  }, [navigate]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <motion.header 
      className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-40"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <Avatar className="h-10 w-10 bg-accent text-white animate-pulse-glow">
                <AvatarFallback>{user ? getInitials(user.name) : "A"}</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                Hi, <span className="text-accent">{user?.name.split(" ")[0] || "User"}</span>
              </h2>
              <p className="text-sm text-muted-foreground">Welcome to your dashboard</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            <Button
              variant={activeTab === "dashboard" ? "default" : "ghost"}
              className={activeTab === "dashboard" ? "bg-accent" : ""}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </Button>
            <Button
              variant={activeTab === "reports" ? "default" : "ghost"}
              className={activeTab === "reports" ? "bg-accent" : ""}
              onClick={() => setActiveTab("reports")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Reports
            </Button>
            <Button
              variant={activeTab === "alerts" ? "default" : "ghost"}
              className={activeTab === "alerts" ? "bg-accent" : ""}
              onClick={() => setActiveTab("alerts")}
            >
              <Bell className="mr-2 h-4 w-4" />
              Alerts
            </Button>
            <Button
              variant={activeTab === "chatbot" ? "default" : "ghost"}
              className={activeTab === "chatbot" ? "bg-accent" : ""}
              onClick={() => setActiveTab("chatbot")}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Chatbot
            </Button>
            <Button
              variant={activeTab === "maintenance" ? "default" : "ghost"}
              className={activeTab === "maintenance" ? "bg-accent" : ""}
              onClick={() => setActiveTab("maintenance")}
            >
              <Tool className="mr-2 h-4 w-4" />
              Maintenance
            </Button>
          </div>
          
          <div className="flex md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  Menu <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setActiveTab("dashboard")}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("reports")}>
                  <FileText className="mr-2 h-4 w-4" /> Reports
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("alerts")}>
                  <Bell className="mr-2 h-4 w-4" /> Alerts
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("chatbot")}>
                  <MessageSquare className="mr-2 h-4 w-4" /> Chatbot
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("maintenance")}>
                  <Tool className="mr-2 h-4 w-4" /> Maintenance
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full h-10 w-10 p-0">
                  <Avatar className="h-9 w-9 border-2 border-accent/40 hover:border-accent transition-colors">
                    <AvatarFallback>{user ? getInitials(user.name) : "A"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
