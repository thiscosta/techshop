import { all } from 'redux-saga/effects'
import { sagasClients } from './clients-saga'
import { sagasLogin } from './login-saga'
import { sagasDashboard } from './dashboard-saga'

export default function* rootSaga() {
    yield all([
        ...sagasClients,
        ...sagasLogin,
        ...sagasDashboard
    ])
}
