import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import LoginPage from "../../views/Login/Login";

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="wrapper">
                <LoginPage />
            </div>
        );
    }
}

export default Login;
