import { Navigate, useLocation } from "react-router";
import { useGlobalStore } from "../../store/useStore";

const PublicRoute = ({ children }) => {
    const { user } = useGlobalStore();
    const location = useLocation();

    // Allow access to trip planner and trip results for all users
    if (location.pathname === "/trip-planner" || location.pathname === "/trip-results") {
        return children;
    }

    // For other public routes, redirect logged-in users to feed
    if (user) {
        return (
            <Navigate
                to="/feed"
                replace
            />
        );
    }

    return children;
};

export default PublicRoute;
