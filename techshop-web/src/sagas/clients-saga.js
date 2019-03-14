import { takeEvery, all, call, put, actionChannel } from 'redux-saga/effects'

import {
    LOAD_LIST_CLIENTS, successLoadListClients,
} from '../reducers/clients-reducer'

import ClientsService from '../services/clients-service'
//Sagas
//LOADS
function* loadListClients() {
    try {
        const result = yield call(ClientsService.listAllClients)
        console.log('result')
        console.log(result)
        yield put(successLoadListClients({ listClients: result }))
    }
    catch (error) {

    }
}

export const sagasClients = [
    takeEvery(LOAD_LIST_CLIENTS.START, loadListClients),
]
