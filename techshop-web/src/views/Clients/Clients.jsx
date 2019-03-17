import React, { Component } from "react"
import { Grid, Row, Col, Table, ButtonToolbar, Modal, Form } from "react-bootstrap"
import { FormInputs } from '../../components/FormInputs/FormInputs'
import Button from '../../components/CustomButton/CustomButton';

import Card from "components/Card/Card.jsx"

import { connect } from 'react-redux'

import { startLoadListClients, startDeleteClient, startUpdateClient } from '../../reducers/clients-reducer'

class Clients extends Component {

    constructor(props) {
        super(props)

        this.changeDeleteModalVisibility = this.changeDeleteModalVisibility.bind(this)
        this.changeUpdateModalVisibility = this.changeUpdateModalVisibility.bind(this)
        this.handleUpdateChange = this.handleUpdateChange.bind(this)

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

    async handleUpdateChange(event) {
        let client = JSON.parse(JSON.stringify(this.state.clientToUpdate))
        switch (event.target.placeholder) {
            case 'Nome do cliente':
                client.name = event.target.value
                await this.setState({ clientToUpdate: client })
                break
            case 'Crédito':
                client.credit = event.target.value
                await this.setState({ clientToUpdate: client })
                break
            case 'Rua':
                client.address.street = event.target.value
                await this.setState({ clientToUpdate: client })
                break
            case 'Número':
                client.address.number = event.target.value
                await this.setState({ clientToUpdate: client })
                break
            case 'Bairro':
                client.address.neighborhood = event.target.value
                await this.setState({ clientToUpdate: client })
                break
            case 'Cidade':
                client.address.street = event.target.value
                await this.setState({ clientToUpdate: client })
                break
            case 'Estado':
                client.address.state = event.target.value
                await this.setState({ clientToUpdate: client })
                break
            case 'País':
                client.address.country = event.target.value
                await this.setState({ clientToUpdate: client })
                break
            case 'CEP':
                client.address.zipCode = event.target.value
                await this.setState({ clientToUpdate: client })
                break
        }
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
                        <Form>
                            <FormInputs
                                ncols={["col-md-6", "col-md-6"]}
                                proprieties={[
                                    {
                                        label: "Nome do cliente",
                                        type: "text",
                                        bsClass: "form-control",
                                        placeholder: "Nome do cliente",
                                        value: this.state.clientToUpdate ? this.state.clientToUpdate.name : '',
                                        onChange: this.handleUpdateChange.bind(this)
                                    },
                                    {
                                        label: "Crédito",
                                        type: "double",
                                        bsClass: "form-control",
                                        placeholder: "Crédito",
                                        value: this.state.clientToUpdate ? this.state.clientToUpdate.credit : 0,
                                        onChange: this.handleUpdateChange.bind(this)
                                    },
                                ]}
                            />
                            <FormInputs
                                ncols={["col-md-10", "col-md-2"]}
                                proprieties={[
                                    {
                                        label: "Rua",
                                        type: "text",
                                        bsClass: "form-control",
                                        placeholder: "Rua",
                                        value: this.state.clientToUpdate ? this.state.clientToUpdate.address.street : '',
                                        onChange: this.handleUpdateChange.bind(this)
                                    },
                                    {
                                        label: "Número",
                                        type: "text",
                                        bsClass: "form-control",
                                        placeholder: "Número",
                                        value: this.state.clientToUpdate ? this.state.clientToUpdate.address.number : '',
                                        onChange: this.handleUpdateChange.bind(this)
                                    }
                                ]}
                            />
                            <FormInputs
                                ncols={["col-md-4", "col-md-4", "col-md-4"]}
                                proprieties={[
                                    {
                                        label: "Bairro",
                                        type: "text",
                                        bsClass: "form-control",
                                        placeholder: "Bairro",
                                        value: this.state.clientToUpdate ? this.state.clientToUpdate.address.neighborhood : '',
                                        onChange: this.handleUpdateChange.bind(this)
                                    },
                                    {
                                        label: "Cidade",
                                        type: "text",
                                        bsClass: "form-control",
                                        placeholder: "Cidade",
                                        value: this.state.clientToUpdate ? this.state.clientToUpdate.address.city : '',
                                        onChange: this.handleUpdateChange.bind(this)
                                    },
                                    {
                                        label: "Estado",
                                        type: "text",
                                        bsClass: "form-control",
                                        placeholder: "Estado",
                                        value: this.state.clientToUpdate ? this.state.clientToUpdate.address.state : '',
                                        onChange: this.handleUpdateChange.bind(this)
                                    }
                                ]}
                            />
                            <FormInputs
                                ncols={["col-md-6", "col-md-6"]}
                                proprieties={[
                                    {
                                        label: "País",
                                        type: "text",
                                        bsClass: "form-control",
                                        placeholder: "País",
                                        value: this.state.clientToUpdate ? this.state.clientToUpdate.address.country : '',
                                        onChange: this.handleUpdateChange.bind(this)
                                    },
                                    {
                                        label: "CEP",
                                        type: "text",
                                        bsClass: "form-control",
                                        placeholder: "CEP",
                                        value: this.state.clientToUpdate ? this.state.clientToUpdate.address.zipCode : '',
                                        onChange: this.handleUpdateChange.bind(this)
                                    }
                                ]}
                            />
                        </Form>
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