
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload, FileVideo, Book, GraduationCap, MessagesSquare } from "lucide-react";
import { toast } from "sonner";

const LMS = () => {
  const [selectedTab, setSelectedTab] = useState("courses");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Here you would typically handle the file upload
      toast.success("File uploaded successfully!");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Learning Management System</h1>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 gap-4 w-full max-w-3xl">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="examinations">Examinations</TabsTrigger>
          <TabsTrigger value="qa">Q&A</TabsTrigger>
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
      </Tabs>
    </div>
  );
};

export default LMS;
