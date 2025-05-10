import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import {JSX} from "react";

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { accessToken } = useAuthStore();
    const isAuthenticated = !!accessToken;
    console.log('ProtectedRoute check:', { isAuthenticated, accessToken });
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;