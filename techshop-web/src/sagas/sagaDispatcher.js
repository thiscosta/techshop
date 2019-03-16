import { store } from '../index'


const SagaDispatcher = {

    sagaDispatch(result, action) {
        if (!result.hasOwnProperty('error')) {
            store.dispatch(action({ parameters: result }))
            return
        }

        console.log('erro no sagaDisptach: ')
        console.log(result)
        if(result.error == 'invalid_token'){
            localStorage.removeItem('authData')
            window.location = '/login'
        }
    }

}

export default SagaDispatcher