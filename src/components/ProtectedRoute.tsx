import { Navigate } from 'react-router';
import {JSX} from "react";

interface ProtectedRouteProps {
    children: JSX.Element;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('token');
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};
export default ProtectedRoute;