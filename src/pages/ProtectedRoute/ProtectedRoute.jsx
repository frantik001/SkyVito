import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

export const ProtectedRoute = ({ redirectPath = "/" }) => {
  if (!localStorage.getItem("access_token")) {
    return <Navigate to={redirectPath} replace={true} />;
  }
  return <Outlet />;
};

ProtectedRoute.propTypes = {
  redirectPath: PropTypes.string,
};

export default ProtectedRoute;
