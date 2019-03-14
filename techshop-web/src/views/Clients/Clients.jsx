import React, { Component } from "react"
import { Grid, Row, Col, Table } from "react-bootstrap"

import Card from "components/Card/Card.jsx"
import { thArray, tdArray } from "variables/Variables.jsx"

import { connect } from 'react-redux'

import { startLoadListClients } from '../../reducers/clients-reducer'

class Clients extends Component {

    componentDidMount() {
        this.props.startLoadListClients()
    }

    render() {
        return (
            <div className="content">
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
    startLoadListClients: startLoadListClients
}

export default connect(mapStateToProps, mapDispatchToProps)(Clients)