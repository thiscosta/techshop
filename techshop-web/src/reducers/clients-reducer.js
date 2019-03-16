import { defineAction } from 'redux-define'
import { createAction } from 'redux-actions'

export const LOAD_LIST_CLIENTS = defineAction('LOAD_LIST_CLIENTS', ['START', 'SUCCESS'], 'LOAD THE LIST OF CLIENTS')

export const DELETE_CLIENT = defineAction('DELETE_CLIENT', ['START', 'SUCCESS'], 'DELETE THE CLIENT')

export const UPDATE_CLIENT = defineAction('UPDATE_CLIENT', ['START', 'SUCCESS'], 'UPDATE THE CLIENT')

export const startLoadListClients = createAction(LOAD_LIST_CLIENTS.START)
export const successLoadListClients = createAction(LOAD_LIST_CLIENTS.SUCCESS)

export const startDeleteClient = createAction(DELETE_CLIENT.START)
export const successDeleteClient = createAction(DELETE_CLIENT.SUCCESS)

export const startUpdateClient = createAction(UPDATE_CLIENT.START)
export const successUpdateClient = createAction(UPDATE_CLIENT.SUCCESS)

const initialState = {
    listClients: [],
    contentIsReady: true
}

export default function clientsReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_LIST_CLIENTS.START:
        case DELETE_CLIENT.START:
        case UPDATE_CLIENT.START:
            return {
                ...state,
                contentIsReady: false
            }
        case LOAD_LIST_CLIENTS.SUCCESS:
            return {
                ...state,
                listClients: action.payload.parameters,
                contentIsReady: true
            }
        case DELETE_CLIENT.SUCCESS:
            return {
                ...state,
                contentIsReady: true
            }
        case UPDATE_CLIENT.SUCCESS:
            return {
                ...state,
                contentIsReady: true
            }
        default:
            return state
    }
}


