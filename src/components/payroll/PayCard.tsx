
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";

interface PayCardProps {
  isHRorPayroll: () => boolean;
  isOwnRecord: (id: string) => boolean;
  currentUserRole: 'hr' | 'payroll' | 'employee';
  handleDownloadPayslip: () => void;
  setShowPayslipUpload: (show: boolean) => void;
}

export const PayCard = ({
  isHRorPayroll,
  isOwnRecord,
  currentUserRole,
  handleDownloadPayslip,
  setShowPayslipUpload
}: PayCardProps) => {
  return (
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
            {currentUserRole === 'employee' && isOwnRecord("user123") && (
              <Button 
                onClick={handleDownloadPayslip} 
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download Payslip
              </Button>
            )}
            {isHRorPayroll() && (
              <Button 
                variant="outline" 
                onClick={() => setShowPayslipUpload(true)}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Upload Payslip
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
