
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Label } from "@/components/ui/label";

interface TaxCardProps {
  handleViewTaxStatement: () => void;
}

export const TaxCard = ({ handleViewTaxStatement }: TaxCardProps) => {
  return (
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
  );
};
