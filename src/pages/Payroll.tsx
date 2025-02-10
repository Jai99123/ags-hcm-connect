import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";

const Payroll = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [showTaxHistory, setShowTaxHistory] = useState(false);

  const handleViewPayslip = () => {
    toast.info("Payslip details will be available shortly");
  };

  // Mock data for demonstration
  const payHistory = [
    {
      id: 1,
      date: "2024-03-01",
      basicPay: 50000,
      deductions: 5000,
      netPay: 45000,
    },
    {
      id: 2,
      date: "2024-02-01",
      basicPay: 50000,
      deductions: 5000,
      netPay: 45000,
    },
  ];

  const taxData = [
    {
      id: 1,
      year: "2024-25",
      totalIncome: 700000,
      taxableIncome: 600000,
      taxPaid: 33000,
    },
    {
      id: 2,
      year: "2023-24",
      totalIncome: 600000,
      taxableIncome: 500000,
      taxPaid: 25000,
    },
  ];

  const handleImportData = () => {
    toast.success("Data import initiated. Please wait...");
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Pay Section */}
        <Card>
          <CardHeader>
            <CardTitle>Pay</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Jan 2025</h3>
              <p className="text-sm text-muted-foreground mb-4">
                The detailed view will be available shortly. In the meantime you can
                download your payslip.
              </p>
              <div className="flex gap-3">
                <Button onClick={handleViewPayslip}>View Payslip</Button>
                <Button variant="outline">Pay History</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tax Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Tax</CardTitle>
            <Button variant="ghost" size="icon">
              <Eye className="h-4 w-4" />
              <span className="sr-only">Show</span>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium">YTD</h3>
              <div className="space-y-3 mt-2">
                <div>
                  <Label className="text-sm">Taxable Income (EST)</Label>
                  <p className="text-xl font-semibold">₹600,000</p>
                </div>
                
                <div className="bg-green-50 p-3 rounded-md">
                  <Label className="text-sm">Tax Paid</Label>
                  <p className="text-sm">(till Feb 2025)</p>
                  <p className="text-xl font-semibold">₹33,000</p>
                </div>

                <div className="bg-orange-50 p-3 rounded-md">
                  <Label className="text-sm">Total Tax Due (EST)</Label>
                  <p className="text-xl font-semibold">₹25,000</p>
                </div>
              </div>
              <Button className="mt-4" variant="outline">
                Tax Statement
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Claims Section */}
        <Card>
          <CardHeader>
            <CardTitle>Claim submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Submission window will open on
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <h4 className="font-medium">Claims</h4>
                <p className="text-sm text-muted-foreground">0</p>
              </div>
              <div>
                <h4 className="font-medium">Submitted</h4>
                <p className="text-sm text-muted-foreground">0</p>
              </div>
              <div>
                <h4 className="font-medium">Limit</h4>
                <p className="text-sm text-muted-foreground">₹50,000</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tax Submissions Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Tax submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-sm">
              My tax structure FY 2024-2025:{" "}
              <Button variant="link" className="p-0 h-auto font-normal">
                New tax regime
              </Button>
            </p>
            <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
              Resubmission window open now
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Tax History Dialog */}
      <Dialog open={showTaxHistory} onOpenChange={setShowTaxHistory}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Tax History</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Financial Year</TableHead>
                <TableHead>Total Income</TableHead>
                <TableHead>Taxable Income</TableHead>
                <TableHead>Tax Paid</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taxData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.year}</TableCell>
                  <TableCell>₹{item.totalIncome}</TableCell>
                  <TableCell>₹{item.taxableIncome}</TableCell>
                  <TableCell>₹{item.taxPaid}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Payroll;
