import clients from './clients-reducer'
import login from './login-reducer'
import dashboard from './dashboard-reducer'

import { combineReducers } from 'redux'

export default combineReducers({ 
    clients: clients,
    login: login,
    dashboard: dashboard
})
