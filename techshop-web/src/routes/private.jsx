import React, { Component } from 'react'

import { Route, Redirect } from "react-router-dom";

export function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                localStorage.getItem('authData') != null ? (
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