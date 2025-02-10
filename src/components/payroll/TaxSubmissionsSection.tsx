import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter } from "lucide-react";
import { format } from "date-fns";

interface TaxSubmissionsSectionProps {
  searchTerm: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedStatus: string[];
  setSelectedStatus: (status: string[]) => void;
  startDate: Date | undefined;
  setStartDate: (date: Date) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date) => void;
  selectedInvestments: string[];
  setSelectedInvestments: (investments: string[]) => void;
  selectedFile: File | null;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  assignedTo: string;
  setAssignedTo: (assigned: string) => void;
  handleSubmit: () => void;
  statusOptions: Array<{ id: string; label: string }>;
  investmentTypes: Array<{ id: string; label: string }>;
  payrollPersonnel: Array<{ id: string; name: string }>;
}

export const TaxSubmissionsSection = ({
  searchTerm,
  handleSearch,
  selectedStatus,
  setSelectedStatus,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedInvestments,
  setSelectedInvestments,
  selectedFile,
  handleFileUpload,
  assignedTo,
  setAssignedTo,
  handleSubmit,
  statusOptions,
  investmentTypes,
  payrollPersonnel,
}: TaxSubmissionsSectionProps) => {
  return (
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
  );
};
