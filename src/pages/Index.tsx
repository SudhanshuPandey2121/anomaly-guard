
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import Benefits from "@/components/landing/Benefits";
import Testimonials from "@/components/landing/Testimonials";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <motion.div 
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <Hero />
      <Benefits />
      <Testimonials />
      <Footer />
    </motion.div>
  );
};

export default Index;
