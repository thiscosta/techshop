import { api } from './api'

const ClientsService = {

    listAllClients() {
        return fetch(`${api}/clients`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('authData')).access_token,
            })
        })
            .then(response => response.json())
            .then(json => {
                return json
            }).catch(error => {
                return Promise.reject(Error(error.message))
            })
    }

}

export default ClientsService