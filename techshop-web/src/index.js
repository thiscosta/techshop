import React, { Component } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { LoginRoute } from './routes/login'
import { PrivateRoute } from './routes/private'

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers/rootReducer'
import rootSaga from './sagas/rootSaga'

import Login from "./views/Login/Login"
import Dashboard from './layouts/Dashboard/Dashboard'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <LoginRoute exact strict path="/login" name="Page 500" component={Login} />
        <PrivateRoute path="/" name="Home" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
