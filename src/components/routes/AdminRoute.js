import React, { useEffect, useState } from 'react';
import { Route } from "react-router-dom";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../functions/user";

const AdminRoute = ({ userState, children, ...rest }) => {
    const [ok, setOk] = useState(false);

    useEffect(() => {
        if (userState && userState.token) {
            currentAdmin(userState.token)
                .then((res) => {
                    console.log("CURRENT ADMIN RES", res);
                    setOk(true);
                })
                .catch((err) => {
                    console.log("ADMIN ROUTE ERR", err);
                    setOk(false);
                });
        }
    }, [userState]);

    return ok ? <Route {...rest} /> : <LoadingToRedirect />
};

export default AdminRoute;