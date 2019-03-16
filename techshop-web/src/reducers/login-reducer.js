import { defineAction } from 'redux-define'
import { createAction } from 'redux-actions'

export const LOGIN = defineAction('LOGIN', ['START', 'SUCCESS', 'FAILED'], 'TRY TO LOGIN')

export const startLogin = createAction(LOGIN.START)
export const successLogin = createAction(LOGIN.SUCCESS)
export const failedLogin = createAction(LOGIN.FAILED)

const initialState = {
    contentIsReady: true,
    error: null,
    authData: null,
    loggedUser: null
}

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN.START:
            return {
                ...state,
                contentIsReady: false,
                error: null,
                erroMsg: ''
            }
        case LOGIN.SUCCESS:
            return {
                ...state,
                contentIsReady: true,
                error: null,
                authData: action.payload.authData,
                loggedUser: action.payload.loggedUser
            }
        case LOGIN.FAILED:
            let erroMsg

            switch (action.payload.error.error_description) {
                case 'Bad credentials':
                    erroMsg = 'Usuário e/ou senha inválidos'
                    break
                default:
                    erroMsg = 'Erro ao realizar login. Por favor, tente novamente'
            }
            return {
                ...state,
                contentIsReady: true,
                error: erroMsg
            }
        default:
            return state
    }
}


