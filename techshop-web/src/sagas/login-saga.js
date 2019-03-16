import { takeEvery, call, put } from 'redux-saga/effects'

import {
    LOGIN, successLogin, failedLogin,
} from '../reducers/login-reducer'

import LoginService from '../services/login-service'
import UsersService from '../services/user-service'

//Sagas
//LOADS

function* login(action) {
    try {
        const result = yield call(LoginService.login, action.payload)

        if (result.hasOwnProperty('access_token')) {
            const loggedUser = yield call(UsersService.getUserById, result.user_id)
            yield put(successLogin({ authData: result, loggedUser: loggedUser }))
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
