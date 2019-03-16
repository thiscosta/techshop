import { api } from './api'

import SecurityService from './security-service'

const DashboardService = {

    async loadDashboardData() {
        if (SecurityService.checkTokenValidityAndRefresh()) {

            const dashboardData = {
                salesData: null,
                productsData: null,
                clientsData: null
            }

            await fetch(`${api}/sales`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authData')).access_token,
                })
            })
                .then(response => response.json())
                .then(json => {
                    dashboardData.salesData = json
                }).catch(error => {
                    return Promise.reject(Error(error.message))
                })

            await fetch(`${api}/products`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authData')).access_token,
                })
            })
                .then(response => response.json())
                .then(json => {
                    dashboardData.productsData = json
                }).catch(error => {
                    return Promise.reject(Error(error.message))
                })

            await fetch(`${api}/clients`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authData')).access_token,
                })
            })
                .then(response => response.json())
                .then(json => {
                    dashboardData.clientsData = json
                }).catch(error => {
                    return Promise.reject(Error(error.message))
                })

            return dashboardData
        }
    }

}

export default DashboardService