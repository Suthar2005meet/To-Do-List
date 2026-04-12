import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Login } from "../Component/Common/Login";
import { Register } from "../Component/Common/Register";
import Dashboard from "../Component/User/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "../Context/AuthContext";

const router = createBrowserRouter([
    // Public Routes
    { path: "/", element: <Login /> },
    { path: "/register", element: <Register /> },
    
    // Protected Routes
    {
        element: <ProtectedRoute />,
        children: [
            { path: "/dashboard", element: <Dashboard /> }
        ]
    },

    // Catch-all/Default
    { path: "*", element: <Navigate to="/" replace /> }
]);

const AppRouter = () => {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
};

export default AppRouter;
