import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  LogOut,
  GraduationCap,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const studentNav = [
  { label: "Dashboard", to: "/student", icon: LayoutDashboard },
  { label: "Placements", to: "/student/placements", icon: Briefcase },
  { label: "My Applications", to: "/student/applications", icon: FileText },
];

const adminNav = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { label: "Add Placement", to: "/admin/add-placement", icon: PlusCircle },
  { label: "Manage Students", to: "/admin/students", icon: Users },
  { label: "Applications", to: "/admin/applications", icon: FileText },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = user?.role === "admin" ? adminNav : studentNav;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card/50 backdrop-blur-xl flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="font-bold text-lg">CGPU</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                location.pathname === item.to
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="mb-3 px-4">
            <p className="text-sm font-medium truncate">
              {user?.role === "admin" ? "Admin" : user?.student?.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.role === "admin" ? "admin@cgpu.edu" : user?.student?.email}
            </p>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
