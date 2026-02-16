import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types";

interface Props {
  children: React.ReactNode;
  role: UserRole;
}

const ProtectedRoute = ({ children, role }: Props) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
