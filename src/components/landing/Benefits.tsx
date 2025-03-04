
import { motion } from "framer-motion";
import { Activity, AlertTriangle, BarChart3, BellRing } from "lucide-react";

const benefitsData = [
  {
    title: "Real-Time Monitoring",
    description: "Monitor all your sensors in real-time with our advanced tracking system.",
    icon: Activity,
    backContent: "Our platform processes thousands of data points per second, providing you with the most up-to-date information about your factory operations. Instant notifications ensure you never miss critical changes.",
    color: "bg-blue-500/10 text-blue-400",
    shadowColor: "shadow-glow-blue"
  },
  {
    title: "AI-Powered Analytics",
    description: "Leverage machine learning algorithms to extract meaningful insights from your data.",
    icon: BarChart3,
    backContent: "Our sophisticated AI models analyze patterns across multiple dimensions, identifying correlations that would be impossible to detect manually. We continuously train our models on new data to improve accuracy over time.",
    color: "bg-purple-500/10 text-purple-400",
    shadowColor: "shadow-glow-blue"
  },
  {
    title: "Predictive Anomaly Detection",
    description: "Identify potential issues before they become critical failures.",
    icon: AlertTriangle,
    backContent: "By analyzing historical patterns and current sensor data, our system can predict anomalies up to 72 hours before they cause problems. This predictive capability allows for proactive maintenance, reducing downtime by up to 37%.",
    color: "bg-amber-500/10 text-amber-400",
    shadowColor: "shadow-glow-blue"
  },
  {
    title: "Custom Reports & Alerts",
    description: "Get personalized reports and instant alerts based on your specific needs.",
    icon: BellRing,
    backContent: "Configure alerts with custom thresholds for different sensors and operations. Generate comprehensive reports on demand or on a schedule, with detailed analytics and actionable recommendations tailored to your industry.",
    color: "bg-green-500/10 text-green-400",
    shadowColor: "shadow-glow-green"
  }
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="px-4 py-1.5 text-xs font-semibold bg-accent/10 text-accent rounded-full mb-4 inline-block">
            Benefits
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Anomalyze?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform offers cutting-edge features designed to transform your sensor data into actionable insights.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefitsData.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-80"
            >
              <div className="flip-card h-full w-full">
                <div className="flip-card-inner">
                  <div className="flip-card-front glass-card p-6 flex flex-col items-center justify-center text-center">
                    <div className={`p-4 rounded-full ${benefit.color} ${benefit.shadowColor} mb-5`}>
                      <benefit.icon size={24} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </div>
                  <div className="flip-card-back glass-card p-6 flex items-center justify-center text-center">
                    <p className="text-sm text-foreground/90">{benefit.backContent}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
