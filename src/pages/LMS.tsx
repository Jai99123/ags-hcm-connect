import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload, FileVideo, Book, GraduationCap, MessagesSquare, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const LMS = () => {
  const [selectedTab, setSelectedTab] = useState("courses");
  const [ideaTitle, setIdeaTitle] = useState("");
  const [ideaDescription, setIdeaDescription] = useState("");
  const [department, setDepartment] = useState("");

  const { data: currentUserProfile } = useQuery({
    queryKey: ['current-user-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('employee_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return data;
    }
  });

  const { data: ideas, refetch: refetchIdeas } = useQuery({
    queryKey: ['ideas'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ideas')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast.success("File uploaded successfully!");
    }
  };

  const handleSubmitIdea = async () => {
    if (!currentUserProfile) {
      toast.error("You must be logged in to submit an idea");
      return;
    }

    try {
      const { error } = await supabase
        .from('ideas')
        .insert({
          title: ideaTitle,
          description: ideaDescription,
          department,
          author_id: currentUserProfile.id
        });

      if (error) throw error;

      toast.success("Idea submitted successfully!");
      setIdeaTitle("");
      setIdeaDescription("");
      setDepartment("");
      refetchIdeas();
    } catch (error) {
      toast.error("Failed to submit idea");
      console.error("Error submitting idea:", error);
    }
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
          <TabsTrigger value="ideas">Ideas</TabsTrigger>
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

        <TabsContent value="ideas">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  Share Your Ideas
                  <Button onClick={handleSubmitIdea}>
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Submit Idea
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="idea-title">Title</Label>
                    <Input
                      id="idea-title"
                      placeholder="Enter idea title"
                      value={ideaTitle}
                      onChange={(e) => setIdeaTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idea-description">Description</Label>
                    <Textarea
                      id="idea-description"
                      placeholder="Describe your idea..."
                      value={ideaDescription}
                      onChange={(e) => setIdeaDescription(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      placeholder="Enter department"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Ideas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ideas?.map((idea) => (
                    <div key={idea.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{idea.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{idea.department}</p>
                          <p className="mt-2">{idea.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">
                            {new Date(idea.created_at).toLocaleDateString()}
                          </span>
                          <Button variant="outline" size="sm">
                            Like ({idea.likes})
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LMS;
