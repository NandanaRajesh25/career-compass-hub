import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Department } from "@/types";
import { DEPARTMENTS } from "@/data/mockData";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Briefcase, FileText, PlusCircle, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const { students, placements, applications, updateStudentStatus, addPlacement } = useData();

  // Add Placement form
  const [pForm, setPForm] = useState({
    companyName: "", role: "", package: "", minCgpa: "", description: "",
    allowedDepartments: [] as Department[],
  });

  const handleAddPlacement = (e: React.FormEvent) => {
    e.preventDefault();
    addPlacement({
      id: `p${Date.now()}`,
      companyName: pForm.companyName,
      role: pForm.role,
      package: pForm.package,
      minCgpa: parseFloat(pForm.minCgpa),
      allowedDepartments: pForm.allowedDepartments,
      description: pForm.description,
      postedAt: new Date().toISOString().split("T")[0],
    });
    setPForm({ companyName: "", role: "", package: "", minCgpa: "", description: "", allowedDepartments: [] });
    toast.success("Placement added successfully!");
  };

  const toggleDept = (dept: Department) => {
    setPForm((prev) => ({
      ...prev,
      allowedDepartments: prev.allowedDepartments.includes(dept)
        ? prev.allowedDepartments.filter((d) => d !== dept)
        : [...prev.allowedDepartments, dept],
    }));
  };

  // Application view
  const [selectedPlacement, setSelectedPlacement] = useState("");

  const applicantsForPlacement = applications
    .filter((a) => a.placementId === selectedPlacement)
    .map((a) => ({ ...a, student: students.find((s) => s.id === a.studentId) }))
    .filter((a) => a.student);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">
          Admin <span className="gradient-text">Dashboard</span>
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="glass-card">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/15 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{students.length}</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/15 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{placements.length}</p>
                <p className="text-sm text-muted-foreground">Total Placements</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/15 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{applications.length}</p>
                <p className="text-sm text-muted-foreground">Total Applications</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="placements">
          <TabsList>
            <TabsTrigger value="placements">Add Placement</TabsTrigger>
            <TabsTrigger value="students">Manage Students</TabsTrigger>
            <TabsTrigger value="applications">View Applications</TabsTrigger>
          </TabsList>

          {/* Add Placement */}
          <TabsContent value="placements" className="mt-6">
            <Card className="glass-card max-w-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlusCircle className="h-5 w-5 text-primary" />
                  New Placement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddPlacement} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Company Name</Label>
                      <Input value={pForm.companyName} onChange={(e) => setPForm({ ...pForm, companyName: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Role</Label>
                      <Input value={pForm.role} onChange={(e) => setPForm({ ...pForm, role: e.target.value })} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Package (CTC)</Label>
                      <Input placeholder="₹10 LPA" value={pForm.package} onChange={(e) => setPForm({ ...pForm, package: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Minimum CGPA</Label>
                      <Input type="number" step="0.1" min="0" max="10" value={pForm.minCgpa} onChange={(e) => setPForm({ ...pForm, minCgpa: e.target.value })} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea value={pForm.description} onChange={(e) => setPForm({ ...pForm, description: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Allowed Departments</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {DEPARTMENTS.map((dept) => (
                        <label key={dept} className="flex items-center gap-2 text-sm cursor-pointer">
                          <Checkbox
                            checked={pForm.allowedDepartments.includes(dept)}
                            onCheckedChange={() => toggleDept(dept)}
                          />
                          {dept}
                        </label>
                      ))}
                    </div>
                  </div>
                  <Button type="submit" className="w-full">Add Placement</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manage Students */}
          <TabsContent value="students" className="mt-6">
            <Card className="glass-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>College ID</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>CGPA</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.name}</TableCell>
                      <TableCell>{s.collegeId}</TableCell>
                      <TableCell>{s.department}</TableCell>
                      <TableCell>{s.cgpa}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            s.status === "approved"
                              ? "bg-green-500/15 text-green-400 border-green-500/30"
                              : s.status === "rejected"
                              ? "bg-red-500/15 text-red-400 border-red-500/30"
                              : "bg-yellow-500/15 text-yellow-400 border-yellow-500/30"
                          }
                        >
                          {s.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        {s.status === "pending" && (
                          <>
                            <Button size="sm" variant="ghost" className="text-green-400 hover:text-green-300" onClick={() => { updateStudentStatus(s.id, "approved"); toast.success(`${s.name} approved`); }}>
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300" onClick={() => { updateStudentStatus(s.id, "rejected"); toast.error(`${s.name} rejected`); }}>
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* View Applications */}
          <TabsContent value="applications" className="mt-6">
            <div className="space-y-4">
              <Select value={selectedPlacement} onValueChange={setSelectedPlacement}>
                <SelectTrigger className="max-w-sm">
                  <SelectValue placeholder="Select a placement to view applicants" />
                </SelectTrigger>
                <SelectContent>
                  {placements.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.companyName} — {p.role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedPlacement && (
                <Card className="glass-card">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>CGPA</TableHead>
                        <TableHead>Applied Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applicantsForPlacement.map((a) => (
                        <TableRow key={a.id}>
                          <TableCell className="font-medium">{a.student!.name}</TableCell>
                          <TableCell>{a.student!.department}</TableCell>
                          <TableCell>{a.student!.cgpa}</TableCell>
                          <TableCell>{a.appliedAt}</TableCell>
                        </TableRow>
                      ))}
                      {applicantsForPlacement.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                            No applications for this placement yet.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
