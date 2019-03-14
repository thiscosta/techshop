import React, { Component } from 'react'

//Redux and reducers
import { connect } from 'react-redux'
import { startLogin } from '../../reducers/login-reducer'

//React Bootstrap and Components
import { Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl, Button, Alert } from "react-bootstrap"
import { FormInputs } from '../../components/FormInputs/FormInputs.jsx'

//Assets
import logo from "../../assets/img/logo/logo.png";


class Login extends Component {

    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)

        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange(event) {
        if (event.target.type == 'email') {
            this.setState({ email: event.target.value })
        } else {
            this.setState({ password: event.target.value })
        }
    }

    handleClick = () => {
        if (this.state.email != null && this.state.password.length >= 2) {
            this.props.startLogin({ username: this.state.email, password: this.state.password })
            console.log('DISPAROU NA VIEW')
        }
        console.log('oi')
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.authData == null && this.props.authData != null){
            //redirecionar para o dashboard
            console.log('atualizou o props')
            this.props.history.push("/dashboard")
        }
    }

    render() {
        return (
            <Grid fluid>
                <Row className="justify-content-md-center align-content-md-center">
                    <Col
                        sm={12}
                        className="align-middle"
                        style={{
                            backgroundColor: '#444444', height: '100vh', justifyContent: 'center',
                            alignItems: 'center', alignContent: 'center'
                        }}
                    >
                        <Col sm={12} style={{ textAlign: 'center', alignSelf: 'center' }}>
                            <div className="logo">
                                <div className="logo-img">
                                    <img src={logo} alt="logo_image" />
                                </div>
                                <h1 style={{ color: 'white' }}>TECHSHOP</h1>
                            </div>
                        </Col>
                        <Col
                            sm={6}
                            smOffset={3}
                            style={{
                                textAlign: 'center', backgroundColor: 'white', padding: 40,
                                borderRadius: 10, alignSelf: 'center'
                            }}
                        >
                            <Form>
                                <h2>Entre ou cadastre-se</h2>

                                {!this.props.error ? <div></div> :
                                    <Alert variant='warning'>
                                        {this.props.error}
                                    </Alert>
                                }


                                <FormGroup style={{ marginTop: 50 }}>
                                    <ControlLabel>Usuário</ControlLabel>
                                    <FormControl type="email" value={this.state.email} onChange={this.handleChange.bind(this)} />
                                </FormGroup>

                                <FormGroup style={{ marginTop: 50 }}>
                                    <ControlLabel>Senha</ControlLabel>
                                    <FormControl type="password" value={this.state.password} onChange={this.handleChange.bind(this)} />
                                </FormGroup>

                                <Button
                                    style={{
                                        paddingLeft: 50, paddingRight: 50, paddingTop: 15, paddingBottom: 15,
                                        marginTop: 50
                                    }}
                                    variant="primary"
                                    disabled={!this.props.contentIsReady}
                                    onClick={this.props.contentIsReady ? this.handleClick : null}
                                >
                                    {!this.props.contentIsReady ? 'Entrando..' : 'Entrar'}
                                </Button>
                            </Form>
                        </Col>
                    </Col>
                </Row>
            </Grid>
        )
    }

}

const mapStateToProps = store => ({
    contentIsReady: store.login.contentIsReady,
    error: store.login.error,
    authData: store.login.authData
})

const mapDispatchToProps = {
    startLogin: startLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)