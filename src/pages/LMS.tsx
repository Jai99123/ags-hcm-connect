import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload, FileVideo, Book, GraduationCap, MessagesSquare, Bot, Send, User } from "lucide-react";
import { toast } from "sonner";

const LMS = () => {
  const [selectedTab, setSelectedTab] = useState("courses");
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', content: 'Hello! I am your HR Assistant. How can I help you today?', timestamp: new Date() },
    { role: 'bot', content: 'You can ask me about:\n- Company policies\n- Leave requests\n- Benefits\n- Training programs\n- Or connect with HR team', timestamp: new Date() }
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast.success("File uploaded successfully!");
    }
  };

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
      <h1 className="text-3xl font-bold mb-6">Learning Management System</h1>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid grid-cols-5 gap-4 w-full max-w-4xl">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="examinations">Examinations</TabsTrigger>
          <TabsTrigger value="qa">Q&A</TabsTrigger>
          <TabsTrigger value="hrbot">HR Bot</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  Course Management
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Course
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="course-title">Course Title</Label>
                    <Input id="course-title" placeholder="Enter course title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course-description">Description</Label>
                    <Textarea id="course-description" placeholder="Enter course description" />
                  </div>
                  <div className="space-y-2">
                    <Label>Upload Course Materials</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="w-full">
                        <FileVideo className="mr-2 h-4 w-4" />
                        Upload Video
                        <Input
                          type="file"
                          className="hidden"
                          accept="video/*"
                          onChange={handleFileUpload}
                        />
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Documents
                        <Input
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileUpload}
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {/* Example course items */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Book className="h-6 w-6" />
                      <div>
                        <h3 className="font-semibold">Introduction to HR Policies</h3>
                        <p className="text-sm text-gray-500">12 videos • 5 documents</p>
                      </div>
                    </div>
                    <Button variant="secondary">View Course</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="certifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Certifications
                <Button>
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Create Certificate
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {/* Example certification items */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">HR Policy Certification</h3>
                    <p className="text-sm text-gray-500">Complete all modules to earn certificate</p>
                  </div>
                  <Button variant="outline">View Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examinations">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Examinations
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Exam
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="exam-title">Exam Title</Label>
                  <Input id="exam-title" placeholder="Enter exam title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exam-description">Description</Label>
                  <Textarea id="exam-description" placeholder="Enter exam description" />
                </div>
                <Button>Add Questions</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="qa">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Questions & Answers
                <Button>
                  <MessagesSquare className="mr-2 h-4 w-4" />
                  Ask Question
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input placeholder="Search questions..." />
                <div className="grid gap-4">
                  {/* Example Q&A items */}
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold">How do I access course materials?</h3>
                    <p className="text-sm text-gray-500 mt-2">
                      You can access course materials by navigating to the specific course and clicking on the resources tab.
                    </p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">Reply</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hrbot">
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
                    <Send className="h-4 w-4" />
                    Send
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LMS;
