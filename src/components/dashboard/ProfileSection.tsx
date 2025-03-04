
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  User,
  Mail,
  Phone,
  Building,
  Save,
  Bell,
  Settings,
  Lock,
  LogOut,
} from "lucide-react";

interface ProfileSectionProps {
  username: string;
  onClose: () => void;
}

const ProfileSection = ({ username, onClose }: ProfileSectionProps) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "Sarah Thompson",
    email: "sarah.t@factory.com",
    phone: "+1 (555) 123-4567",
    position: "Senior Monitoring Engineer",
    department: "Manufacturing Operations",
    bio: "Manufacturing specialist with 8+ years of experience in sensor monitoring and anomaly detection systems."
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully");
    setIsEditing(false);
  };
  
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 z-50 flex justify-end backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="w-full max-w-md bg-background border-l border-border h-full overflow-y-auto"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">My Profile</h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                ✕
              </Button>
            </div>
            
            <div className="mb-8 flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4 border-4 border-accent/30">
                <AvatarImage src="https://utfs.io/f/4c3e8df6-b10c-4dc0-8494-26d6051e5034-1e8lzg.jpg" />
                <AvatarFallback className="text-2xl bg-accent/20">
                  {username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <h3 className="text-2xl font-bold">{formData.fullName}</h3>
              <p className="text-muted-foreground">{formData.position}</p>
              
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
                
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            </div>
            
            <div className="flex border-b border-border mb-6">
              <button
                className={`pb-2 px-4 text-sm font-medium ${
                  activeTab === "profile" 
                    ? "border-b-2 border-accent text-accent" 
                    : "text-muted-foreground"
                }`}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </button>
              <button
                className={`pb-2 px-4 text-sm font-medium ${
                  activeTab === "settings" 
                    ? "border-b-2 border-accent text-accent" 
                    : "text-muted-foreground"
                }`}
                onClick={() => setActiveTab("settings")}
              >
                Settings
              </button>
              <button
                className={`pb-2 px-4 text-sm font-medium ${
                  activeTab === "security" 
                    ? "border-b-2 border-accent text-accent" 
                    : "text-muted-foreground"
                }`}
                onClick={() => setActiveTab("security")}
              >
                Security
              </button>
            </div>
            
            <AnimatePresence mode="wait">
              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  {isEditing ? (
                    <form onSubmit={handleSaveProfile} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Phone</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Position</label>
                        <div className="relative">
                          <Building className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            name="position"
                            value={formData.position}
                            onChange={handleInputChange}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Department</label>
                        <div className="relative">
                          <Building className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            name="department"
                            value={formData.department}
                            onChange={handleInputChange}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Bio</label>
                        <Textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          rows={4}
                        />
                      </div>
                      
                      <Button type="submit" className="w-full">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-accent" />
                          {formData.email}
                        </p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Phone</p>
                        <p className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-accent" />
                          {formData.phone}
                        </p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Position</p>
                        <p className="flex items-center">
                          <Building className="h-4 w-4 mr-2 text-accent" />
                          {formData.position}
                        </p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Department</p>
                        <p className="flex items-center">
                          <Building className="h-4 w-4 mr-2 text-accent" />
                          {formData.department}
                        </p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Bio</p>
                        <p className="text-sm">{formData.bio}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
              
              {activeTab === "settings" && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center">
                      <Bell className="h-4 w-4 mr-2" />
                      Notification Settings
                    </h3>
                    
                    <div className="bg-accent/5 rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Email Notifications</p>
                          <p className="text-xs text-muted-foreground">Receive daily summary</p>
                        </div>
                        <input type="checkbox" className="toggle" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">SMS Alerts</p>
                          <p className="text-xs text-muted-foreground">For critical issues only</p>
                        </div>
                        <input type="checkbox" className="toggle" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Browser Notifications</p>
                          <p className="text-xs text-muted-foreground">Real-time alerts</p>
                        </div>
                        <input type="checkbox" className="toggle" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      Display Settings
                    </h3>
                    
                    <div className="bg-accent/5 rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Dark Mode</p>
                          <p className="text-xs text-muted-foreground">Toggle dark/light theme</p>
                        </div>
                        <input type="checkbox" className="toggle" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Animations</p>
                          <p className="text-xs text-muted-foreground">Enable UI animations</p>
                        </div>
                        <input type="checkbox" className="toggle" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Compact View</p>
                          <p className="text-xs text-muted-foreground">Use compact dashboard layout</p>
                        </div>
                        <input type="checkbox" className="toggle" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {activeTab === "security" && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center">
                      <Lock className="h-4 w-4 mr-2" />
                      Security Settings
                    </h3>
                    
                    <div className="bg-accent/5 rounded-lg p-4 space-y-4">
                      <Button className="w-full" variant="outline">
                        Change Password
                      </Button>
                      
                      <Button className="w-full" variant="outline">
                        Enable Two-Factor Authentication
                      </Button>
                      
                      <Button className="w-full" variant="outline">
                        Manage API Tokens
                      </Button>
                      
                      <div className="pt-2 border-t border-border/30">
                        <p className="text-xs text-muted-foreground mb-2">Recent Activity</p>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between items-center">
                            <span>Login from Chrome/Windows</span>
                            <span className="text-xs text-muted-foreground">Today, 9:24 AM</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Password changed</span>
                            <span className="text-xs text-muted-foreground">2 weeks ago</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Login from new location</span>
                            <span className="text-xs text-muted-foreground">3 weeks ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfileSection;
