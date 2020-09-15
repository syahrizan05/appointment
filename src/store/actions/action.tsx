
import AsyncStorage from '@react-native-community/async-storage';
import { customerListDefault, taskListDefault, serviceListDefault, slotListDefault } from '../../db/data'
import { Task, AppDayInterface } from '../../types'



export const populateServices = () => {
    return async (dispatch: any, getState: any) => {
        //dispatch(getLoanDataApi())
        console.log(`populate data 1`)

        try {
            const serviceList = await AsyncStorage.getItem('services')
            if (serviceList !== null) {
                // value previously stored
                //console.log(`value ialah ${accountList}`)
                dispatch({ type: 'GET_SERVICES', payload: { serviceList: JSON.parse(serviceList) } })
            } else {
                try {
                    const jsonValue = JSON.stringify(serviceListDefault)
                    await AsyncStorage.setItem('services', jsonValue)
                    dispatch({ type: 'GET_SERVICES', payload: { serviceList: serviceListDefault } })

                } catch (e) {
                    // saving error
                }

            }
        } catch (e) {
            // error reading value
        }
    }

}


export const addService = (value: object) => {
    return async (dispatch: any, getState: any) => {
        //dispatch(getLoanDataApi())
        const { serviceList } = getState().serviceListReducer
        const newServiceList = [...serviceList, value]

        try {
            const jsonValue = JSON.stringify(newServiceList)
            await AsyncStorage.setItem('services', jsonValue)
            dispatch({ type: 'GET_SERVICES', payload: { serviceList: newServiceList } })

        } catch (e) {
            // saving error
        }
        //console.log(`add data ${JSON.stringify(accountList)}`)


    }

}


export const populateSlots = () => {
    return async (dispatch: any, getState: any) => {
        //dispatch(getLoanDataApi())
        //console.log(`populate category 1`)

        try {
            const slotList = await AsyncStorage.getItem('slots')
            if (slotList !== null) {
                // value previously stored
                console.log(`value ialah ${slotList}`)
                dispatch({ type: 'GET_SLOTS', payload: { slotList: JSON.parse(slotList) } })
            } else {
                try {
                    const jsonValue = JSON.stringify(slotListDefault)
                    await AsyncStorage.setItem('slots', jsonValue)
                    dispatch({ type: 'GET_SLOTS', payload: { slotList: slotListDefault } })

                } catch (e) {
                    // saving error
                }

            }
        } catch (e) {
            // error reading value
        }
    }

}


export const addSlot = (value: object) => {
    return async (dispatch: any, getState: any) => {
        //dispatch(getLoanDataApi())
        const { slotList } = getState().slotListReducer
        const newSlotList = [...slotList, value]

        try {
            const jsonValue = JSON.stringify(newSlotList)
            await AsyncStorage.setItem('slots', jsonValue)
            dispatch({ type: 'GET_SLOTS', payload: { slotList: newSlotList } })

        } catch (e) {
            // saving error
        }
        //console.log(`add data ${JSON.stringify(categoryList)}`)


    }

}




export const populateTasks = () => {
    return async (dispatch: any, getState: any) => {
        //dispatch(getLoanDataApi())
        console.log(`populate transaction 1`)

        try {
            const taskList = await AsyncStorage.getItem('tasks')
            if (taskList !== null) {
                // value previously stored
                //console.log(`value ialah ${transactionList}`)
                dispatch({ type: 'GET_TASKS', payload: { taskList: JSON.parse(taskList) } })
            } else {
                try {
                    const jsonValue = JSON.stringify(taskListDefault)
                    await AsyncStorage.setItem('tasks', jsonValue)
                    dispatch({ type: 'GET_TASKS', payload: { taskList: taskListDefault } })

                } catch (e) {
                    // saving error
                }
                //dispatch({ type: 'GET_TASKS', payload: { categoryList: [] } })

            }
        } catch (e) {
            // error reading value
        }
    }

}

export const populateCustomers = () => {
    return async (dispatch: any, getState: any) => {
        //dispatch(getLoanDataApi())
        //console.log(`populate data 1`)

        try {
            const customerList = await AsyncStorage.getItem('customers')
            if (customerList !== null) {
                // value previously stored
                //console.log(`value ialah ${accountList}`)
                dispatch({ type: 'GET_CUSTOMERS', payload: { customerList: JSON.parse(customerList) } })
                //console.log(`populate customers ${JSON.stringify(customerList)}`)

            } else {
                try {
                    const jsonValue = JSON.stringify(customerListDefault)
                    await AsyncStorage.setItem('customers', jsonValue)
                    dispatch({ type: 'GET_CUSTOMERS', payload: { customerList: customerListDefault } })
                    //console.log(`populate customers ${JSON.stringify(customerList)}`)

                } catch (e) {
                    // saving error
                }

            }
        } catch (e) {
            // error reading value
        }
    }

}


export const addCustomer = (value: object) => {
    return async (dispatch: any, getState: any) => {
        //dispatch(getLoanDataApi())
        const { customerList } = getState().customerListReducer
        const newCustomerList = [...customerList, value]

        try {
            const jsonValue = JSON.stringify(newCustomerList)
            await AsyncStorage.setItem('customers', jsonValue)
            dispatch({ type: 'GET_CUSTOMERS', payload: { customerList: newCustomerList } })

        } catch (e) {
            // saving error
        }
        //console.log(`add data ${JSON.stringify(accountList)}`)


    }

}



export const addTask = (value: Task) => {
    return async (dispatch: any, getState: any) => {

        console.log(`add task ${JSON.stringify(value)}`)

        const { taskList } = getState().taskListReducer
        const newTaskList = taskList ? [...taskList, value] : [value]

        try {
            const jsonValue = JSON.stringify(newTaskList)
            await AsyncStorage.setItem('tasks', jsonValue)
            dispatch(populateTasks())
        } catch (e) {
            // saving error
            console.log(JSON.stringify(e))
        }



        // console.log(`add transaction : ${JSON.stringify(value)}`)

        // const { category, account, dateUpdated, amount, transactionType } = value

        // const { transactionList } = getState().transactionListReducer
        // const newTransactionList = transactionList ? [...transactionList, value] : [value]

        // const { accountList } = getState().accountListReducer
        // console.log(`ini la hasil dari value tersebut : ${JSON.stringify(account)}`)
        // const selectedAccount = accountList.find((aL: any) => aL.title === account)


        // if (transactionType === 'topup') {
        //     const newAccount = { ...selectedAccount, dateUpdated, balance: selectedAccount.balance + Number(amount) }
        //     const newAccountList = [...accountList.filter((aL: any) => aL.title !== account), newAccount]
        //     if (category !== 'NA') {
        //         const categoryList = newAccountList
        //         const selectedCategory = categoryList.find((cL: any) => cL.title === category)
        //         console.log(`selectedCategory : ${JSON.stringify(selectedCategory)}`)
        //         const newCategory = { ...selectedCategory, dateUpdated, balance: selectedCategory.balance - Number(amount) }
        //         const newCategoryList = [...categoryList.filter((cL: any) => cL.title !== category), newCategory]
        //         try {
        //             const jsonValue = JSON.stringify(newTransactionList)
        //             await AsyncStorage.setItem('transactions', jsonValue)
        //             //await AsyncStorage.setItem('categories', JSON.stringify(newCategoryList))
        //             await AsyncStorage.setItem('accounts', JSON.stringify(newCategoryList))

        //         } catch (e) {
        //             // saving error
        //         }
        //     } else {

        //         try {
        //             const jsonValue = JSON.stringify(newTransactionList)
        //             await AsyncStorage.setItem('transactions', jsonValue)
        //             //await AsyncStorage.setItem('categories', JSON.stringify(newCategoryList))
        //             await AsyncStorage.setItem('accounts', JSON.stringify(newAccountList))

        //         } catch (e) {
        //             // saving error
        //         }
        //     }




        // } else if (transactionType === 'transfer') {
        //     const newAccount = { ...selectedAccount, dateUpdated, balance: selectedAccount.balance - Number(amount) }
        //     const newAccountList = [...accountList.filter((aL: any) => aL.title !== account), newAccount]
        //     const categoryList = newAccountList
        //     const selectedCategory = categoryList.find((cL: any) => cL.title === category)
        //     const newCategory = { ...selectedCategory, dateUpdated, balance: selectedCategory.balance + Number(amount) }
        //     const newCategoryList = [...categoryList.filter((cL: any) => cL.title !== category), newCategory]



        //     try {
        //         const jsonValue = JSON.stringify(newTransactionList)
        //         await AsyncStorage.setItem('transactions', jsonValue)
        //         //await AsyncStorage.setItem('categories', JSON.stringify(newCategoryList))
        //         await AsyncStorage.setItem('accounts', JSON.stringify(newCategoryList))

        //     } catch (e) {
        //         // saving error
        //     }
        // }
        // else {
        //     console.log(`goes here`)
        //     const newAccount = { ...selectedAccount, dateUpdated, balance: selectedAccount.balance - Number(amount) }
        //     const newAccountList = [...accountList.filter((aL: any) => aL.title !== account), newAccount]
        //     const { categoryList } = getState().categoryListReducer
        //     const selectedCategory = categoryList.find((cL: any) => cL.title === category)
        //     const newCategory = { ...selectedCategory, dateUpdated, balance: selectedCategory.balance + Number(amount) }
        //     const newCategoryList = [...categoryList.filter((cL: any) => cL.title !== category), newCategory]


        //     try {
        //         const jsonValue = JSON.stringify(newTransactionList)
        //         await AsyncStorage.setItem('transactions', jsonValue)

        //         await AsyncStorage.setItem('categories', JSON.stringify(newCategoryList))
        //         await AsyncStorage.setItem('accounts', JSON.stringify(newAccountList))

        //     } catch (e) {
        //         // saving error
        //     }
        // }



        // dispatch({ type: 'GET_TRANSACTIONS', payload: { transactionList: newTransactionList } })
        // dispatch(populateAccounts())
        // dispatch(populateCategories())
        // dispatch(populateTransactions())


    }

}



// export const topUp = (value: any) => {
//     return async (dispatch: any, getState: any) => {

//         console.log(`add transaction : ${JSON.stringify(value)}`)

//         const { category, account, dateUpdated, amount } = value

//         const { transactionList } = getState().transactionListReducer
//         const { categoryList } = getState().categoryListReducer
//         const { accountList } = getState().accountListReducer

//         const selectedCategory = categoryList.find((cL: any) => cL.title === category)
//         const selectedAccount = accountList.find((aL: any) => aL.title === account)

//         const newCategory = { ...selectedCategory, dateUpdated, balance: selectedCategory.balance + Number(amount) }
//         const newAccount = { ...selectedAccount, dateUpdated, balance: selectedAccount.balance - Number(amount) }

//         console.log(`newCategory : ${JSON.stringify(newCategory)}`)
//         console.log(`newAccount : ${JSON.stringify(newAccount)}`)


//         const newCategoryList = [...categoryList.filter((cL: any) => cL.title !== category), newCategory]
//         const newAccountList = [...accountList.filter((aL: any) => aL.title !== account), newAccount]




//         const newTransactionList = transactionList ? [...transactionList, value] : [value]

//         try {
//             const jsonValue = JSON.stringify(newTransactionList)
//             await AsyncStorage.setItem('transactions', jsonValue)

//             await AsyncStorage.setItem('categories', JSON.stringify(newCategoryList))
//             await AsyncStorage.setItem('accounts', JSON.stringify(newAccountList))

//             console.log(`new categories are : ${JSON.stringify(newCategoryList)}`)
//             console.log(`new accounts  are : ${JSON.stringify(newAccountList)}`)

//             dispatch({ type: 'GET_TRANSACTIONS', payload: { transactionList: newTransactionList } })

//             dispatch(populateAccounts())
//             dispatch(populateCategories())
//             dispatch(populateTransactions())

//         } catch (e) {
//             // saving error
//         }
//         console.log(`add data ${JSON.stringify(transactionList)}`)


//     }

// }



export const resetAllData = () => {
    return async (dispatch: any, getState: any) => {
        try {
            await AsyncStorage.multiRemove(['transactions', 'categories', 'accounts'])

        } catch (e) {
            // remove error
        }


        dispatch({ type: 'TRANSACTIONS_RESET' })
        // dispatch({ type: 'CATEGORIES_RESET' })
        // dispatch({ type: 'ACCOUNTS_RESET' })

        dispatch(populateAccounts())
        dispatch(populateCategories())
        dispatch(populateTransactions())

        console.log(`reset accounts : ${JSON.stringify(getState().accountListReducer)}`)

    }

}

