import { useState } from "react";
import { toast } from "sonner";
import { PayCard } from "@/components/payroll/PayCard";
import { TaxCard } from "@/components/payroll/TaxCard";
import { ClaimSubmissionsCard } from "@/components/payroll/ClaimSubmissionsCard";
import { TaxDialogs } from "@/components/payroll/TaxDialogs";
import { TaxSubmissionsSection } from "@/components/payroll/TaxSubmissionsSection";

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
  const [showTaxStatementUpload, setShowTaxStatementUpload] = useState(false);

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

  const handleTaxStatementUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast.success(`Tax statement ${file.name} uploaded successfully`);
    }
  };

  const handleDownloadTaxStatement = () => {
    toast.success("Tax statement download started");
  };

  // Define proper type for user roles
  type UserRole = 'hr' | 'payroll' | 'employee';
  
  // Mock user role and ID - in a real app this would come from auth context
  const currentUserRole: UserRole = "employee"; // Mock roles: "hr", "payroll", "employee"
  const currentUserId = "user123"; // Mock user ID

  // Helper function to check if user is HR or Payroll with proper type checking
  const isHRorPayroll = (): boolean => {
    return currentUserRole === 'hr' || currentUserRole === 'payroll';
  };

  // Helper function to check if user is accessing their own records
  const isOwnRecord = (employeeId: string): boolean => {
    return currentUserId === employeeId;
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <PayCard
          isHRorPayroll={isHRorPayroll}
          isOwnRecord={isOwnRecord}
          currentUserRole={currentUserRole}
          handleDownloadPayslip={handleDownloadPayslip}
          setShowPayslipUpload={setShowPayslipUpload}
        />
        <TaxCard handleViewTaxStatement={handleViewTaxStatement} />
        <ClaimSubmissionsCard />
      </div>

      <TaxSubmissionsSection
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        selectedInvestments={selectedInvestments}
        setSelectedInvestments={setSelectedInvestments}
        selectedFile={selectedFile}
        handleFileUpload={handleFileUpload}
        assignedTo={assignedTo}
        setAssignedTo={setAssignedTo}
        handleSubmit={handleSubmit}
        statusOptions={statusOptions}
        investmentTypes={investmentTypes}
        payrollPersonnel={payrollPersonnel}
      />

      <TaxDialogs
        showTaxHistory={showTaxHistory}
        setShowTaxHistory={setShowTaxHistory}
        showPayslipUpload={showPayslipUpload}
        setShowPayslipUpload={setShowPayslipUpload}
        showTaxStatement={showTaxStatement}
        setShowTaxStatement={setShowTaxStatement}
        showTaxStatementUpload={showTaxStatementUpload}
        setShowTaxStatementUpload={setShowTaxStatementUpload}
        handlePayslipUpload={handlePayslipUpload}
        handleTaxStatementUpload={handleTaxStatementUpload}
        handleDownloadTaxStatement={handleDownloadTaxStatement}
        isHRorPayroll={isHRorPayroll}
        isOwnRecord={isOwnRecord}
        taxData={taxData}
      />
    </div>
  );
};

export default Payroll;
