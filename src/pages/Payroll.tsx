
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

const Payroll = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [showTaxHistory, setShowTaxHistory] = useState(false);

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
      year: "2023-24",
      totalIncome: 600000,
      taxableIncome: 500000,
      taxPaid: 25000,
    },
    {
      id: 2,
      year: "2022-23",
      totalIncome: 550000,
      taxableIncome: 450000,
      taxPaid: 22500,
    },
  ];

  const handleImportData = () => {
    toast.success("Data import initiated. Please wait...");
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Payroll Management</h1>

      {/* Pay Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Pay Details</h2>
        <div className="grid gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>View Current Pay</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Current Pay Details</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <Label>Basic Pay</Label>
                  <span>₹50,000</span>
                  <Label>Deductions</Label>
                  <span>₹5,000</span>
                  <Label>Net Pay</Label>
                  <span>₹45,000</span>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-medium mb-4">Pay History</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Basic Pay</TableHead>
                  <TableHead>Deductions</TableHead>
                  <TableHead>Net Pay</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payHistory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>₹{item.basicPay}</TableCell>
                    <TableCell>₹{item.deductions}</TableCell>
                    <TableCell>₹{item.netPay}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* Tax Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Tax Management</h2>
        <div className="grid gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Select Tax Options</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tax Options</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center gap-2">
                  <input type="radio" id="oldRegime" name="taxRegime" />
                  <Label htmlFor="oldRegime">Old Tax Regime</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="radio" id="newRegime" name="taxRegime" />
                  <Label htmlFor="newRegime">New Tax Regime</Label>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" onClick={() => setShowTaxHistory(true)}>
            View Tax History
          </Button>
        </div>
      </section>

      {/* Financial Year Tax Data */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Financial Year Tax Data</h2>
        <div className="grid gap-4">
          <div className="flex gap-4">
            <div className="grid gap-2">
              <Label>From Date</Label>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    {startDate ? format(startDate, "PPP") : "Pick a date"}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                  />
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid gap-2">
              <Label>To Date</Label>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    {endDate ? format(endDate, "PPP") : "Pick a date"}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>

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

          <div className="flex gap-4">
            <Button onClick={handleImportData}>Import Data</Button>
            <Button variant="outline">Export Data</Button>
          </div>
        </div>
      </section>

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
