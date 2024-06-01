import { Navigate } from "react-router-dom";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const { isAuth } = useGetUserInfo();

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
