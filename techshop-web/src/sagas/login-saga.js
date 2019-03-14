import { takeEvery, all, call, put, actionChannel } from 'redux-saga/effects'

import {
    LOGIN, successLogin, failedLogin,
} from '../reducers/login-reducer'

import LoginService from '../services/login-service'
//Sagas
//LOADS

function* login(action) {
    try {
        const result = yield call(LoginService.login, action.payload)
        if (!result.hasOwnProperty('error')) {
            yield put(successLogin({ authData: result }))
        }
        else {
            yield put(failedLogin({ error: result }))
        }

    }
    catch (error) {
        yield put(failedLogin())
    }
}

export const sagasLogin = [
    takeEvery(LOGIN.START, login),
]
