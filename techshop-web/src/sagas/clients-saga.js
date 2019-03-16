import { takeEvery, call, put } from 'redux-saga/effects'

import {
    LOAD_LIST_CLIENTS, startLoadListClients, successLoadListClients,
    DELETE_CLIENT, successDeleteClient,
    UPDATE_CLIENT, successUpdateClient
} from '../reducers/clients-reducer'

import ClientsService from '../services/clients-service'

import SagaDispatcher from './sagaDispatcher'

//Sagas
//LOADS
function* loadListClients() {
    try {
        const result = yield call(ClientsService.listAllClients)

        SagaDispatcher.sagaDispatch(result, successLoadListClients)

    }
    catch (error) {

    }
}

//UPDATE
function* updateClient(action) {
    try {
        const result = yield call(ClientsService.updateClient, action.payload.client)

        SagaDispatcher.sagaDispatch(result, successUpdateClient)

        yield call(startLoadListClients)

    }
    catch (error) {

    }
}

//DELETE
function* deleteClient(action) {
    try {
        const result = yield call(ClientsService.deleteClient, action.payload.client)

        SagaDispatcher.sagaDispatch(result, startLoadListClients)

    }
    catch (error) {

    }
}

export const sagasClients = [
    takeEvery(LOAD_LIST_CLIENTS.START, loadListClients),
    takeEvery(DELETE_CLIENT.START, deleteClient),
    takeEvery(UPDATE_CLIENT.START, updateClient)
]
