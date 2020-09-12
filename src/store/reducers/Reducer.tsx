import { combineReducers } from "redux";


const messageReducer = (state = [], action: any) => {
    switch (action.type) {
        case 'POPULATE_MESSAGE':
            return { ...state, ...action.payload }
        case 'RESET_DATA':
            return state = []
        default:
            return state
    }
}

const loginReducer = (state = [], action: any) => {
    switch (action.type) {
        case 'SET_LOGIN':
            return { ...state, ...action.payload }
        case 'RESET_DATA':
            return state = []
        default:
            return state
    }
}

// const registrationReducer = (state = [], action) => {
//     switch (action.type) {
//         case 'GET_TOKEN':
//             return { ...state, ...action.payload }
//         case 'SET_REGISTER':
//             return { ...state, ...action.payload }
//         case 'SET_OTP':
//             return { ...state, ...action.payload }
//         case 'RESET_OTP':
//             return { ...state, c1: undefined, c2: undefined, c3: undefined, c4: undefined, }
//         case 'VERIFY_OTP':
//             return { ...state, ...action.payload }
//         case 'REGISTRATION_RESET':
//             return state = []
//         default:
//             return state
//     }
// }

// const companyInformationReducer = (state = [], action) => {
//     switch (action.type) {
//         case 'SET_COMPANY_INFO':
//             return { ...state, ...action.payload }
//         case 'SET_CONTACT_PERSON':
//             return { ...state, ...action.payload }
//         case 'SET_DETAIL_CONNECT':
//             return { ...state, ...action.payload }
//         case 'SET_DECLARE_SIGN':
//             return { ...state, ...action.payload }
//         case 'COMPANY_INFO_RESET':
//             return state = []
//         default:
//             return state
//     }
// }

// const dataReducer = (state = [], action) => {
//     switch (action.type) {
//         case 'GET_DATA':
//             return { ...state, ...action.payload }
//         case 'RESET_DATA':
//             return state = []
//         default:
//             return state
//     }
// }

// const orderReducer = (state = [], action) => {
//     switch (action.type) {
//         case 'SET_NEW_ORDER':
//             return { ...state, ...action.payload }

//         default:
//             return state
//     }
// }



const appReducer = combineReducers({ messageReducer,loginReducer });

const rootReducer = (state:any, action:any) => {
    switch (action.type) {
        case 'ROOT_LOG_OUT':
            return { state: undefined }
        default:
            return appReducer(state, action)
    }
}

export default rootReducer