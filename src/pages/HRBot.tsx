
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bot, Send, User } from "lucide-react";

const HRBot = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', content: 'Hello! I am your HR Assistant. How can I help you today?', timestamp: new Date() },
    { role: 'bot', content: 'You can ask me about:\n- Company policies\n- Leave requests\n- Benefits\n- Training programs\n- Or connect with HR team', timestamp: new Date() }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    setChatMessages(prev => [...prev, { role: 'user', content: message, timestamp: new Date() }]);

    // Simulate HR team notification
    if (message.toLowerCase().includes('speak to hr') || message.toLowerCase().includes('connect with hr')) {
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          role: 'bot', 
          content: 'I\'ve notified the HR team. They will respond to your query soon.', 
          timestamp: new Date() 
        }]);
      }, 1000);
    } else {
      // Default bot response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          role: 'bot', 
          content: 'I understand your query. Let me help you with that or connect you with our HR team for more specific assistance.', 
          timestamp: new Date() 
        }]);
      }, 1000);
    }

    setMessage("");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">HR Assistant</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-6 w-6" />
            HR Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col h-[600px]">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'bot' && <Bot className="h-6 w-6 mt-1" />}
                  <div
                    className={`rounded-lg p-3 max-w-[80%] ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  {msg.role === 'user' && <User className="h-6 w-6 mt-1" />}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HRBot;
