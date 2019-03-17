const api = 'http://localhost:8080'

const SecurityService = {

    checkTokenValidity() {
        let authData = JSON.parse(localStorage.getItem('authData'))

        if (new Date(authData.grant_time + (authData.expires_in * 1000)).getTime() <= new Date().getTime()) {
            return false
        }

        return true

    },

    async refreshAccessToken() {
        let authData = JSON.parse(localStorage.getItem('authData'))

        const formData = new FormData()
        formData.append('grant_type', 'refresh_token')
        formData.append('refresh_token', authData.refresh_token)

        return fetch(`${api}/oauth/token`, {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Basic dGVjaHNob3Atd2ViLWFwcDp0ZWNoc2hvcC13ZWItc2VjcmV0',
            }),
            body: formData
        })
            .then(response => response.json())
            .then(json => {

                let authData = JSON.parse(localStorage.getItem('authData'))

                if (!json.hasOwnProperty('error')) {
                    if (new Date(authData.grant_time + (authData.expires_in * 1000)).getTime() <= new Date().getTime()) {
                        localStorage.setItem('authData', JSON.stringify(json))

                    }
                    return true
                }
                localStorage.removeItem('authData')
                return false
            }).catch(error => {
                localStorage.removeItem('authData')
                return false
            })

    },

    checkTokenValidityAndRefresh() {

        if (localStorage.getItem('authData') == null) {
            return false
        }

        if (!this.checkTokenValidity()) {
            if(!this.refreshAccessToken()) {
                return false
            }
        }
        return true
    }

}

export default SecurityService