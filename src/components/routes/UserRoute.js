import React from 'react';
import { Route } from "react-router-dom";
import LoadingToRedirect from "./LoadingToRedirect";

const UserRoute = ({ userState, children, ...rest }) => {
    return userState && userState.token ? <Route {...rest}/> : <LoadingToRedirect />;
};

export default UserRoute;
