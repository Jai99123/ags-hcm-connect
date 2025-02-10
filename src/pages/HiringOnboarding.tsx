
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Link, LinkIcon } from "lucide-react";

const HiringOnboardingPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    status: "",
    joiningDate: "",
    emailNote: "",
    department: "",
    salary: "",
    workingHours: "",
    benefits: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSelectChange = (value: string, field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const syncEmployeeData = (candidateData: any) => {
    // In a real application, this would make API calls to update various systems
    console.log("Syncing employee data across systems:");
    console.log("- Adding to Employee Information");
    console.log("- Setting up Time Tracking account");
    console.log("- Configuring Payroll information");
    console.log("- Creating LMS account");
    
    // Show success notification
    toast({
      title: "Data Synced Successfully",
      description: "Employee information has been configured across all systems.",
    });
  };

  const handleGenerateLink = () => {
    // Generate a unique link for the candidate
    const uniqueId = Math.random().toString(36).substring(7);
    const onboardingLink = `${window.location.origin}/onboarding/${uniqueId}`;

    // Create the complete candidate data object
    const candidateData = {
      ...formData,
      onboardingId: uniqueId,
      createdAt: new Date().toISOString(),
      employeeId: `EMP${Math.floor(Math.random() * 10000)}`,
      approvalStatus: "pending",
      timeTrackingEnabled: true,
      payrollStatus: "pending",
      lmsAccess: true,
    };

    // Sync data across systems
    syncEmployeeData(candidateData);

    console.log("Candidate data:", candidateData);
    console.log("Onboarding link:", onboardingLink);

    // Show success message with the generated link
    toast({
      title: "Link Generated Successfully",
      description: (
        <div className="mt-2">
          <p>Onboarding link has been generated and sent to the candidate.</p>
          <code className="mt-2 block p-2 bg-muted rounded">{onboardingLink}</code>
        </div>
      ),
    });
  };

  const handleClearForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      position: "",
      status: "",
      joiningDate: "",
      emailNote: "",
      department: "",
      salary: "",
      workingHours: "",
      benefits: "",
    });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Hiring & Onboarding</h1>
          <p className="text-muted-foreground">Generate onboarding links and manage candidate information</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>New Candidate Onboarding</CardTitle>
            <CardDescription>Fill in the candidate details to generate an onboarding link</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-medium">Full Name</label>
                  <Input 
                    id="fullName" 
                    placeholder="Enter candidate's full name" 
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter email address" 
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="Enter phone number" 
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="position" className="text-sm font-medium">Position</label>
                  <Input 
                    id="position" 
                    placeholder="Enter job position" 
                    value={formData.position}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="department" className="text-sm font-medium">Department</label>
                  <Select onValueChange={(value) => handleSelectChange(value, 'department')} value={formData.department}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="status" className="text-sm font-medium">Status</label>
                  <Select onValueChange={(value) => handleSelectChange(value, 'status')} value={formData.status}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="sent">Link Sent</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="joiningDate" className="text-sm font-medium">Joining Date</label>
                  <Input 
                    id="joiningDate" 
                    type="date" 
                    value={formData.joiningDate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="salary" className="text-sm font-medium">Salary</label>
                  <Input 
                    id="salary" 
                    type="number" 
                    placeholder="Enter annual salary" 
                    value={formData.salary}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="workingHours" className="text-sm font-medium">Working Hours</label>
                  <Input 
                    id="workingHours" 
                    placeholder="e.g., 9:00 AM - 5:00 PM" 
                    value={formData.workingHours}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="benefits" className="text-sm font-medium">Benefits Package</label>
                  <Input 
                    id="benefits" 
                    placeholder="Enter benefits package details" 
                    value={formData.benefits}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="emailNote" className="text-sm font-medium">Email Note</label>
                <Textarea 
                  id="emailNote" 
                  placeholder="Enter additional notes to include in the email"
                  className="min-h-[100px]"
                  value={formData.emailNote}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="documents" className="text-sm font-medium">Attach Documents</label>
                <Input id="documents" type="file" multiple />
                <p className="text-sm text-muted-foreground">Upload any relevant onboarding documents</p>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={handleClearForm}>Clear Form</Button>
                <Button onClick={handleGenerateLink}>
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Generate Link
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HiringOnboardingPage;
