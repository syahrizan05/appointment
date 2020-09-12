import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'
import * as SecureStore from 'expo-secure-store'

// import Amplify, { Auth,Storage } from 'aws-amplify';
// import aws_exports from '../../aws-exports';
// Amplify.configure(aws_exports);///

import moment from 'moment'

// import Amplify, { Auth, Storage } from 'aws-amplify';
// import aws_exports from '../../aws-exports';
// import { sendNotification } from './action';
// Amplify.configure(aws_exports);///

const apiUrl = 'https://tuah.niyo.my/'





////////////////////////////////////////////////////////////////////////////
//////////INI YANG LAMA PUNYA//////////////////////////////////////////////

export const newsApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    fetch(`${apiUrl}api/news/view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const newsArray = await responseJson.data
        await console.log(`NEWS API  ${JSON.stringify(newsArray)}`)

        await dispatch({ type: 'SET_NEWS', payload: { newsArray } })
      })
      .catch((error) => {
        console.log('Error News Api : ' + error);
      });
  }
}

export const eventApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    fetch(`${apiUrl}api/events/view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const eventArray = await responseJson.data
        await console.log(`EVENT API  ${JSON.stringify(eventArray)}`)

        await dispatch({ type: 'SET_EVENT', payload: { eventArray } })
      })
      .catch((error) => {
        console.log('Error Event Api : ' + error);
      });
  }
}

export const retrieveMerchantInfoApi = () => {
  return async (dispatch, getState) => {

    //const personalToken = await AsyncStorage.getItem('personalToken');
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/setup/merchant`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const merchantInfo = responseJson.data
        console.log('Success' + JSON.stringify(responseJson))
        dispatch({ type: 'SET_MERCHANT', payload: { ...merchantInfo } })

      })
      .catch((error) => {
        console.log('Error initiating merchant info : ' + error);
      });
  }
}


export const checkDeclareApi = () => {
  return async (dispatch, getState) => {

    //const personalToken = await AsyncStorage.getItem('personalToken');
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/setup/business_declaration`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const test = responseJson.data
        const lastTest = test.slice(-1).pop()
        const isDeclaration_one = lastTest.isDeclaration_one
        console.log(`declaration paling last ialah ${isDeclaration_one}`)

        // const {isDeclaration_one} = responseJson.data[0]
        // console.log('Success business_declaration : ' + JSON.stringify(isDeclaration_one))
        dispatch({ type: 'SET_MERCHANT', payload: { isDeclaration_one } })

      })
      .catch((error) => {
        console.log('Error initiating merchant info : ' + error);
        dispatch({ type: 'SET_MERCHANT', payload: { isDeclaration_one: 0 } })
      });
  }
}

export const checkDocumentApi = () => {
  return async (dispatch, getState) => {

    //const personalToken = await AsyncStorage.getItem('personalToken');
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/setup/business_document`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const test = responseJson.data
        console.log(`nak tengok document ade ke tak? : ${JSON.stringify(responseJson)}`)
        const lastTest = test.slice(-1).pop()
        const isDocument1 = lastTest.isDocument1
        console.log(`document paling last ialah ${isDocument1}`)
        dispatch({ type: 'SET_MERCHANT', payload: { isDocument1 } })

      })
      .catch((error) => {
        console.log('Error initiating document info : ' + error);
        dispatch({ type: 'SET_MERCHANT', payload: { isDocument1:'http://test' } })
      });
  }
}

export const checkContactApi = () => {
  return async (dispatch, getState) => {

    //const personalToken = await AsyncStorage.getItem('personalToken');
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/setup/business_contact`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const test = responseJson.data

        const lastTest = test.slice(-1).pop()
        const full_name = lastTest.full_name
        console.log(`full_name paling last ialah ${full_name}`)
        dispatch({ type: 'SET_MERCHANT', payload: { full_name } })

      })
      .catch((error) => {
        console.log('Error initiating check contact : ' + error);
      });
  }
}

export const checkCDDApi = () => {
  return async (dispatch, getState) => {

    //const personalToken = await AsyncStorage.getItem('personalToken');
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/setup/cdd_verification`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const test = responseJson.data

        const { business_name, full_name, isDocument1, isDeclaration_one } = await getState().merchantInfoReducer
        await console.log('Dekat setScreen action ', business_name, full_name, isDocument1, isDeclaration_one)
        if (business_name && full_name && (isDocument1 != 'http://test') && isDeclaration_one) {
            // setLink('Dashboard')
            // setDashboardDisplay(true)
            const link = 'Dashboard'
            dispatch({ type: 'SET_MERCHANT', payload: { link } })
            console.log('dashboard')
        } else if (business_name && full_name && (isDocument1 != 'http://test')) {
            //setLink('RegistrationDeclaration')
            const link = 'RegistrationDeclaration'
            dispatch({ type: 'SET_MERCHANT', payload: { link } })
            console.log('go declaration')
        } else if (business_name && full_name) {
            //setLink('CompanyDocument')
            const link = 'CompanyDocument'
            dispatch({ type: 'SET_MERCHANT', payload: { link } })
            console.log('go company document')
        } else if (business_name) {
            //setLink('ContactPerson')
            const link = 'ContactPerson'
            dispatch({ type: 'SET_MERCHANT', payload: { link } })
            console.log('go contact person')
        } else {
            //setLink('CompanyInformation')
            const link = 'CompanyInformation'
            dispatch({ type: 'SET_MERCHANT', payload: { link } })
            console.log('go company info')
        }

      })
      .catch((error) => {
        console.log('Error initiating check contact : ' + error);
      });
  }
}




///////////////////////////////////////////////////////////////////////////////////
export const promotionApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    fetch(`${apiUrl}api/promotions/view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const promotionArray = await responseJson.data
        await console.log(`PROMOTION API  ${JSON.stringify(promotionArray)}`)

        await dispatch({ type: 'SET_PROMOTION', payload: { promotionArray } })
      })
      .catch((error) => {
        console.log('Error Promotion Api : ' + error);
      });
  }
}

export const handbooksApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    fetch(`${apiUrl}api/handbooks/view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const handbooksArray = await responseJson.data
        await console.log(`HANDBOOKS API  ${JSON.stringify(handbooksArray)}`)

        await dispatch({ type: 'SET_HANDBOOKS', payload: { handbooksArray } })
      })
      .catch((error) => {
        console.log('Error Handbooks Api : ' + error);
      });
  }
}

export const einfoApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    fetch(`${apiUrl}api/einfos/view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const einfosArray = await responseJson.data
        await console.log(`EINFO API  ${JSON.stringify(einfosArray)}`)

        await dispatch({ type: 'SET_EINFO', payload: { einfosArray } })
      })
      .catch((error) => {
        console.log('Error E-info Api : ' + error);
      });
  }
}

export const bizDirApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    fetch(`${apiUrl}api/business_directory/listAllDirectory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const bizDirArray = await responseJson.data
        await console.log(`BIZDIR API  ${JSON.stringify(bizDirArray)}`)

        await dispatch({ type: 'SET_BIZ_DIR', payload: { bizDirArray } })
      })
      .catch((error) => {
        console.log('Error Biz Dir Api : ' + error);
      });
  }
}

export const getAssociateApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    fetch(`${apiUrl}api/business_directory/listAssociateDirectory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const assoDirArray = await responseJson.data
        await console.log(`assoc API  ${JSON.stringify(assoDirArray)}`)

        await dispatch({ type: 'SET_ASSO_DIR', payload: { assoDirArray } })
        console.log(`ini lah kat reducer :${JSON.stringify(getState().assoDirReducer)}`)
      })
      .catch((error) => {
        console.log('Error Asso Dir Api : ' + error);
      });
  }
}

export const getPendingApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    fetch(`${apiUrl}api/business_directory/listRequestDirectory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const pendingDirArray = await responseJson.data
        await console.log(`assoc API  ${JSON.stringify(pendingDirArray)}`)

        await dispatch({ type: 'SET_PENDING_DIR', payload: { pendingDirArray } })
      })
      .catch((error) => {
        console.log('Error Pending Dir Api : ' + error);
      });
  }
}

export const listAgencyApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    fetch(`${apiUrl}api/agency/listAgencies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const agencyArray = await responseJson.data
        await console.log(`agency list API  ${JSON.stringify(agencyArray)}`)

        await dispatch({ type: 'SET_AGENCY_LIST', payload: { agencyArray } })
      })
      .catch((error) => {
        console.log('Error Agency List Api : ' + error);
      });
  }
}

export const loanInfoApi = (page) => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    fetch(`${apiUrl}api/loan/viewLoanInformation?page=${page}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const loanInfo = await responseJson.data
        await console.log(`loan info API  ${JSON.stringify(loanInfo)}`)

        await dispatch({ type: 'SET_LOAN_INFO', payload: { ...loanInfo } })
      })
      .catch((error) => {
        console.log('Error loanInfo Api : ' + error);
      });
  }
}

export const grantInfoApi = (page) => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    fetch(`${apiUrl}api/grant/listGrantInformation?page=${page}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const grantInfo = await responseJson.data
        await console.log(`grant info list API  ${JSON.stringify(grantInfo)}`)

        await dispatch({ type: 'SET_GRANT_INFO', payload: { ...grantInfo } })
      })
      .catch((error) => {
        console.log('Error grantInfo Api : ' + error);
      });
  }
}

export const addExpoTokenApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const { expo_token } = getState().registrationReducer
    console.log(`expo registrationReducer ${expo_token}`)
    const access_credential = 'api'
    fetch(`${apiUrl}api/user/expo_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ access_credential, expo_token }),
    }).then((response) => response.json())
      .then(async (responseJson) => {
        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const agencyArray = await responseJson.data
        await console.log(`expo token API  ${JSON.stringify(agencyArray)}`)

        //await dispatch({ type: 'SET_AGENCY_LIST', payload: { agencyArray } })
      })
      .catch((error) => {
        console.log('Error expo token Api : ' + error);
      });
  }
}

export const requestConnectApi = (connect_id) => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const { expo_token } = getState().registrationReducer
    const access_credential = 'api'

    console.log(`connect id ialah : ${connect_id}`)
    fetch(`${apiUrl}api/business_directory/request_connection`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ access_credential, connect_id }),
    }).then((response) => response.json())
      .then(async (responseJson) => {
        console.log(`inilah request connect : ${JSON.stringify(responseJson)}`)
      })
      .catch((error) => {
        console.log('Error expo token Api : ' + error);
      });
  }
}

export const acceptApi = (connect_id) => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const { expo_token } = getState().registrationReducer
    const access_credential = 'api'

    console.log(`connect id ialah : ${connect_id}`)
    fetch(`${apiUrl}api/business_directory/acceptConnection`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ access_credential, connect_id }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        //console.log(`inilah request connect : ${JSON.stringify(responseJson)}`)
        //const agencyArray = await responseJson.data
        //await console.log(`expo token API  ${JSON.stringify(agencyArray)}`)

        //await dispatch({ type: 'SET_AGENCY_LIST', payload: { agencyArray } })
      })
      .catch((error) => {
        console.log('Error expo token Api : ' + error);
      });
  }
}

export const connectionStatusApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const { expo_token } = getState().registrationReducer
    const access_credential = 'api'
    fetch(`${apiUrl}api/business_directory/analyticBusinessDirectory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ access_credential, expo_token }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const connectionStatus = await responseJson.data
        await console.log(`connectionstatus API  ${JSON.stringify(connectionStatus)}`)

        //await dispatch({ type: 'SET_AGENCY_LIST', payload: { agencyArray } })
        await dispatch({ type: 'SET_USER_PROFILE', payload: { ...connectionStatus } })
      })
      .catch((error) => {
        console.log('Error expo token Api : ' + error);
      });
  }
}

export const applyLoanApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    const { proposal, income_tax, loan_amount, estimate_time, payment_method } = getState().loanApplicationReducer
    fetch(`${apiUrl}api/loan/addInformation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ proposal, income_tax, loan_amount, estimate_time, payment_method, access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const einfosArray = await responseJson.data
        await console.log(`Loan Application  ${JSON.stringify(einfosArray)}`)

      })
      .catch((error) => {
        console.log('Error Loan Application : ' + error);
      });
  }
}

export const applyGrantApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    const { proposal, income_tax, agency_id } = getState().grantApplicationReducer
    console.log(`inilah apply grant : ${JSON.stringify(getState().grantApplicationReducer)}`)
    fetch(`${apiUrl}api/grant/addGrantInformation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ proposal, income_tax, agency_id, access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah grant: ${JSON.stringify(responseJson)}`)
        const einfosArray = await responseJson.data
        await console.log(`Loan Application  ${JSON.stringify(einfosArray)}`)

      })
      .catch((error) => {
        console.log('Error Loan Application : ' + error);
      });
  }
}

export const uploadDocApi = (blob) => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    const { proposal, income_tax, loan_amount, estimate_time, payment_method } = getState().loanApplicationReducer
    // const {document,document_name,}

    const document = blob
    const document_name = 'testing'
    fetch(`${apiUrl}api/uploadDocument`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ document, document_name, access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const einfosArray = await responseJson.data
        await console.log(`upload success  ${JSON.stringify(einfosArray)}`)

      })
      .catch((error) => {
        console.log('Error Upload : ' + error);
      });
  }
}

export const getUserInfoApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    fetch(`${apiUrl}api/user/information`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const userProfile = await responseJson.data
        await console.log(`USER  ${JSON.stringify(userProfile)}`)

        await dispatch({ type: 'SET_USER_PROFILE', payload: { ...userProfile } })
      })
      .catch((error) => {
        console.log('Error Event Api : ' + error);
      });
  }
}

export const editUserApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    const { name, full_name, profile_pic } = getState().myAccountReducer
    fetch(`${apiUrl}api/user/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ name, full_name, profile_pic, access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const userProfile = await responseJson.data

        await console.log(`USER  ${JSON.stringify(userProfile)}`)

        //await dispatch({ type: 'EDIT_USER_PROFILE', payload: { ...userProfile } })
      })
      .catch((error) => {
        console.log('Error Event Api : ' + error);
      });
  }
}

export const generateJWTApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    fetch(`${apiUrl}api/jwt/generate`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah JWT : ${JSON.stringify(responseJson)}`)
        const jwt = await responseJson.data
        // await console.log(`Company Info  ${JSON.stringify(bizInfo)}`)

        await dispatch({ type: 'SET_USER_PROFILE', payload: { jwt } })
      })
      .catch((error) => {
        console.log('Error JWT Api : ' + error);
      });
  }
}

export const getCompanyInfoApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    fetch(`${apiUrl}api/companyInfo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const bizInfo = await responseJson.data
        await console.log(`Company Info  ${JSON.stringify(bizInfo)}`)

        await dispatch({ type: 'GET_BIZ_INFO', payload: { ...bizInfo } })
      })
      .catch((error) => {
        console.log('Error Company Api : ' + error);
      });
  }
}

export const getListWorkersApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    fetch(`${apiUrl}api/company/listWorkers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {
        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const listWorkers = await responseJson.data
        // await console.log(`Company Info  ${JSON.stringify(eventArray)}`)

        await dispatch({ type: 'GET_LIST_WORKERS', payload: { listWorkers } })
      })
      .catch((error) => {
        console.log('Error WORKER Api : ' + error);
      });
  }
}

export const sendNotificationApi = (expo_token, id, title) => {
  return async (dispatch, getState) => {

    console.log(`kemantapan sejati ${expo_token} dan ${id} dan ${title}`)
    const expo_token_from = getState().registrationReducer.expo_token
    fetch(`https://exp.host/--/api/v2/push/send`, {
      method: 'POST',
      headers: {
        'host': 'exp.host',
        'accept': 'application/json',
        'accept-encoding': 'gzip,deflate',
        'content-type': 'application/json',
      }, body: JSON.stringify({ to: expo_token, title: 'BXcess Notification', body: 'None', data: { title, id, expo_token_from } }),
    }).then((response) => response.json())
      .then(async (responseJson) => {
        console.log(`inilah response JSON sendNotification : ${JSON.stringify(responseJson)}`)
      })
      .catch((error) => {
        console.log('Error sendNotification : ' + error);
      });
  }
}

export const doneForNowApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    fetch(`${apiUrl}api/registerCompany/additional`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {
        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const done = await responseJson.data
        await console.log(`Company Info  ${JSON.stringify(done)}`)
        //await dispatch({ type: 'GET_LIST_WORKERS', payload: { ...listWorkers } })
      })
      .catch((error) => {
        console.log('Error WORKER Api : ' + error);
      });
  }
}

export const getCoursesApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('lmsPersonalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    // const token_type='Bearer'
    // const access_token='eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjU3ZmMwNzdkNmU4ODQ0MGNiNmYxMWFkMzRkNWE5MDQxOGFmZmVmYWQwMmQ4YWRiZjc0ZTAxZDQwMGU1MTRkMDAyNDc5NzUxODc5ZTdiOGUwIn0.eyJhdWQiOiIyIiwianRpIjoiNTdmYzA3N2Q2ZTg4NDQwY2I2ZjExYWQzNGQ1YTkwNDE4YWZmZWZhZDAyZDhhZGJmNzRlMDFkNDAwZTUxNGQwMDI0Nzk3NTE4NzllN2I4ZTAiLCJpYXQiOjE1NjM2NTg1ODIsIm5iZiI6MTU2MzY1ODU4MiwiZXhwIjoxNTk1MjgwOTgyLCJzdWIiOiIxMiIsInNjb3BlcyI6W119.mGYw6ngyvIYDGaSMdevxMD0yx4pzj3PjcRyjmDxY5zB_CJOfxd0MS0M2wkfvG-BvLB31d9DPr3dj52ETfK_eOdCeFeHliECF450QC6aZElvrHskDgb09DOcU0gTyYCToiCybF-RpDaOMPYpzq_hqCfBM_V1JfovoPZWDS-iqt0V7lCvUODWya0bIzb0B4J2kHI9vt7h7-OFKOnzYoF-4jpeJAq_T2U6VQlEIwLKWL3LUW_g_Y5IwK3q4VCm7a2Nw5oleEbhEqqmpdmTmsTpvQ_e_rtOaIloMYEvzmw4lsLP9fLDO9KaEx9UY3drq4xL2f2hV2XIzhnSERKJT2HRe3cJdBuHHjqvFQuyf2oXfkHoeeOh1h1k5CN_pCGqibzkk-SXALPBMH2aqeSlyKKjPJLkLcVIUZE-2Rh0moVsrkmaVT6TWwOCdIU0-tk9xe1QWKQlTU5i8Fxp5o3uucT0p5o7qQ6NF6xCMm6cv_XqbHz_OQ9fjXZIKL_-zmLmkZh3fBOSCtqa36-c2-OMYCL3CrV1bVP_glPJzn3rUXX2rqb5lvU8GSzILiwxzOyvhd1l44bhgFvOU94nl8EMb7fZLiZjbq4u7c1k4jg8ll0JtYIkrhafbKKZmERJqkMREsEwia5LJD-O8BkgRYSK00q9yDPrL-szRNpecPPhb5TpMzAE'
    // const access_credential = 'api'
    fetch(`${lmsApiUrl}api/courses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }
    }).then((response) => response.json())
      .then(async (responseJson) => {
        console.log(`inilah response JSON  training: ${JSON.stringify(responseJson)}`)
        const trainingArray = await responseJson.data
        await console.log(`Training Info  ${JSON.stringify(trainingArray)}`)

        await dispatch({ type: 'GET_COURSES', payload: { trainingArray } })
      })
      .catch((error) => {
        console.log('Error TRAINING Api : ' + error);
      });
  }
}

//////////////////////////////////LUNAWALLET/////////////////////////////////////////

export const getUrl = (pic) => {
  var kucing = ''
  Storage.get(pic)
    .then(result => kucing = result)
    .catch(err => console.log('error : ' + err))
  return kucing
}

export const userInfo = () => {
  return async (dispatch, getState) => {
    //const personalToken = await AsyncStorage.getItem('personalToken');    
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/userInfo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }
    }).then((response) => response.json())
      .then(async (responseJson) => {
        const selfieKey = await responseJson.data.filename_2
        var selfieUri = ''

        await Storage.get(selfieKey)
          .then(async result => {
            await dispatch({ type: 'SET_DASHBOARD', payload: { userInfo: { ...responseJson.data, ...{ selfieUri: result } } } })
          })
          .catch(err => console.log('error : ' + err))
      })
      .catch((error) => {
        console.log('Error initiating dashboard : ' + error);
      });
  }
}

export const latestTransaction = () => {
  return async (dispatch, getState) => {
    //const personalToken = await AsyncStorage.getItem('personalToken');
    const personalToken = await SecureStore.getItemAsync('personalToken')

    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/LatestTransaction`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      }

    }).then((response) => response.json())
      .then(async (responseJson) => {

        await console.log(`latest transaction info  ${JSON.stringify(responseJson)}`)
        dispatch({ type: 'SET_DASHBOARD', payload: { latestTransaction: responseJson.data } })

      })
      .catch((error) => {
        console.log('Error latest transaction : ' + error);
      });
  }
}

export const analyticSummary = () => {
  return async (dispatch, getState) => {

    //const personalToken = await AsyncStorage.getItem('personalToken');
    const personalToken = await SecureStore.getItemAsync('personalToken')

    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/AnalyticSummary`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        await console.log(`analytic summary info  ${JSON.stringify(responseJson)}`)
        dispatch({ type: 'SET_DASHBOARD', payload: { analyticSummary: responseJson.data } })
      })
      .catch((error) => {
        console.log('Error analytic summary : ' + error);
      });
  }
}

export const analytic = () => {
  return async (dispatch, getState) => {
    const type = 'Deposit'
    const credit_debit = 'Credit'

    //const personalToken = await AsyncStorage.getItem('personalToken');   
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/Analytic`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      },
      body: JSON.stringify({ type, credit_debit }),

    }).then((response) => response.json())
      .then(async (responseJson) => {
        await console.log(`analytic  info  ${JSON.stringify(responseJson)}`)
        dispatch({ type: 'SET_ANALYTIC', payload: { analyticSummary: responseJson.data } })
      })
      .catch((error) => {
        console.log('Error analytic : ' + error);
      });
  }
}

export const notificationApi = () => {
  return async (dispatch, getState) => {

    //const personalToken = await AsyncStorage.getItem('personalToken');
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/Notification`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const notificationByDate = [...responseJson.data.promotion, ...responseJson.data.annoucement, ...responseJson.data.advertisement]

        dispatch({ type: 'SET_NOTIFICATION', payload: { notificationList: notificationByDate } })

      })
      .catch((error) => {
        console.log('Error initiating notification : ' + error);
      });
  }
}

export const depositApi = () => {
  return async (dispatch, getState) => {

    const { amount, bank, d1, d2, d3, d4 } = getState().depositScreenReducer
    const type = 'Deposit'
    const tag = ''
    const channel = 'Deposit Channel'
    const pin = '' + d1 + d2 + d3 + d4

    const access_credential = 'api'
    const remarks = 'Deposit from ' + bank
    // const personalToken=JSON.parse(AsyncStorage.getItem('personalToken'))

    console.log(`amount ialah ${amount}`)
    //const personalToken = await AsyncStorage.getItem('personalToken');
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/Deposit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      },
      body: JSON.stringify({ amount, tag, channel, pin, access_credential, remarks }),

    }).then((response) => response.json())
      .then(async (responseJson) => {

        const { status } = await responseJson
        await console.log(`deposit ${JSON.stringify(responseJson)}`)
        await dispatch({ type: 'SET_DEPOSIT', payload: { status } })

      })
      .catch((error) => {
        console.log('Error deposit : ' + error);
      });
  }
}

export const userList = () => {
  return async (dispatch, getState) => {

    //const personalToken = await AsyncStorage.getItem('personalToken');
    const personalToken = await SecureStore.getItemAsync('personalToken')

    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/userList`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        await console.log(`list of recipient  ${JSON.stringify(responseJson)}`)
        const recipientList = await responseJson.data
        const phoneNoList = await []
        const phoneNoList6 = await []

        await recipientList.map(rL => {

          phoneNoList.push(rL.phone_no)
          phoneNoList6.push((rL.phone_no ? rL.phone_no.replace(/[^A-Z0-9]+/ig, "").substr(rL.phone_no.length - 6) : 'NA'))
        })

        await dispatch({ type: 'SET_RECIPIENT_LIST', payload: { recipientList, phoneNoList, phoneNoList6, memberFilter: true } })
        await dispatch({ type: 'SET_PAYER_LIST', payload: { payerList: recipientList, phoneNoList, phoneNoList6, memberFilter: true } })

      })
      .catch((error) => {
        console.log('Error userList: ' + error);
      });
  }
}

export const sendMoney = () => {
  return async (dispatch, getState) => {

    const { amount, phone_no, recipientRemark, d1, d2, d3, d4, expoToken } = getState().transferOutScreenReducer
    const pin = '' + d1 + d2 + d3 + d4
    const phone = phone_no
    const access_credential = 'api'
    const remarks = recipientRemark

    //0 const personalToken=JSON.parse(AsyncStorage.getItem('personalToken'))

    console.log(`expo token ialah ${amount}`)
    //const personalToken = await AsyncStorage.getItem('personalToken'); 
    const personalToken = await SecureStore.getItemAsync('personalToken')

    const { token_type, access_token } = JSON.parse(personalToken)
    fetch(`${apiUrl}api/SendMoney`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      },
      body: JSON.stringify({ phone, amount, pin, access_credential, remarks }),

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const { status } = await responseJson
        status ? await dispatch(pushNotification(expoToken)) : null
        await console.log(`send money : ${JSON.stringify(responseJson)}`)
      })
      .catch((error) => {
        console.log('Error send money : ' + error);
      });
  }
}

export const withdrawApi = () => {
  return async (dispatch, getState) => {

    const { amount, bank, d1, d2, d3, d4 } = getState().withdrawScreenReducer
    //const type='Deposit'
    const tag = ''
    const channel = 'Withdraw Channel'
    const pin = '' + d1 + d2 + d3 + d4
    const withdraw_currency = 'MYR'
    const access_credential = 'api'
    const remarks = 'Withdraw from ' + bank
    // const personalToken=JSON.parse(AsyncStorage.getItem('personalToken'))

    console.log(`amount ialah ${amount}`)
    //const personalToken = await AsyncStorage.getItem('personalToken');
    const personalToken = await SecureStore.getItemAsync('personalToken')

    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/Withdraw`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      },
      body: JSON.stringify({ amount, channel, withdraw_currency, tag, access_credential, pin, remarks }),

    }).then((response) => response.json())
      .then(async (responseJson) => {

        const { status } = await responseJson
        await console.log(`withdraw ${JSON.stringify(responseJson)}`)
        await dispatch({ type: 'SET_WITHDRAW', payload: { status } })

      })
      .catch((error) => {
        console.log('Error withdraw : ' + error);
      });
  }
}

export const requestMoney = () => {
  return async (dispatch, getState) => {

    const { amount, phone_no } = getState().requestScreenReducer

    // const pin='1111'
    const payer_phone = phone_no
    const access_credential = 'api'
    //const payer='59707060'
    const remark = 'NA'

    console.log(`amount ialah ${amount}`)
    // const personalToken = await AsyncStorage.getItem('personalToken');   
    const personalToken = await SecureStore.getItemAsync('personalToken')

    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/RequestMoney`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      },
      body: JSON.stringify({ amount, payer_phone, access_credential, remark }),

    }).then((response) => response.json())
      .then(async (responseJson) => {

        const { status } = await responseJson
        await console.log(`request money : ${JSON.stringify(responseJson)}`)

      })
      .catch((error) => {
        console.log('Error request money : ' + error);
      });
  }
}

export const payRequestMoney = () => {
  return async (dispatch, getState) => {

    const { amount } = getState().requestScreenReducer

    const pin = '1111'
    const references = '004458557598369'

    const payer = '59707060'
    // const personalToken=JSON.parse(AsyncStorage.getItem('personalToken'))

    console.log(`amount ialah ${amount}`)
    //const personalToken = await AsyncStorage.getItem('personalToken');    
    const personalToken = await SecureStore.getItemAsync('personalToken')

    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/payRequestMoney`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      },
      body: JSON.stringify({ references, payer }),

    }).then((response) => response.json())
      .then(async (responseJson) => {

        const { status } = await responseJson
        await console.log(`pay request money : ${JSON.stringify(responseJson)}`)

      })
      .catch((error) => {
        console.log('Error request money : ' + error);
      });
  }
}

export const resetPinApi = () => {
  return async (dispatch, getState) => {

    const { d1, d2, d3, d4, n1, n2, n3, n4 } = await getState().resetPinReducer
    const old_pin = '' + d1 + d2 + d3 + d4
    const new_pin = '' + n1 + n2 + n3 + n4

    //const personalToken = await AsyncStorage.getItem('personalToken');
    const personalToken = await SecureStore.getItemAsync('personalToken')

    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/resetPin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      },
      body: JSON.stringify({ old_pin, new_pin }),

    }).then((response) => response.json())
      .then(async (responseJson) => {
        await console.log(`reset pin ${JSON.stringify(responseJson)}`)
        //dispatch({ type: 'SET_DASHBOARD', payload: { analyticSummary:responseJson.data } })           
      })
      .catch((error) => {
        console.log('reset pin error : ' + error);
      });
  }
}

export const editMobileDetail = () => {
  return async (dispatch, getState) => {
    const { phone_country_code, phone_no } = getState().kycReducer
    const mobile_no = phone_no
    const country_code = phone_country_code.replace('0', '')

    //const personalToken = await AsyncStorage.getItem('personalToken');   
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/EditMobileDetail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      },
      body: JSON.stringify({ country_code, mobile_no }),

    }).then((response) => response.json())
      .then(async (responseJson) => {

        const { token_type, access_token } = await responseJson
        await console.log(`sms is ${JSON.stringify(responseJson)}`)

      })
      .catch((error) => {
        console.error('Error : ' + error);
      });
  }
}

export const editMobileDetailVerify = (d) => {
  return async (dispatch, getState) => {
    const { phone_country_code, phone_no } = getState().kycReducer
    const mobile_no = phone_no
    const country_code = phone_country_code.replace('0', '')
    const code = d
    // const personalToken = await AsyncStorage.getItem('personalToken'); 
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/KycMobileVerify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      },
      body: JSON.stringify({ country_code, mobile_no, code }),

    }).then((response) => response.json())
      .then(async (responseJson) => {

        const { status } = await responseJson
        await console.log(`verification status ${JSON.stringify(status)}`)

        if (status) {
          await dispatch({ type: 'SET_INDICATOR_PHONE_VERIFICATION', payload: { displayIndicator: false, proceed: true, actionList: false } })
        } else {
          await dispatch({ type: 'SET_INDICATOR_PHONE_VERIFICATION', payload: { displayIndicator: false, proceed: false, actionList: true } })
        }

        //dispatch({ type: 'SET_INDICATOR_PHONE_VERIFICATION', payload: { displayIndicator: false, proceed: true,actionList:false } })

      })
      .catch((error) => {
        console.error('Error : ' + error);
      });
  }
}

/////////////////////////////

export const urlToBlob = (url) => {

  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onerror = reject;
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        resolve(xhr.response);
      }
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob'; // convert type
    xhr.send();
  })
}

export const uploadImage = async (fileName, blob, contentType) => {
  await Storage.put(fileName, blob, contentType).then(data => {
    //this.props.savePicture(data.key, kidId)
    console.log('save success')
    //this.props.navigation.goBack()
  })
    .catch(err => console.log(err))
}

export const pushNotification = (expoToken) => {
  return async (dispatch, getState) => {
    const data = { nama: 'Syahrizan' }
    const to = expoToken//android
    //const to = 'ExponentPushToken[XXMeNqKO_IQNthjQU8uxgO]'//iphone
    const title = 'test'
    const body = 'body'

    fetch(`https://exp.host/--/api/v2/push/send`, {
      method: 'POST',
      headers: {
        'host': 'exp.host',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'accept-encoding': 'gzip, deflate',
      },
      body: JSON.stringify({ data, to, title, body }),
    }).then((response) => response.json())
      .then(async (responseJson) => {
        await console.log(`pay request money : ${JSON.stringify(responseJson)}`)
      })
      .catch((error) => {
        console.log('Error request money : ' + error);
      });
  }
}

export const editPersonalDetail = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    const expoToken = await Notifications.getExpoPushTokenAsync();
    const dashboard = getState().dashboardScreenReducer.userInfo
    //const password = getState().editInfoScreenReducer.password

    const test = {
      first_name: dashboard.name,
      last_name: expoToken,
      name: dashboard.name,
      email: dashboard.email,
      password: getState().editInfoScreenReducer.password,
      gender: dashboard.gender,
      birth_date: moment(dashboard.birth_date).format("YYYY-MM-DD"),
      nationality: dashboard.nationality,
      occupation: dashboard.occupation,
      industry: dashboard.industry,
      street_address: dashboard.street_address,
      street_address_2: dashboard.street_address_2,
      country: dashboard.country,
      region: 'Asia',
      city: dashboard.city,
      postcode: dashboard.postcode,
      national_id_passport: dashboard.national_id_passport
    }

    console.log(`dashboard ialah ${JSON.stringify(dashboard)}`)
    console.log(`expo token ialah ${JSON.stringify(expoToken)}`)

    fetch(`${apiUrl}api/EditPersonalDetail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      },

      body: JSON.stringify(test),

    }).then((response) => response.json())
      .then(async (responseJson) => {

        const { status } = await responseJson
        await console.log(`edit info  ${JSON.stringify(responseJson)}`)

      })
      .catch((error) => {
        console.error('Error : ' + error);
      });

  }
}