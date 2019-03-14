import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";
import { connect } from "react-redux";

import { startLoadDashboardData } from '../../reducers/dashboard-reducer'

class Dashboard extends Component {
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  componentDidMount() {
    this.props.startLoadDashboardData()
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-calculator text-success" />}
                statsText="Vendas no mês"
                statsValue={this.props.dashboardData.monthSales ? this.props.dashboardData.monthSales.length : 0}
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                statsText="Lucro"
                statsValue={'R$' + (this.props.dashboardData.revenue > 0 ? this.props.dashboardData.revenue : 0)}
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-box2 text-danger" />}
                statsText="Produtos"
                statsValue={this.props.dashboardData.products ? this.props.dashboardData.products.length : 0}
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-users text-info" />}
                statsText="Clientes"
                statsValue={this.props.dashboardData.clients ? this.props.dashboardData.clients.length : 0}
              />
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <Card
                id="chartHours"
                title="Vendas no ano"
                category="Por mês"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={this.props.dashboardData.salesByMonth}
                      type="Line"
                      options={this.props.dashboardData ? this.props.dashboardData.salesByMonthOptions : optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendSales)}</div>
                }
              />
            </Col>
            <Col md={4}>
              <Card
                title="Vendas por região"
                category="Porcentagem de vendas por região"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={this.props.dashboardData ? this.props.dashboardData.salesByRegion : [] } type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendPie)}</div>
                }
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card
                id="chartActivity"
                title="Vendas por cliente no ano"
                category="Número de vendas por cada cliente no ano"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataBar}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendBar)}</div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  contentIsReady: store.login.contentIsReady,
  dashboardData: store.dashboard.dashboardData
})

const mapDispatchToProps = {
  startLoadDashboardData: startLoadDashboardData
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)