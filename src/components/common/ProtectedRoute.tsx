import {Navigate, Outlet} from "react-router-dom";
import {useAppSelector} from '../../app/store';

const ProtectedRoute = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;