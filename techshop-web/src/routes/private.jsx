import React from 'react'

import { Route, Redirect } from "react-router-dom";
import SecurityService from '../services/security-service';

export function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                SecurityService.checkTokenValidityAndRefresh() ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    );
}