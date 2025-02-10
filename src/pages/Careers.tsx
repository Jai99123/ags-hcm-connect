
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
import { Link } from "react-router-dom";
import { file, messageSquare, eye, link, user } from "lucide-react";

const CareersPage = () => {
  const websiteLink = "https://www.adventglobal.com";
  
  const jobPositions = [
    {
      id: "JOB001",
      title: "Senior React Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
    },
    {
      id: "JOB002",
      title: "Product Manager",
      department: "Product",
      location: "Hybrid",
      type: "Full-time",
    },
  ];

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
                <link className="h-5 w-5" />
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
            <CardHeader>
              <CardTitle>Open Positions</CardTitle>
              <CardDescription>Current job openings and applications</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>List of current job openings</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobPositions.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>{job.id}</TableCell>
                      <TableCell>{job.title}</TableCell>
                      <TableCell>{job.department}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>{job.type}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon" title="Upload Resume">
                            <file className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" title="View Resumes">
                            <eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" title="Manager Comments">
                            <messageSquare className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" title="Internal Application">
                            <user className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
