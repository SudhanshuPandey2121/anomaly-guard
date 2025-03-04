
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <motion.div 
      className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-card p-12 rounded-xl max-w-lg w-full text-center space-y-6"
      >
        <div className="text-9xl font-bold text-gradient">404</div>
        <h1 className="text-3xl font-bold">Page Not Found</h1>
        <p className="text-muted-foreground">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="pt-4">
          <Button asChild className="bg-accent hover:bg-accent/90">
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-accent/5 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-primary/5 animate-pulse delay-700"></div>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;
