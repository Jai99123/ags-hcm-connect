
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
  const [materialTitle, setMaterialTitle] = useState("");
  const [materialDescription, setMaterialDescription] = useState("");

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

  const { data: learningMaterials, refetch: refetchMaterials } = useQuery({
    queryKey: ['learning-materials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('learning_materials')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'video' | 'document') => {
    if (!currentUserProfile) {
      toast.error("You must be logged in to upload materials");
      return;
    }

    const file = event.target.files?.[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }

    // Validate file types
    if (type === 'video' && !file.type.startsWith('video/')) {
      toast.error("Please select a valid video file");
      return;
    }

    if (type === 'document' && !['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
      toast.error("Please select a PDF or Word document");
      return;
    }

    if (!materialTitle.trim()) {
      toast.error("Please enter a title for the material");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', materialTitle);
    formData.append('description', materialDescription);
    formData.append('type', type);
    formData.append('uploaderId', currentUserProfile.id);

    try {
      const { error } = await supabase.functions.invoke('upload-learning-material', {
        body: formData,
      });

      if (error) throw error;

      toast.success("Material uploaded successfully!");
      setMaterialTitle("");
      setMaterialDescription("");
      refetchMaterials();
    } catch (error) {
      console.error('Upload error:', error);
      toast.error("Failed to upload material");
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
                  Upload Learning Materials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="material-title">Material Title</Label>
                    <Input
                      id="material-title"
                      placeholder="Enter material title"
                      value={materialTitle}
                      onChange={(e) => setMaterialTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="material-description">Description</Label>
                    <Textarea
                      id="material-description"
                      placeholder="Enter material description"
                      value={materialDescription}
                      onChange={(e) => setMaterialDescription(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Upload Materials</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Input
                          type="file"
                          className="hidden"
                          id="video-upload"
                          accept="video/*"
                          onChange={(e) => handleFileUpload(e, 'video')}
                        />
                        <label htmlFor="video-upload">
                          <Button variant="outline" className="w-full cursor-pointer">
                            <FileVideo className="mr-2 h-4 w-4" />
                            Upload Video
                          </Button>
                        </label>
                      </div>
                      <div>
                        <Input
                          type="file"
                          className="hidden"
                          id="document-upload"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileUpload(e, 'document')}
                        />
                        <label htmlFor="document-upload">
                          <Button variant="outline" className="w-full cursor-pointer">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Documents
                          </Button>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {learningMaterials?.map((material) => (
                    <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        {material.type === 'video' ? (
                          <FileVideo className="h-6 w-6" />
                        ) : (
                          <Book className="h-6 w-6" />
                        )}
                        <div>
                          <h3 className="font-semibold">{material.title}</h3>
                          {material.description && (
                            <p className="text-sm text-gray-500">{material.description}</p>
                          )}
                        </div>
                      </div>
                      <Button variant="secondary" asChild>
                        <a href={material.content_url} target="_blank" rel="noopener noreferrer">
                          View Material
                        </a>
                      </Button>
                    </div>
                  ))}
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
