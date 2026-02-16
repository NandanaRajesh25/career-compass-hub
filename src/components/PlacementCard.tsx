import { Placement } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, IndianRupee, GraduationCap, CheckCircle2 } from "lucide-react";

interface Props {
  placement: Placement;
  applied?: boolean;
  onApply?: () => void;
  showApply?: boolean;
}

const PlacementCard = ({ placement, applied, onApply, showApply = true }: Props) => {
  return (
    <Card className="glass-card hover:border-primary/30 transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/15 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{placement.companyName}</CardTitle>
              <p className="text-sm text-muted-foreground">{placement.role}</p>
            </div>
          </div>
          {applied && (
            <Badge className="bg-green-500/15 text-green-400 border-green-500/30">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Applied
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{placement.description}</p>

        <div className="flex flex-wrap gap-3 text-sm">
          <div className="flex items-center gap-1.5 text-primary">
            <IndianRupee className="h-3.5 w-3.5" />
            <span className="font-semibold">{placement.package}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>Min CGPA: {placement.minCgpa}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {placement.allowedDepartments.map((dept) => (
            <Badge key={dept} variant="secondary" className="text-xs">
              {dept}
            </Badge>
          ))}
        </div>

        {showApply && !applied && onApply && (
          <Button onClick={onApply} className="w-full mt-2">
            Apply Now
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PlacementCard;
