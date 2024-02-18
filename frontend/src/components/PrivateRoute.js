import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, authenticated, ...props }) => {
    return authenticated ? (
        <Route {...props} element={element} />
    ) : (
        <Navigate to="/login" />
    );
};

export default PrivateRoute;
