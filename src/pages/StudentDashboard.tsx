import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import DashboardLayout from "@/components/DashboardLayout";
import PlacementCard from "@/components/PlacementCard";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Briefcase, FileText, Building2 } from "lucide-react";
import { toast } from "sonner";

const StudentDashboard = () => {
  const { user } = useAuth();
  const { placements, applications, addApplication, hasApplied } = useData();
  const student = user?.student!;

  const eligiblePlacements = placements.filter(
    (p) => student.cgpa >= p.minCgpa && p.allowedDepartments.includes(student.department)
  );

  const myApps = applications.filter((a) => a.studentId === student.id);
  const appliedPlacements = myApps.map((a) => ({
    ...a,
    placement: placements.find((p) => p.id === a.placementId)!,
  })).filter((a) => a.placement);

  const handleApply = (placementId: string) => {
    addApplication({
      id: `a${Date.now()}`,
      studentId: student.id,
      placementId,
      status: "applied",
      appliedAt: new Date().toISOString().split("T")[0],
    });
    toast.success("Application submitted successfully!");
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome */}
        <div>
          <h1 className="text-3xl font-bold">
            Welcome, <span className="gradient-text">{student.name}</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            {student.department} · CGPA: {student.cgpa}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="glass-card">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/15 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{eligiblePlacements.length}</p>
                <p className="text-sm text-muted-foreground">Eligible Placements</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/15 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{myApps.length}</p>
                <p className="text-sm text-muted-foreground">Applications</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/15 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{placements.length}</p>
                <p className="text-sm text-muted-foreground">Total Openings</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="placements">
          <TabsList>
            <TabsTrigger value="placements">Available Placements</TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="placements" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {eligiblePlacements.map((p) => (
                <PlacementCard
                  key={p.id}
                  placement={p}
                  applied={hasApplied(student.id, p.id)}
                  onApply={() => handleApply(p.id)}
                />
              ))}
            </div>
            {eligiblePlacements.length === 0 && (
              <p className="text-center text-muted-foreground py-12">No eligible placements at this time.</p>
            )}
          </TabsContent>

          <TabsContent value="applications" className="mt-6">
            <div className="space-y-3">
              {appliedPlacements.map(({ placement, status, appliedAt }) => (
                <Card key={placement.id} className="glass-card">
                  <CardContent className="py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/15 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{placement.companyName}</p>
                        <p className="text-sm text-muted-foreground">{placement.role} · {placement.package}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-primary/15 text-primary border-primary/30 capitalize">{status}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">{appliedAt}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {appliedPlacements.length === 0 && (
                <p className="text-center text-muted-foreground py-12">You haven't applied to any placements yet.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
