const api = 'http://localhost:8080'

const LoginService = {

    login(user) {

        const formData = new FormData()
        formData.append('grant_type', 'password')
        formData.append('username', user.username)
        formData.append('password', user.password)

        return fetch(`${api}/oauth/token`, {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Basic dGVjaHNob3Atd2ViLWFwcDp0ZWNoc2hvcC13ZWItc2VjcmV0',
            }),
            body: formData
        })
            .then(response => response.json())
            .then(json => {
                return json
            }).catch(error => {
                return Promise.reject(Error(error.message))
            })
    }

}

export default LoginService