
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Lightbulb, Cpu, RefreshCw } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const suggestions = [
  "What are common reasons for temperature spikes?",
  "How to reduce pressure anomalies?",
  "Explain vibration frequency analysis",
  "Recommend maintenance schedule",
  "Show me historical trends for Sensor B2"
];

const ChatbotPanel = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm your AI assistant for factory monitoring. How can I help you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);
  
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: input,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Based on the sensor data, I recommend checking the cooling system for the temperature anomalies.",
        "I've analyzed the vibration patterns and found recurring frequencies that might indicate bearing wear.",
        "The pressure fluctuations appear to be within normal operating parameters, but I'll continue monitoring.",
        "Based on historical data, maintenance might be needed for Sensor B2 within the next 2 weeks.",
        "I've detected a pattern in the anomalies that suggests a potential correlation between temperature and pressure spikes."
      ];
      
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card rounded-xl flex flex-col h-[600px]"
    >
      <div className="flex items-center justify-between p-4 border-b border-border/30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
            <Bot className="h-4 w-4 text-accent" />
          </div>
          <div>
            <h2 className="font-medium">Factory Assistant</h2>
            <p className="text-xs text-muted-foreground">AI-powered monitoring assistant</p>
          </div>
        </div>
        
        <Button variant="ghost" size="sm">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                  message.sender === 'user' ? 'bg-accent/20' : 'bg-secondary'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="h-4 w-4 text-accent" />
                  ) : (
                    <Cpu className="h-4 w-4 text-primary-foreground" />
                  )}
                </div>
                
                <div>
                  <div className={`rounded-2xl p-3 ${
                    message.sender === 'user' 
                      ? 'bg-accent text-white rounded-tr-none' 
                      : 'bg-secondary text-secondary-foreground rounded-tl-none'
                  }`}>
                    {message.text}
                  </div>
                  <div className={`text-xs text-muted-foreground mt-1 ${
                    message.sender === 'user' ? 'text-right' : ''
                  }`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex gap-2 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                
                <div className="bg-secondary text-secondary-foreground rounded-2xl rounded-tl-none p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t border-border/30">
        <div className="mb-3">
          <p className="text-xs text-muted-foreground mb-2 flex items-center">
            <Lightbulb className="h-3 w-3 mr-1" />
            Suggested questions:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                className="text-xs bg-accent/10 hover:bg-accent/20 text-accent px-2 py-1 rounded-full"
                onClick={() => handleSuggestionClick(suggestion)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        </div>
        
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your factory data..."
            className="flex-1"
            autoComplete="off"
          />
          <Button type="submit" disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default ChatbotPanel;
