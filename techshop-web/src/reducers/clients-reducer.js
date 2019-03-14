import { defineAction } from 'redux-define'
import { createAction } from 'redux-actions'

export const LOAD_LIST_CLIENTS = defineAction('LOAD_LIST_CLIENTS', ['START', 'SUCCESS'], 'LOAD THE LIST OF CLIENTS')

export const startLoadListClients = createAction(LOAD_LIST_CLIENTS.START)
export const successLoadListClients = createAction(LOAD_LIST_CLIENTS.SUCCESS)

const initialState = {
    listClients: [
    ],
    contentIsReady: true
}

export default function clientsReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_LIST_CLIENTS.START:
            return {
                ...state,
                contentIsReady: false
            }
        case LOAD_LIST_CLIENTS.SUCCESS:
            return {
                ...state,
                listClients: action.payload.listClients,
                contentIsReady: false
            }
        default:
            return state
    }
}


