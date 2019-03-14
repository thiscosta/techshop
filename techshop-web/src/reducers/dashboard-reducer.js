import { defineAction } from 'redux-define'
import { createAction } from 'redux-actions'

export const LOAD_DASHBOARD_DATA = defineAction('LOAD_DASHBOARD_DATA', ['START', 'SUCCESS'], 'LOAD THE DASHBOARD DATA')

export const startLoadDashboardData = createAction(LOAD_DASHBOARD_DATA.START)
export const successLoadDashboardData = createAction(LOAD_DASHBOARD_DATA.SUCCESS)

const initialState = {
    dashboardData: [
    ],
    contentIsReady: true
}

export default function dashboardReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_DASHBOARD_DATA.START:
            return {
                ...state,
                contentIsReady: false
            }
        case LOAD_DASHBOARD_DATA.SUCCESS:
            return {
                ...state,
                dashboardData: action.payload.dashboardData,
                contentIsReady: false
            }
        default:
            return state
    }
}


