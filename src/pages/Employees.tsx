
import React from "react";
import { Pencil, CheckCircle2, XCircle } from "lucide-react";
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
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const EmployeesPage = () => {
  const { toast } = useToast();
  const [selectedEmployee, setSelectedEmployee] = React.useState<any>(null);
  const [managerEmail, setManagerEmail] = React.useState("");

  // Fetch current user's profile to check if they are HR
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

  // Fetch employees based on user role
  const { data: employees, isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employee_profiles')
        .select(`
          *,
          department:departments(name)
        `)
        .order('last_name');

      if (error) throw error;
      return data || [];
    },
    enabled: !!currentUserProfile
  });

  const handleEdit = async (employee: any) => {
    if (!currentUserProfile?.is_hr) {
      toast({
        title: "Access Denied",
        description: "Only HR team members can edit employee information.",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedEmployee(employee);
  };

  const handleApproval = async (employeeId: string, approved: boolean) => {
    if (!currentUserProfile?.is_hr) {
      toast({
        title: "Access Denied",
        description: "Only HR team members can approve/reject employees.",
        variant: "destructive"
      });
      return;
    }

    const { error } = await supabase
      .from('employee_profiles')
      .update({ status: approved ? 'active' : 'inactive' })
      .eq('id', employeeId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update employee status.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: approved ? "Employee Approved" : "Employee Rejected",
      description: `The employee has been ${approved ? "approved" : "rejected"} successfully.`
    });
  };

  const handleAssignManager = async (employeeId: string) => {
    if (!currentUserProfile?.is_hr) {
      toast({
        title: "Access Denied",
        description: "Only HR team members can assign managers.",
        variant: "destructive"
      });
      return;
    }

    if (!managerEmail) {
      toast({
        title: "Error",
        description: "Please enter manager's email",
        variant: "destructive"
      });
      return;
    }

    const { data: manager, error: managerError } = await supabase
      .from('employee_profiles')
      .select('id')
      .eq('email', managerEmail)
      .single();

    if (managerError || !manager) {
      toast({
        title: "Error",
        description: "Manager not found with the provided email.",
        variant: "destructive"
      });
      return;
    }

    const { error } = await supabase
      .from('employee_profiles')
      .update({ manager_id: manager.id })
      .eq('id', employeeId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to assign manager.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Manager Assigned",
      description: `Manager has been successfully assigned.`
    });

    setManagerEmail("");
    setSelectedEmployee(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="container mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-4 bg-muted rounded w-1/3"></div>
            <div className="h-96 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Employees</h1>
          <p className="text-muted-foreground">
            {currentUserProfile?.is_hr 
              ? "Manage and view all employees" 
              : "View employee information"}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Employee Directory</CardTitle>
            <CardDescription>
              {currentUserProfile?.is_hr 
                ? "View and manage employee information" 
                : "View employee information"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Hire Date</TableHead>
                  <TableHead>Status</TableHead>
                  {currentUserProfile?.is_hr && <TableHead>Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees?.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">
                      {employee.first_name} {employee.last_name}
                    </TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{employee.department?.name || 'N/A'}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{new Date(employee.hire_date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          employee.status === 'active' 
                            ? 'bg-green-500' 
                            : employee.status === 'pending' 
                            ? 'bg-yellow-500' 
                            : 'bg-red-500'
                        }
                      >
                        {employee.status || 'pending'}
                      </Badge>
                    </TableCell>
                    {currentUserProfile?.is_hr && (
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(employee)}
                            className="h-8 w-8"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          {employee.status === 'pending' && (
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
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {selectedEmployee && (
          <Dialog open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assign Manager</DialogTitle>
                <DialogDescription>
                  Enter the manager's email address to assign them as the manager
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Input
                  placeholder="manager@company.com"
                  value={managerEmail}
                  onChange={(e) => setManagerEmail(e.target.value)}
                />
                <Button
                  onClick={() => handleAssignManager(selectedEmployee.id)}
                  className="w-full"
                >
                  Assign Manager
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default EmployeesPage;
