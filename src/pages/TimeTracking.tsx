import React, { useState } from "react";
import { Clock, Calendar, Timer, CheckCircle2, XCircle, Mail, Fingerprint, Camera } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

// Mock data - would come from backend in real implementation
const mockProjects = [
  { id: "PRJ001", name: "Website Redesign" },
  { id: "PRJ002", name: "Mobile App Development" },
];

const mockTimeEntries = [
  {
    id: 1,
    date: "2024-03-20",
    loginTime: "09:00",
    logoffTime: "17:00",
    projectCode: "PRJ001",
    workingHours: 8,
  },
];

const mockLeaveRequests = [
  {
    id: 1,
    employeeName: "John Doe",
    leaveType: "Sick Leave",
    startDate: "2024-03-25",
    endDate: "2024-03-26",
    status: "pending",
    managerEmail: "manager@example.com",
    reason: "Medical appointment",
    hrVisible: true,
  },
];

const TimeTrackingPage = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState(mockProjects);
  const [timeEntries, setTimeEntries] = useState(mockTimeEntries);
  const [leaveRequests, setLeaveRequests] = useState(mockLeaveRequests);
  const [newProject, setNewProject] = useState({ id: "", name: "" });
  const [newLeave, setNewLeave] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    managerEmail: "",
  });
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [faceIdEnabled, setFaceIdEnabled] = useState(false);

  const handleAddProject = () => {
    if (!newProject.id || !newProject.name) {
      toast({
        title: "Error",
        description: "Please fill in all project details",
        variant: "destructive",
      });
      return;
    }

    setProjects([...projects, newProject]);
    setNewProject({ id: "", name: "" });
    toast({
      title: "Success",
      description: "Project added successfully",
    });
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLeaveRequest = () => {
    if (!newLeave.leaveType || !newLeave.startDate || !newLeave.endDate || !newLeave.managerEmail) {
      toast({
        title: "Error",
        description: "Please fill in all leave request details",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(newLeave.managerEmail)) {
      toast({
        title: "Error",
        description: "Please enter a valid manager email address",
        variant: "destructive",
      });
      return;
    }

    const leaveRequest = {
      id: leaveRequests.length + 1,
      employeeName: "Current User",
      ...newLeave,
      status: "pending",
      hrVisible: true,
    };

    setLeaveRequests([...leaveRequests, leaveRequest]);
    setNewLeave({
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
      managerEmail: "",
    });
    toast({
      title: "Success",
      description: "Leave request submitted successfully",
    });
  };

  const handleLeaveApproval = (requestId: number, approved: boolean) => {
    setLeaveRequests(prev =>
      prev.map(req => {
        if (req.id === requestId) {
          return {
            ...req,
            status: approved ? "approved" : "rejected",
          };
        }
        return req;
      })
    );

    toast({
      title: approved ? "Leave Approved" : "Leave Rejected",
      description: `The leave request has been ${approved ? "approved" : "rejected"}.`,
    });

    // Notify HR (mock implementation)
    toast({
      title: "HR Notification",
      description: `Leave request ${approved ? "approval" : "rejection"} has been sent to HR team.`,
    });
  };

  const handleBiometricToggle = () => {
    setBiometricEnabled(!biometricEnabled);
    toast({
      title: !biometricEnabled ? "Biometric Authentication Enabled" : "Biometric Authentication Disabled",
      description: !biometricEnabled 
        ? "You can now use fingerprint for attendance" 
        : "Fingerprint authentication has been disabled",
    });
  };

  const handleFaceIdToggle = () => {
    setFaceIdEnabled(!faceIdEnabled);
    toast({
      title: !faceIdEnabled ? "Face ID Authentication Enabled" : "Face ID Authentication Disabled",
      description: !faceIdEnabled 
        ? "You can now use Face ID for attendance" 
        : "Face ID authentication has been disabled",
    });
  };

  const handleBiometricAttendance = () => {
    toast({
      title: "Processing Biometric Attendance",
      description: "Please place your finger on the scanner",
    });
    // Simulate biometric processing
    setTimeout(() => {
      toast({
        title: "Attendance Recorded",
        description: "Your attendance has been successfully recorded via biometric authentication",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Time Tracking</h1>
          <p className="text-muted-foreground">Manage time entries, projects, and leave requests</p>
        </div>

        {/* Biometric Configuration Section */}
        <Card>
          <CardHeader>
            <CardTitle>Biometric Authentication</CardTitle>
            <CardDescription>Configure biometric attendance options</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Fingerprint className="h-5 w-5" />
                    <span className="text-sm font-medium">Fingerprint Authentication</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Enable fingerprint scanning for attendance
                  </p>
                </div>
                <Switch
                  checked={biometricEnabled}
                  onCheckedChange={handleBiometricToggle}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    <span className="text-sm font-medium">Face ID Authentication</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Enable Face ID for attendance
                  </p>
                </div>
                <Switch
                  checked={faceIdEnabled}
                  onCheckedChange={handleFaceIdToggle}
                />
              </div>

              {(biometricEnabled || faceIdEnabled) && (
                <Button 
                  onClick={handleBiometricAttendance}
                  className="w-full"
                >
                  <Fingerprint className="mr-2 h-4 w-4" />
                  Record Attendance with Biometric
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Time Entry Section */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Time Entry</CardTitle>
            <CardDescription>Record your work hours and project activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Input type="date" placeholder="Select date" />
              <Input type="time" placeholder="Login time" />
              <Input type="time" placeholder="Logoff time" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map(project => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name} ({project.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="w-full md:w-auto">
                <Clock className="mr-2 h-4 w-4" /> Record Time
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Project Management Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Project Codes</CardTitle>
              <CardDescription>Manage project codes and assignments</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Add Project</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Project</DialogTitle>
                  <DialogDescription>
                    Enter the project details below
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label>Project Code</label>
                    <Input
                      value={newProject.id}
                      onChange={(e) => setNewProject({ ...newProject, id: e.target.value })}
                      placeholder="Enter project code"
                    />
                  </div>
                  <div className="space-y-2">
                    <label>Project Name</label>
                    <Input
                      value={newProject.name}
                      onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                      placeholder="Enter project name"
                    />
                  </div>
                  <Button onClick={handleAddProject} className="w-full">
                    Add Project
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Code</TableHead>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>{project.id}</TableCell>
                    <TableCell>{project.name}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Leave Management Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Leave Requests</CardTitle>
              <CardDescription>Request and manage leave applications</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Request Leave</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Request Leave</DialogTitle>
                  <DialogDescription>
                    Fill in the leave request details
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Select
                    onValueChange={(value) => setNewLeave({ ...newLeave, leaveType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                      <SelectItem value="Casual Leave">Casual Leave</SelectItem>
                      <SelectItem value="Maternity Leave">Maternity Leave</SelectItem>
                      <SelectItem value="Marriage Leave">Marriage Leave</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label>Start Date</label>
                      <Input
                        type="date"
                        value={newLeave.startDate}
                        onChange={(e) => setNewLeave({ ...newLeave, startDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label>End Date</label>
                      <Input
                        type="date"
                        value={newLeave.endDate}
                        onChange={(e) => setNewLeave({ ...newLeave, endDate: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label>Manager Email</label>
                    <Input
                      type="email"
                      value={newLeave.managerEmail}
                      onChange={(e) => setNewLeave({ ...newLeave, managerEmail: e.target.value })}
                      placeholder="Enter manager's email address"
                    />
                  </div>
                  <div className="space-y-2">
                    <label>Reason</label>
                    <Input
                      value={newLeave.reason}
                      onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                      placeholder="Enter reason for leave"
                    />
                  </div>
                  <Button onClick={handleLeaveRequest} className="w-full">
                    Submit Request
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Leave Type</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Manager Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>HR Visible</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaveRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.employeeName}</TableCell>
                    <TableCell>{request.leaveType}</TableCell>
                    <TableCell>{request.startDate}</TableCell>
                    <TableCell>{request.endDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {request.managerEmail}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={request.status === "approved" ? "default" : "secondary"}>
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {request.hrVisible ? "Visible to HR" : "Hidden"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {request.status === "pending" && (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleLeaveApproval(request.id, true)}
                            className="h-8 w-8 text-green-500"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleLeaveApproval(request.id, false)}
                            className="h-8 w-8 text-red-500"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TimeTrackingPage;
