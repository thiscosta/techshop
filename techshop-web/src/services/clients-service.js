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
                    return { error: 'Could not delete client' }
                })
        }
    },

    updateClient(client) {
        if (SecurityService.checkTokenValidityAndRefresh()) {
            try {

                return fetch(`${api}/clients/${client.id}`, {
                    method: 'PATCH',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authData')).access_token,
                        'Content-Type' : 'application/json'
                    }),
                    body: JSON.stringify(client)
                })
                    .then(response => {
                        response.json()
                    })
                    .then(json => {
                        return json
                    }).catch(error => {
                        return error
                    })
            } catch (error) {
            }
        }

    }

}

export default ClientsService