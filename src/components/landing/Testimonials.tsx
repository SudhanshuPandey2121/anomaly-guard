
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const testimonials = [
  {
    text: "Anomalyze helped us reduce maintenance costs by 40% in just three months by predicting equipment failures before they happened.",
    author: "Sarah Chen",
    position: "CTO, Industrial Innovations",
    avatar: "https://utfs.io/f/d3e1e9de-3a12-41f1-b87e-b26e0a0e8b9c-c9nxsi.png"
  },
  {
    text: "The real-time monitoring capabilities have completely transformed how we approach factory operations. We can now make data-driven decisions faster than ever.",
    author: "Marcus Johnson",
    position: "Operations Director, TechManufacture",
    avatar: "https://utfs.io/f/8889a45e-8c77-45b0-9538-ae1171f69c3a-c9nxsj.png"
  },
  {
    text: "Implementing Anomalyze across our facilities has resulted in a 27% increase in operational efficiency. The ROI was evident within weeks.",
    author: "Priya Patel",
    position: "VP of Manufacturing, Global Products",
    avatar: "https://utfs.io/f/c261e93d-a53b-4d78-b283-93233cd410bf-c9nxsk.png"
  }
];

const clientLogos = [
  "https://utfs.io/f/2ae50d59-354a-4e91-9a1f-51e4ca6ae005-c9nxsl.svg",
  "https://utfs.io/f/0cd74ff1-d9eb-466b-9c7f-28ea748e6f0c-c9nxsm.svg",
  "https://utfs.io/f/8df63e5d-ad32-4685-b273-e6d768d3a330-c9nxsn.svg",
  "https://utfs.io/f/eb67afcc-9bdb-4bec-b378-94df6df12bb3-c9nxso.svg",
  "https://utfs.io/f/c94baa1d-5c66-4d84-8a7d-9f0a15accd99-c9nxsp.svg"
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="px-4 py-1.5 text-xs font-semibold bg-accent/10 text-accent rounded-full mb-4 inline-block">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover how Anomalyze has transformed operations for companies across various industries.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative h-80">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className={`absolute top-0 left-0 w-full h-full glass-card p-8 rounded-2xl flex flex-col justify-between ${
                  index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ 
                  opacity: index === activeIndex ? 1 : 0,
                  x: index === activeIndex ? 0 : 100
                }}
                transition={{ duration: 0.7 }}
              >
                <div>
                  <div className="mb-6">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-amber-400 mr-1">★</span>
                    ))}
                  </div>
                  <p className="text-lg italic mb-6">"{testimonial.text}"</p>
                </div>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="h-12 w-12 rounded-full mr-4 border-2 border-accent/50"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "w-8 bg-accent" : "w-2 bg-accent/30"
                }`}
              />
            ))}
          </div>
        </div>
        
        <motion.div 
          className="mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-center text-xl font-semibold mb-8">Trusted by Industry Leaders</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {clientLogos.map((logo, index) => (
              <motion.img
                key={index}
                src={logo}
                alt="Client logo"
                className="h-8 md:h-10 opacity-70 hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
