
import React from "react";
import { Pencil, CheckCircle2, XCircle, Mail } from "lucide-react";
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

// This would come from a backend in a real application
const mockEmployees = [
  {
    id: 1,
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    position: "Software Engineer",
    status: "active",
    joiningDate: "2024-03-01",
    approvalStatus: "pending", // New field
    managerEmail: "", // New field
  },
  {
    id: 2,
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 234 567 8901",
    position: "Product Manager",
    status: "pending",
    joiningDate: "2024-03-15",
    approvalStatus: "pending", // New field
    managerEmail: "", // New field
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-500";
    case "pending":
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
};

const getApprovalStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "text-green-500";
    case "rejected":
      return "text-red-500";
    default:
      return "text-yellow-500";
  }
};

const EmployeesPage = () => {
  const { toast } = useToast();
  const [employees, setEmployees] = React.useState(mockEmployees);
  const [selectedEmployee, setSelectedEmployee] = React.useState<any>(null);
  const [managerEmail, setManagerEmail] = React.useState("");

  const handleEdit = (employeeId: number) => {
    console.log("Edit employee:", employeeId);
    // Here you would typically open a modal or navigate to an edit form
  };

  const handleApproval = (employeeId: number, approved: boolean) => {
    setEmployees(prev =>
      prev.map(emp => {
        if (emp.id === employeeId) {
          return {
            ...emp,
            approvalStatus: approved ? "approved" : "rejected",
          };
        }
        return emp;
      })
    );

    toast({
      title: approved ? "Candidate Approved" : "Candidate Rejected",
      description: `The candidate has been ${approved ? "approved" : "rejected"} successfully.`,
    });
  };

  const handleAssignManager = (employeeId: number) => {
    if (!managerEmail) {
      toast({
        title: "Error",
        description: "Please enter manager's email",
        variant: "destructive",
      });
      return;
    }

    setEmployees(prev =>
      prev.map(emp => {
        if (emp.id === employeeId) {
          return {
            ...emp,
            managerEmail,
          };
        }
        return emp;
      })
    );

    // Here you would typically send an email to the manager
    console.log(`Sending approval request to manager: ${managerEmail}`);

    toast({
      title: "Manager Assigned",
      description: `An approval request has been sent to ${managerEmail}`,
    });

    setManagerEmail("");
    setSelectedEmployee(null);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Employees</h1>
          <p className="text-muted-foreground">Manage and view all employees</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Employee Directory</CardTitle>
            <CardDescription>View and manage employee information</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Joining Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Approval Status</TableHead>
                  <TableHead>Manager</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.fullName}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.phone}</TableCell>
                    <TableCell>{employee.joiningDate}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(employee.status)}>
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={getApprovalStatusColor(employee.approvalStatus)}>
                        {employee.approvalStatus}
                      </span>
                    </TableCell>
                    <TableCell>
                      {employee.managerEmail || (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedEmployee(employee)}
                            >
                              Assign Manager
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Assign Manager</DialogTitle>
                              <DialogDescription>
                                Enter the manager's email address to send an approval request
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <Input
                                placeholder="manager@company.com"
                                value={managerEmail}
                                onChange={(e) => setManagerEmail(e.target.value)}
                              />
                              <Button
                                onClick={() => handleAssignManager(employee.id)}
                                className="w-full"
                              >
                                Send Approval Request
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(employee.id)}
                          className="h-8 w-8"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        {employee.managerEmail && employee.approvalStatus === "pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleApproval(employee.id, true)}
                              className="h-8 w-8 text-green-500"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleApproval(employee.id, false)}
                              className="h-8 w-8 text-red-500"
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
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
  );
};

export default EmployeesPage;
