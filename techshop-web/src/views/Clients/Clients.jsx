import React, { Component } from "react"
import { Grid, Row, Col, Table, ButtonToolbar, Modal } from "react-bootstrap"
import Button from '../../components/CustomButton/CustomButton';

import Card from "components/Card/Card.jsx"

import { connect } from 'react-redux'

import { startLoadListClients, startDeleteClient, startUpdateClient } from '../../reducers/clients-reducer'

class Clients extends Component {

    constructor(props) {
        super(props)

        this.changeDeleteModalVisibility = this.changeDeleteModalVisibility.bind(this)
        this.changeUpdateModalVisibility = this.changeUpdateModalVisibility.bind(this)

        this.state = {
            deleteShow: false,
            updateShow: false,
            clientToDelete: null,
            clientToUpdate: null
        }
    }

    componentDidMount() {
        this.props.startLoadListClients()
    }

    async showDeleteModalConfirmation(client) {
        await this.setState({ clientToDelete: client })
        this.changeDeleteModalVisibility()
    }

    changeDeleteModalVisibility() {
        this.setState({ deleteShow: !this.state.deleteShow })
    }

    changeUpdateModalVisibility() {
        this.setState({ updateShow: !this.state.updateShow })
    }

    render() {
        return (
            <div className="content">


                <Modal show={this.state.deleteShow} onHide={this.changeDeleteModalVisibility}>
                    <Modal.Header closeButton>
                        <Modal.Title>Exclusão de cliente</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Deseja realmente excluir o cliente <b>{this.state.clientToDelete ? this.state.clientToDelete.name : ''}</b>?</Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="default" size="lg" onClick={this.changeDeleteModalVisibility}>
                            Cancelar
                            </Button>
                        <Button bsStyle="danger" size="lg" onClick={() => {
                            this.props.startDeleteClient({ client: this.state.clientToDelete })
                            this.changeDeleteModalVisibility()
                        }}>
                            Excluir
                            </Button>
                    </Modal.Footer>
                </Modal>


                <Modal show={this.state.updateShow} onHide={this.changeUpdateModalVisibility}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edição: {this.state.clientToUpdate ? this.state.clientToUpdate.name : ''}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Deseja realmente editar o cliente <b>{this.state.clientToDelete ? this.state.clientToDelete.name : ''}</b>?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="default" size="lg" onClick={this.changeUpdateModalVisibility}>
                            Cancelar
                            </Button>
                        <Button bsStyle="danger" size="lg" onClick={() => {
                            this.props.startUpdateClient({ client: this.state.clientToUpdate })
                            this.changeUpdateModalVisibility()
                        }}>
                            Salvar
                            </Button>
                    </Modal.Footer>
                </Modal>


                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Lista de clientes"
                                category="Clientes TechShop"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <Table striped hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Nome</th>
                                                <th>Crédito</th>
                                                <th>Cidade</th>
                                                <th>Estado</th>
                                                <th>CEP</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.listClients.map((prop, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td>{prop.id}</td>
                                                        <td>{prop.name}</td>
                                                        <td>{prop.credit}</td>
                                                        <td>{prop.address.city}</td>
                                                        <td>{prop.address.state}</td>
                                                        <td>{prop.address.zipCode}</td>
                                                        <td>
                                                            <ButtonToolbar>
                                                                <Button bsStyle="primary" size="lg" onClick={async () => {
                                                                    await this.setState({ clientToUpdate: prop })
                                                                    this.changeUpdateModalVisibility()
                                                                }}>
                                                                    Editar
                                                                    </Button>
                                                                <Button bsStyle="danger" size="lg" onClick={() => {
                                                                    this.showDeleteModalConfirmation(prop)
                                                                }}>
                                                                    Remover
                                                                </Button>
                                                            </ButtonToolbar>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                }
                            />
                        </Col>

                    </Row>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = store => ({
    listClients: store.clients.listClients
})

const mapDispatchToProps = {
    startLoadListClients: startLoadListClients,
    startDeleteClient: startDeleteClient,
    startUpdateClient: startUpdateClient
}

export default connect(mapStateToProps, mapDispatchToProps)(Clients)