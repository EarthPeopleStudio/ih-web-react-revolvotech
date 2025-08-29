import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../../views/spinner/Spinner';

const RootRedirect = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboards/modern" replace />;
  }

  return <Navigate to="/auth/login" replace />;
};

export default RootRedirect;