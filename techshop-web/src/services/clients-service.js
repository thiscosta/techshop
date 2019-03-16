import { api } from './api'

import SecurityService from './security-service'

const ClientsService = {

    listAllClients() {
        if (SecurityService.checkTokenValidityAndRefresh()) {
            return fetch(`${api}/clients`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authData')).access_token,
                })
            })
                .then(response => response.json())
                .then(json => {
                    return json
                }).catch(error => {
                    console.log(error)
                    return error
                })
        }
    },

    deleteClient(client) {
        if (SecurityService.checkTokenValidityAndRefresh()) {
            return fetch(`${api}/clients/${client.id}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authData')).access_token,
                })
            })
                .catch(error => {
                    console.log(error)
                    return { error: 'Could not delete client' }
                })
        }
    },

    updateClient(client) {
        if (SecurityService.checkTokenValidityAndRefresh()) {

            const formData = new FormData()
            formData.append(client)

            return fetch(`${api}/clients/${client.id}`, {
                method: 'PATCH',
                headers: new Headers({
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authData')).access_token,
                }),
                body: formData
            })
                .then(response => response.json())
                .then(json => {
                    return json
                }).catch(error => {
                    console.log(error)
                    return error
                })
        }
    }

}

export default ClientsService