
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import { motion } from "framer-motion";

const Navbar = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-3xl font-bold text-gradient">Anomalyze</span>
          </motion.div>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <a href="#benefits" className="text-foreground/80 hover:text-foreground transition-colors">
            Benefits
          </a>
          <a href="#testimonials" className="text-foreground/80 hover:text-foreground transition-colors">
            Testimonials
          </a>
          <a href="#contact" className="text-foreground/80 hover:text-foreground transition-colors">
            Contact
          </a>
        </div>
        
        <div className="flex items-center space-x-4">
          <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" className="hover:bg-accent/10">
                Login
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card sm:max-w-md">
              <DialogTitle className="sr-only">Login</DialogTitle>
              <LoginForm onSuccess={() => setLoginOpen(false)} />
            </DialogContent>
          </Dialog>
          
          <Dialog open={signupOpen} onOpenChange={setSignupOpen}>
            <DialogTrigger asChild>
              <Button className="bg-accent hover:bg-accent/90 animate-pulse-glow">
                Sign Up
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card sm:max-w-md">
              <DialogTitle className="sr-only">Sign Up</DialogTitle>
              <SignupForm onSuccess={() => setSignupOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
