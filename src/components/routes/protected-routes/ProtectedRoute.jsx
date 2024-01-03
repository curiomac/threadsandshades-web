import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { LOGIN_PAGE } from '../../../helpers/route-paths/paths';

const ProtectedRoute = ({ role, children }) => {

  const { isAuthenticated } = useSelector(state => state.authState);

  if (!isAuthenticated) {
    return <Navigate to={LOGIN_PAGE} />
  }
  if (isAuthenticated) {
    return children;
  }
}

export default ProtectedRoute;