
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import SignupForm from "@/components/auth/SignupForm";
import { useState } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-accent/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent"></div>
        {/* Animated circles */}
        <motion.div 
          className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-accent/5"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-primary/5"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        ></motion.div>
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              <span className="text-gradient">Detect Issues</span> <br />
              <span>Before They Happen</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              An AI-enabled anomaly detection platform that transforms your sensor data into actionable insights, preventing costly downtime.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
          >
            <Dialog open={signupOpen} onOpenChange={setSignupOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-accent hover:bg-accent/90 animate-pulse-glow">
                  Get Started
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-card sm:max-w-md">
                <SignupForm onSuccess={() => setSignupOpen(false)} />
              </DialogContent>
            </Dialog>
            
            <Button size="lg" variant="outline" className="border-accent/50 hover:bg-accent/10">
              <a href="#benefits">Learn More</a>
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="w-full max-w-4xl mx-auto mt-12"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/10 z-0"></div>
              <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl z-10 relative">
                <img
                  src="https://utfs.io/f/9bdcae2e-bdb9-4dc9-a32f-39a71e9e7714-8l4wnx.png"
                  alt="Anomalyze Dashboard Preview"
                  className="rounded-lg w-full shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
