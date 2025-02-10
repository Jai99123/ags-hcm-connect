import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TaxDialogsProps {
  showTaxHistory: boolean;
  setShowTaxHistory: (show: boolean) => void;
  showPayslipUpload: boolean;
  setShowPayslipUpload: (show: boolean) => void;
  showTaxStatement: boolean;
  setShowTaxStatement: (show: boolean) => void;
  showTaxStatementUpload: boolean;
  setShowTaxStatementUpload: (show: boolean) => void;
  handlePayslipUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTaxStatementUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDownloadTaxStatement: () => void;
  isHRorPayroll: () => boolean;
  isOwnRecord: (id: string) => boolean;
  taxData: Array<{
    id: number;
    year: string;
    totalIncome: number;
    taxableIncome: number;
    taxPaid: number;
  }>;
}

export const TaxDialogs = ({
  showTaxHistory,
  setShowTaxHistory,
  showPayslipUpload,
  setShowPayslipUpload,
  showTaxStatement,
  setShowTaxStatement,
  showTaxStatementUpload,
  setShowTaxStatementUpload,
  handlePayslipUpload,
  handleTaxStatementUpload,
  handleDownloadTaxStatement,
  isHRorPayroll,
  isOwnRecord,
  taxData,
}: TaxDialogsProps) => {
  return (
    <>
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
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Actions</h3>
              <div className="flex gap-2">
                {isHRorPayroll() && (
                  <Button 
                    variant="outline"
                    onClick={() => setShowTaxStatementUpload(true)}
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Statement
                  </Button>
                )}
                {isOwnRecord("user123") && (
                  <Button 
                    variant="outline"
                    onClick={handleDownloadTaxStatement}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Statement
                  </Button>
                )}
              </div>
            </div>

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

      <Dialog open={showTaxStatementUpload} onOpenChange={setShowTaxStatementUpload}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Tax Statement</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              <Label htmlFor="taxStatementFile">Select Tax Statement File</Label>
              <Input
                id="taxStatementFile"
                type="file"
                onChange={handleTaxStatementUpload}
                accept=".pdf,.doc,.docx"
              />
            </div>
            <Button onClick={() => setShowTaxStatementUpload(false)}>Done</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
