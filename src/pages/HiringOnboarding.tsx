
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
import { Link } from "lucide-react";

const HiringOnboardingPage = () => {
  const handleGenerateLink = () => {
    // TODO: Implement link generation
    toast({
      title: "Link Generated",
      description: "Onboarding link has been generated and sent to the candidate.",
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
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-medium">Full Name</label>
                  <Input id="fullName" placeholder="Enter candidate's full name" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                  <Input id="email" type="email" placeholder="Enter email address" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                  <Input id="phone" type="tel" placeholder="Enter phone number" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="position" className="text-sm font-medium">Position</label>
                  <Input id="position" placeholder="Enter job position" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="status" className="text-sm font-medium">Status</label>
                  <Select>
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
                  <Input id="joiningDate" type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="emailNote" className="text-sm font-medium">Email Note</label>
                <Textarea 
                  id="emailNote" 
                  placeholder="Enter additional notes to include in the email"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="documents" className="text-sm font-medium">Attach Documents</label>
                <Input id="documents" type="file" multiple />
                <p className="text-sm text-muted-foreground">Upload any relevant onboarding documents</p>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline">Clear Form</Button>
                <Button onClick={handleGenerateLink}>
                  <Link className="h-4 w-4 mr-2" />
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
