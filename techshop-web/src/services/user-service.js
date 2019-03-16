import { api } from './api'
import SecurityService from './security-service';

const UsersService = {

    listAllClients() {
        if (SecurityService.checkTokenValidityAndRefresh()) {
            return fetch(`${api}/users`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authData')).access_token,
                })
            })
                .then(response => response.json())
                .then(json => {
                    return json
                }).catch(error => {
                    return Promise.reject(Error(error.message))
                })
        }
    },

    getUserById(id) {

        if (SecurityService.checkTokenValidityAndRefresh()) {
            return fetch(`${api}/users/${id}`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authData')).access_token,
                })
            })
                .then(response => response.json())
                .then(json => {
                    return json
                }).catch(error => {
                    return error
                })
        }


    }

}

export default UsersService