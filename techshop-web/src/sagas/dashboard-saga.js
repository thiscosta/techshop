import { takeEvery, all, call, put, actionChannel } from 'redux-saga/effects'

import {
    LOAD_DASHBOARD_DATA, successLoadDashboardData,
} from '../reducers/dashboard-reducer'

import DashboardService from '../services/dashboard-service'
//Sagas
//LOADS
function* loadDashboardData() {
    try {
        const result = yield call(DashboardService.loadDashboardData)

        let monthSales = []
        let revenue = null
        let salesByRegion = {
            north: 0,
            northeast: 0,
            midwest: 0,
            southeast: 0,
            south: 0
        }


        var salesByMonth = {
            labels: [
                "Jan",
                "Fev",
                "Mar",
                "Abr",
                "Mai",
                "Jun",
                "Jul",
                "Ago",
                "Set",
                "Out",
                "Nov",
                "Dez"
            ],
            series: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ]
        };


        result.salesData.forEach(sale => {

            if (new Date(sale.date).getMonth() == new Date().getMonth()) {
                monthSales.push(sale)
            }

            revenue += sale.price - sale.shipping

            switch (new Date(sale.date)) {
                case 0:

            }

            salesByMonth.series[0][new Date(sale.date).getMonth()] = salesByMonth.series[0][new Date(sale.date).getMonth()] + 1

            switch (sale.client.address.state) {
                case 'Amazonas':
                case 'Roraima':
                case 'Amapá':
                case 'Pará':
                case 'Tocantins':
                case 'Rondônia':
                case 'Acre':
                    salesByRegion.north++
                    break

                case 'Maranhão':
                case 'Piauí':
                case 'Ceará':
                case 'Rio Grande do Norte':
                case 'Pernambuco':
                case 'Paraíba':
                case 'Sergipe':
                case 'Alagoas':
                case 'Bahia':
                    salesByRegion.northeast++
                    break

                case 'Mato Grosso':
                case 'Mato Grosso do Sul':
                case 'Goiás':
                    salesByRegion.midwest++
                    break

                case 'São Paulo':
                case 'Rio de Janeiro':
                case 'Espírito Santo':
                case 'Minas Gerais':
                    salesByRegion.southeast++
                    break

                case 'Rio Grande do Sul':
                case 'Paraná':
                case 'Santa Catarina':
                    salesByRegion.south++
                    break

                default:
                    break
            }

        });


        let salesByRegionData = {
            labels: [],
            series: []
        };


        if (salesByRegion.south > 0) {
            salesByRegionData.labels.push(((salesByRegion.south / result.salesData.length) * 100).toFixed(2) + '%')
            salesByRegionData.series.push(salesByRegion.south)
        }


        if (salesByRegion.southeast > 0) {
            salesByRegionData.labels.push(((salesByRegion.southeast / result.salesData.length) * 100).toFixed(2) + '%')
            salesByRegionData.series.push(salesByRegion.southeast)
        }

        if (salesByRegion.midwest > 0) {
            salesByRegionData.labels.push(((salesByRegion.midwest / result.salesData.length) * 100).toFixed(2) + '%')
            salesByRegionData.series.push(salesByRegion.midwest)
        }

        if (salesByRegion.northeast > 0) {
            salesByRegionData.labels.push(((salesByRegion.northeast / result.salesData.length) * 100).toFixed(2) + '%')
            salesByRegionData.series.push(salesByRegion.northeast)
        }


        if (salesByRegion.north > 0) {
            salesByRegionData.labels.push(((salesByRegion.north / result.salesData.length) * 100).toFixed(2) + '%')
            salesByRegionData.series.push(salesByRegion.north)
        }


        console.log('salesByRegion: ')
        console.log(salesByRegionData)


        var salesByMonthOptions = {
            low: 0,
            high: Math.max(...salesByMonth.series[0]) * 5 ,
            showArea: false,
            height: "245px",
            axisX: {
                showGrid: false
            },
            lineSmooth: true,
            showLine: true,
            showPoint: true,
            fullWidth: true,
            chartPadding: {
                right: 50
            }
        };

        console.log('salesByMonth: ')
        console.log(salesByMonth)

        let dashboardFormattedData = {
            monthSales: monthSales,
            revenue: revenue,
            products: result.productsData,
            clients: result.clientsData,
            salesByRegion: salesByRegionData,
            salesByMonth: salesByMonth,
            salesByMonthOptions: salesByMonthOptions
        }

        yield put(successLoadDashboardData({ dashboardData: dashboardFormattedData }))
    }
    catch (error) {

    }
}

export const sagasDashboard = [
    takeEvery(LOAD_DASHBOARD_DATA.START, loadDashboardData),
]
