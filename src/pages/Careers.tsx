
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { File, MessageSquare, Eye, Link as LinkIcon, User, Plus, Pencil } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface JobPosition {
  id: string;
  title: string;
  description: string;
  department_id: string | null;
  requirements: string[] | null;
  status: string;
}

interface JobApplication {
  id: string;
  position_id: string;
  applicant_name: string;
  email: string;
  resume_url: string;
  status: string;
  manager_comments: string | null;
}

const CareersPage = () => {
  const websiteLink = "https://www.adventglobal.com";
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedPosition, setSelectedPosition] = useState<JobPosition | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newPosition, setNewPosition] = useState({
    title: "",
    description: "",
    requirements: "",
    status: "open"
  });

  // Fetch job positions
  const { data: jobPositions = [] } = useQuery({
    queryKey: ['jobPositions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_positions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Add/Edit job position mutation
  const jobMutation = useMutation({
    mutationFn: async (position: typeof newPosition) => {
      const { data, error } = await supabase
        .from('job_positions')
        .upsert({
          id: selectedPosition?.id,
          title: position.title,
          description: position.description,
          requirements: position.requirements.split('\n'),
          status: position.status
        })
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobPositions'] });
      toast({
        title: "Success",
        description: `Job position ${selectedPosition ? 'updated' : 'added'} successfully`,
      });
      setIsEditing(false);
      setSelectedPosition(null);
      setNewPosition({ title: "", description: "", requirements: "", status: "open" });
    }
  });

  // Apply for position mutation
  const applyMutation = useMutation({
    mutationFn: async ({ positionId, application }: { positionId: string, application: { name: string, email: string, file: File } }) => {
      // Upload resume
      const fileExt = application.file.name.split('.').pop();
      const filePath = `${positionId}/${crypto.randomUUID()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, application.file);
      
      if (uploadError) throw uploadError;

      // Create application record
      const { data, error } = await supabase
        .from('job_applications')
        .insert({
          position_id: positionId,
          applicant_name: application.name,
          email: application.email,
          resume_url: filePath,
          status: 'pending'
        })
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted",
        description: "Your application has been submitted successfully",
      });
    }
  });

  // Add manager comment mutation
  const commentMutation = useMutation({
    mutationFn: async ({ applicationId, comment }: { applicationId: string, comment: string }) => {
      const { data, error } = await supabase
        .from('job_applications')
        .update({ manager_comments: comment })
        .eq('id', applicationId)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Comment Added",
        description: "Manager comment has been added successfully",
      });
    }
  });

  // Handle apply dialog
  const handleApply = async (jobId: string, formData: FormData) => {
    const file = formData.get('resume') as File;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    await applyMutation.mutateAsync({
      positionId: jobId,
      application: { name, email, file }
    });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">AGS Careers</h1>
          <p className="text-muted-foreground">Manage job positions and applications</p>
        </div>

        <div className="grid gap-6">
          {/* Website Link Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5" />
                Career Website
              </CardTitle>
              <CardDescription>Direct applicants to our careers portal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Input value={websiteLink} readOnly className="max-w-md" />
                <Button onClick={() => window.open(websiteLink, '_blank')}>
                  Visit Website
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Job Positions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Open Positions</CardTitle>
                <CardDescription>Current job openings and applications</CardDescription>
              </div>
              <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> Add Position
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>List of current job openings</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobPositions.map((job: JobPosition) => (
                    <TableRow key={job.id}>
                      <TableCell>{job.title}</TableCell>
                      <TableCell className="max-w-md truncate">{job.description}</TableCell>
                      <TableCell>{job.status}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {/* Apply Dialog */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="default" size="sm">Apply</Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Apply for {job.title}</DialogTitle>
                              </DialogHeader>
                              <form onSubmit={(e) => {
                                e.preventDefault();
                                handleApply(job.id, new FormData(e.currentTarget));
                              }} className="space-y-4">
                                <div>
                                  <Label htmlFor="name">Full Name</Label>
                                  <Input id="name" name="name" required />
                                </div>
                                <div>
                                  <Label htmlFor="email">Email</Label>
                                  <Input id="email" name="email" type="email" required />
                                </div>
                                <div>
                                  <Label htmlFor="resume">Resume</Label>
                                  <Input id="resume" name="resume" type="file" accept=".pdf,.doc,.docx" required />
                                </div>
                                <Button type="submit">Submit Application</Button>
                              </form>
                            </DialogContent>
                          </Dialog>

                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => {
                              setSelectedPosition(job);
                              setNewPosition({
                                title: job.title,
                                description: job.description,
                                requirements: job.requirements?.join('\n') || '',
                                status: job.status
                              });
                              setIsEditing(true);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          
                          {/* View Applications Dialog */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>Applications for {job.title}</DialogTitle>
                              </DialogHeader>
                              <div className="mt-4">
                                <Applications positionId={job.id} />
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Add/Edit Position Dialog */}
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedPosition ? 'Edit' : 'Add'} Position</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
              jobMutation.mutate(newPosition);
            }} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  value={newPosition.title}
                  onChange={(e) => setNewPosition(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={newPosition.description}
                  onChange={(e) => setNewPosition(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="requirements">Requirements (one per line)</Label>
                <Textarea 
                  id="requirements" 
                  value={newPosition.requirements}
                  onChange={(e) => setNewPosition(prev => ({ ...prev, requirements: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Input 
                  id="status" 
                  value={newPosition.status}
                  onChange={(e) => setNewPosition(prev => ({ ...prev, status: e.target.value }))}
                  required
                />
              </div>
              <Button type="submit">
                {selectedPosition ? 'Update' : 'Add'} Position
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

// Applications component to show applications for a position
const Applications = ({ positionId }: { positionId: string }) => {
  const { data: applications = [] } = useQuery({
    queryKey: ['applications', positionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .eq('position_id', positionId);
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Resume</TableHead>
          <TableHead>Manager Comments</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((app: JobApplication) => (
          <TableRow key={app.id}>
            <TableCell>{app.applicant_name}</TableCell>
            <TableCell>{app.email}</TableCell>
            <TableCell>{app.status}</TableCell>
            <TableCell>
              <Button 
                variant="outline" 
                size="sm"
                onClick={async () => {
                  const { data } = await supabase.storage
                    .from('resumes')
                    .createSignedUrl(app.resume_url, 60);
                  if (data?.signedUrl) {
                    window.open(data.signedUrl, '_blank');
                  }
                }}
              >
                View Resume
              </Button>
            </TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Add Comment
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Manager Comment</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const comment = formData.get('comment') as string;
                    commentMutation.mutateAsync({ applicationId: app.id, comment });
                  }} className="space-y-4">
                    <div>
                      <Label htmlFor="comment">Comment</Label>
                      <Textarea 
                        id="comment" 
                        name="comment"
                        defaultValue={app.manager_comments || ''}
                        required
                      />
                    </div>
                    <Button type="submit">Save Comment</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CareersPage;
