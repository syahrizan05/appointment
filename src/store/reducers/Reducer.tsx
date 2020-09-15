//import { combineReducers } from "redux";
import { combineReducers } from "redux";

const apiReducer = (state: any = [], action: any) => {
    switch (action.type) {
        case 'SET_API_AUTH':
            return { ...state, ...action.payload }
        case 'API_RESET':
            return state = []
        default:
            return state
    }
}

const serviceListReducer = (state: any = [], action: any) => {
    switch (action.type) {
        case 'GET_SERVICES':
            return { ...state, ...action.payload }
        case 'SERVICES_RESET':
            return state = []
        default:
            return state
    }
}

const slotListReducer = (state: any = [], action: any) => {
    switch (action.type) {
        case 'GET_SLOTS':
            return { ...state, ...action.payload }
        case 'SLOTS_RESET':
            return state = []
        default:
            return state
    }
}

const taskListReducer = (state: any = [], action: any) => {
    switch (action.type) {
        case 'GET_TASKS':
            return { ...state, ...action.payload }
        case 'TASKS_RESET':
            return state = []
        default:
            return state
    }
}

const customerListReducer = (state: any = [], action: any) => {
    switch (action.type) {
        case 'GET_CUSTOMERS':
            return { ...state, ...action.payload }
        case 'CUSTOMERS_RESET':
            return state = []
        default:
            return state
    }
}




const appReducer = combineReducers({ apiReducer,serviceListReducer,slotListReducer,taskListReducer,customerListReducer });

const rootReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'ROOT_LOG_OUT':
            return { state: undefined }
        default:
            return appReducer(state, action)
    }
}

export default rootReducer