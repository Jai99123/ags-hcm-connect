
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ClaimSubmissionsCard = () => {
  return (
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
  );
};
