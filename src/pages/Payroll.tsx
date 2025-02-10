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
import { Eye, Search, Upload, Filter, Download } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const Payroll = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [showTaxHistory, setShowTaxHistory] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [assignedTo, setAssignedTo] = useState<string>("john_doe");

  const [selectedInvestments, setSelectedInvestments] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  const investmentTypes = [
    { id: "hra", label: "HRA" },
    { id: "prevEmployer", label: "Previous Employer Income" },
    { id: "houseProperty", label: "House Property" },
    { id: "mediclaim", label: "Mediclaim - Excluding contribution made via Salary" },
    { id: "nsc", label: "National Savings Certificate" },
    { id: "nscInterest", label: "National Savings Certificate - Accrued Interest" },
    { id: "nps", label: "National Pension Scheme (NPS) - Excluding contribution made via Salary" },
    { id: "elss", label: "Equity Linked Savings Scheme (ELSS)/Mutual Funds" },
    { id: "pension", label: "Pension Plan" },
    { id: "selfDisability", label: "Self Disability" },
    { id: "childTuition", label: "Child Tuition Fee" },
    { id: "sukanya", label: "Sukanya Samriddhi Yojana" },
    { id: "ulip", label: "Unit Linked Insurance Plan" },
    { id: "deposits", label: "Deposits" },
    { id: "lifeInsurance", label: "Life Insurance" },
    { id: "ppf", label: "Public Provident Fund" },
    { id: "educationLoan", label: "Education Loan" },
    { id: "evLoan", label: "Loan on Electric Vehicles" },
    { id: "dependentDisability", label: "Dependent Disability" },
  ];

  const statusOptions = [
    { id: "approved", label: "Approved" },
    { id: "rejected", label: "Rejected" },
    { id: "pending", label: "Yet to validate" },
    { id: "partiallyApproved", label: "Partially approved" },
    { id: "declared", label: "Declaration submitted" },
    { id: "queryRaised", label: "Query raised" },
    { id: "resubmitted", label: "Resubmitted" },
  ];

  const payrollPersonnel = [
    { id: "john_doe", name: "John Doe" },
    { id: "jane_smith", name: "Jane Smith" },
    { id: "mike_johnson", name: "Mike Johnson" },
    { id: "sarah_williams", name: "Sarah Williams" }
  ];

  const [showPayslipUpload, setShowPayslipUpload] = useState(false);
  const [showTaxStatement, setShowTaxStatement] = useState(false);

  const handleViewPayslip = () => {
    toast.info("Payslip details will be available shortly");
  };

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast.success(`File ${file.name} selected`);
    }
  };

  const handleSubmit = () => {
    toast.success("Tax submission sent for approval");
    // Here you would typically send the data to your backend
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePayslipUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast.success(`Payslip ${file.name} uploaded successfully`);
    }
  };

  const handleDownloadPayslip = () => {
    toast.success("Payslip download started");
  };

  const handleViewTaxStatement = () => {
    setShowTaxStatement(true);
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Pay</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Jan 2025</h3>
              <p className="text-sm text-muted-foreground mb-4">
                The detailed view will be available shortly.
              </p>
              <div className="flex gap-3">
                <Button onClick={handleDownloadPayslip} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Payslip
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowPayslipUpload(true)}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Upload Payslip
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

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
              <Button className="mt-4" variant="outline" onClick={handleViewTaxStatement}>
                Tax Statement
              </Button>
            </div>
          </CardContent>
        </Card>

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

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Tax submissions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
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

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search investment number..."
                className="pl-8"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button variant="outline">Columns</Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Investment status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {statusOptions.map((status) => (
                <div key={status.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={status.id}
                    checked={selectedStatus.includes(status.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedStatus([...selectedStatus, status.id]);
                      } else {
                        setSelectedStatus(
                          selectedStatus.filter((id) => id !== status.id)
                        );
                      }
                    }}
                  />
                  <Label htmlFor={status.id}>{status.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Submission/Updated date</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fromDate">From</Label>
                <Input
                  id="fromDate"
                  type="date"
                  placeholder="MM/DD/YYYY"
                  value={startDate ? format(startDate, 'yyyy-MM-dd') : ''}
                  onChange={(e) => setStartDate(new Date(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="toDate">To</Label>
                <Input
                  id="toDate"
                  type="date"
                  placeholder="MM/DD/YYYY"
                  value={endDate ? format(endDate, 'yyyy-MM-dd') : ''}
                  onChange={(e) => setEndDate(new Date(e.target.value))}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Investment type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {investmentTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={type.id}
                    checked={selectedInvestments.includes(type.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedInvestments([...selectedInvestments, type.id]);
                      } else {
                        setSelectedInvestments(
                          selectedInvestments.filter((id) => id !== type.id)
                        );
                      }
                    }}
                  />
                  <Label htmlFor={type.id}>{type.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Document Upload</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  onChange={handleFileUpload}
                  className="max-w-md"
                />
                {selectedFile && (
                  <span className="text-sm text-muted-foreground">
                    {selectedFile.name}
                  </span>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="assignTo">Assign to Payroll Personnel</Label>
                <select
                  id="assignTo"
                  className="flex h-10 w-full max-w-md rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                >
                  <option value="" disabled>Select a person</option>
                  {payrollPersonnel.map(person => (
                    <option key={person.id} value={person.id}>
                      {person.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline">Clear</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </CardContent>
      </Card>

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

      <Dialog open={showPayslipUpload} onOpenChange={setShowPayslipUpload}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Payslip</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              <Label htmlFor="payslipFile">Select Payslip File</Label>
              <Input
                id="payslipFile"
                type="file"
                onChange={handlePayslipUpload}
                accept=".pdf,.doc,.docx"
              />
            </div>
            <Button onClick={() => setShowPayslipUpload(false)}>Done</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showTaxStatement} onOpenChange={setShowTaxStatement}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Tax Statement Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Pay Structure</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Basic Pay</Label>
                  <p className="text-lg">₹50,000</p>
                </div>
                <div>
                  <Label>HRA</Label>
                  <p className="text-lg">₹20,000</p>
                </div>
                <div>
                  <Label>Special Allowance</Label>
                  <p className="text-lg">₹15,000</p>
                </div>
                <div>
                  <Label>Other Benefits</Label>
                  <p className="text-lg">₹10,000</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Tax Breakdown</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <Label>Income Tax</Label>
                  <p className="text-lg">₹25,000</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <Label>Professional Tax</Label>
                  <p className="text-lg">₹2,500</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <Label>Surcharge</Label>
                  <p className="text-lg">₹1,000</p>
                </div>
                <div className="bg-green-50 p-4 rounded-md">
                  <Label>Tax Deductions (Section 80C)</Label>
                  <p className="text-lg">-₹5,000</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <Label className="text-lg font-semibold">Net Tax Payable</Label>
                <p className="text-xl font-bold">₹23,500</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Payroll;
