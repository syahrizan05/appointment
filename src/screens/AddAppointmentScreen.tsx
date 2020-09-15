import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, SectionList, TouchableOpacity, Modal, Button, Platform, TextInput, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { Text, View } from '../components/Themed';
import styles from '../styles/styles'
import DateTimePicker from '@react-native-community/datetimepicker';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import { Task, AppDayInterface, SlotInterface, ServiceInterface, CustomerInterface } from '../types'

const ios = Platform.OS === 'ios'

import Constants from "expo-constants";

const moment = extendMoment(Moment);




export default function AddAppointmentScreen({ navigation }: any) {

    const dispatch = useDispatch()
    const { taskList } = useSelector((state: any) => state.taskListReducer, shallowEqual)


    const [modalVisible, setModalVisible] = useState(false);
    const [screen, setScreen] = useState('');

    const [date, setDate] = useState(moment().toDate());
    const [endDate, setEndDate] = useState(moment().toDate());

    const [selectedSlot, setSelectedSlot] = useState(null)

    const [pack, setPackage] = useState(null);
    const [note, setNote] = useState(null);

    const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '' });
    //const [customerPhone, setCustomerPhone] = useState('');

    const addTask = () => {

        const value: Task = { dateStart: moment(date).format(), dateEnd: moment(endDate).format(), slot: selectedSlot, task: pack, note, customer: customerInfo }

        dispatch(actionCreator.addTask(value))
    }


    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={() => navigation.goBack()}>
                    <Ionicons name={'ios-arrow-back'} size={30} />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={() => addTask()}>
                    <Ionicons name={'ios-save'} size={30} />
                </TouchableOpacity>
            ),

        });
    }, [navigation, addTask]);

    const openModal = (screenType: string) => {
        setScreen(screenType)
        setModalVisible(!modalVisible)

    }




    return (
        <ScrollView style={[styles.container, {}]}>
            <Modal visible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)}>
                {screen === 'datetime' ? <DateAndTime setSelectedSlot={setSelectedSlot} date={date} setDate={setDate} endDate={endDate} setEndDate={setEndDate} openModal={() => openModal(screen)} />
                    : screen === 'package' ? <Package pack={pack} setPackage={setPackage} setNote={setNote} openModal={() => openModal(screen)} />
                        : screen === 'customer' ? <CustomerInfo setCustomerInfo={setCustomerInfo} openModal={() => openModal(screen)} />
                            : <View />
                }

            </Modal>
            <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={() => addTask()}>
                <Ionicons name={'ios-save'} size={30} />
            </TouchableOpacity>
            <View style={{ marginBottom: 10, backgroundColor: '#FEFAF2', borderWidth: 1, borderColor: '#EAEBFF', padding: 10 }}>
                <Text style={[styles.header]}>{'Time Info'}</Text>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
                <Text style={styles.textDefault}>{'Date'}</Text>
                <TouchableOpacity onPress={() => openModal(`datetime`)}>
                    <Text style={[styles.header, { borderWidth: 1, borderColor: 'lightgrey', padding: 5 }]}>{moment(date).format('dddd LL')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openModal(`datetime`)} style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between', marginBottom: 10 }}>
                    <View>
                        <Text style={styles.textDefault}>{'Start'}</Text>
                        <Text style={[styles.header, { borderWidth: 1, borderColor: 'lightgrey', padding: 5 }]}>{moment(date).format('hh:mm a')}</Text>
                    </View>
                    <View>
                        <Text style={styles.textDefault}>{'End'}</Text>
                        <Text style={[styles.header, { borderWidth: 1, borderColor: 'lightgrey', padding: 5 }]}>{moment(endDate).format('hh:mm a')}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openModal(`package`)} style={{ marginBottom: 10 }}>
                    <Text style={styles.textDefault}>{'Package'}</Text>
                    <Text style={[styles.header, { borderWidth: 1, borderColor: 'lightgrey', padding: 5, marginBottom: 5 }]}>{pack}</Text>
                    <Text style={[styles.header, { borderWidth: 1, borderColor: 'lightgrey', padding: 5 }]}>{note}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 10, backgroundColor: '#FEFAF2', borderWidth: 1, borderColor: '#EAEBFF', padding: 10 }}>
                <Text style={[styles.header]}>{'Customer Info'}</Text>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
                <TouchableOpacity onPress={() => openModal(`customer`)} style={{ marginBottom: 10 }}>

                    <Text style={styles.textDefault}>{'Name'}</Text>
                    <Text style={[styles.header, { borderWidth: 1, borderColor: 'lightgrey', padding: 5 }]}>{customerInfo.name}</Text>
                </TouchableOpacity>
                <View style={{ marginBottom: 10 }}>
                    <Text style={styles.textDefault}>{'Phone Number'}</Text>
                    <Text style={[styles.header, { borderWidth: 1, borderColor: 'lightgrey', padding: 5 }]}>{customerInfo.phone}</Text>
                </View>
            </View>
        </ScrollView>
    );
}



const DateAndTime = ({ openModal, date, setDate, endDate, setEndDate, setSelectedSlot }: any) => {
    //////START DATE FUNCTIONS/////

    const [show, setShow] = useState(false);
    const [showDateDatePicker, setShowDateDatePicker] = useState(false);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    //const slots = [{ slot: 'a', selected: false }, { slot: 'b', selected: false }]

    const dispatch = useDispatch()
    const { slotList } = useSelector((state: any) => state.slotListReducer, shallowEqual)
    const { taskList } = useSelector((state: any) => state.taskListReducer, shallowEqual)


    const withinRange = taskList.find(tD => moment(date).isBetween(moment(tD.dateStart), moment(tD.dateEnd)))
    const initAvailableSlots = slotList.filter(s => !taskList.find(tD => moment(date).isBetween(moment(tD.dateStart), moment(tD.dateEnd)) && tD.slot === s.name))

    const [availableSlots, setAvailableSlots] = useState(initAvailableSlots)

    useEffect(() => {
        const newAvailableSlots = slotList.filter(s => !taskList.find(tD => moment(date).isBetween(moment(tD.dateStart), moment(tD.dateEnd)) && tD.slot === s.name))
        setAvailableSlots(newAvailableSlots)

    }, [date]);


    const onChange = (_event: Event, selectedDate: Date) => {
        !ios && setShowDateDatePicker(false)
        !ios && setShowEndDatePicker(false)
        !ios && setShowStartDatePicker(false)
        const currentDate = selectedDate || date;
        setShow(ios);
        setDate(currentDate);
    };

    const onChangeEndDate = (_event: Event, selectedDate: Date) => {
        !ios && setShowDateDatePicker(false)
        ios && setShowEndDatePicker(false)
        !ios && setShowStartDatePicker(false)
        const currentDate = selectedDate || date;
        setShow(ios);
        setEndDate(currentDate);

    };



    const showDatepicker = () => {

        setShowDateDatePicker(true)
        setShowEndDatePicker(false)
        setShowStartDatePicker(false)
    };

    const showTimeStart = () => {
        setShowDateDatePicker(false)
        setShowEndDatePicker(false)
        setShowStartDatePicker(true)

    }
    const showTimeEnd = () => {
        setShowDateDatePicker(false)
        setShowEndDatePicker(true)
        setShowStartDatePicker(false)

    }


    ///////END DATE FUNCTIONS/////////


    const selectSlot = (x: number) => {
        const allSlot: Array<SlotInterface> = availableSlots
        availableSlots.map((p: SlotInterface, y: number) => {
            allSlot[y].selected = false
        })
        allSlot[x].selected = true
        //console.log(`packages ialah ${JSON.stringify(packages)}`)
        setAvailableSlots([...allSlot])
        setSelectedSlot(allSlot[x])
    }

    return (
        <View style={{ alignSelf: 'stretch', marginTop: Constants.statusBarHeight, padding: 10 }}>

            <View style={{ marginBottom: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: 'lightgrey' }}>
                <Text style={styles.textDefault}>{'Date'}</Text>
                <TouchableOpacity onPress={showDatepicker} style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[styles.header, { borderWidth: 1, borderColor: 'lightgrey', padding: 5 }]}>{moment(date).format('dddd LL')}</Text>
                    <Text>Edit</Text>
                </TouchableOpacity>
                {showDateDatePicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        // textColor="red" 
                        minuteInterval={15}
                    />
                )}
            </View>


            <View style={{ marginBottom: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: 'lightgrey' }}>
                <Text style={styles.textDefault}>{'Start'}</Text>
                <TouchableOpacity onPress={showTimeStart} style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[styles.header, { borderWidth: 1, borderColor: 'lightgrey', padding: 5 }]}>{moment(date).format('hh:mm a')}</Text>
                    <Text>Edit</Text>
                </TouchableOpacity>
                {showStartDatePicker && (
                    <DateTimePicker
                        testID="dateTimePicker1"
                        value={date}
                        mode={'time'}
                        //minimumDate={moment().toDate()}
                        is24Hour={true}
                        display="spinner"
                        onChange={onChange}
                        // textColor="red" 
                        minuteInterval={15}
                    />
                )}
            </View>

            <View style={{ marginBottom: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: 'lightgrey' }}>
                <Text style={styles.textDefault}>{'End'}</Text>
                <TouchableOpacity onPress={showTimeEnd} style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[styles.header, { borderWidth: 1, borderColor: 'lightgrey', padding: 5 }]}>{moment(endDate).format('hh:mm a')}</Text>
                    <Text>Edit</Text>
                </TouchableOpacity>
                {showEndDatePicker && (
                    <DateTimePicker
                        testID="dateTimePicker2"
                        value={date}
                        mode={'time'}
                        is24Hour={true}
                        display="spinner"
                        onChange={onChangeEndDate}
                        // textColor="red" 
                        minuteInterval={15}
                    />
                )}
            </View>
            <FlatList
                data={availableSlots}
                renderItem={({ item, index }) => <TouchableOpacity onPress={() => selectSlot(index)} style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between', marginVertical: 5 }}>
                    <View>
                        <Ionicons name={'md-checkbox'} size={27} color={item.selected === true ? 'blue' : 'grey'} />
                    </View>
                    <View>
                        <Text>{item.name}</Text>
                    </View>

                </TouchableOpacity>}
                keyExtractor={(item, index) => index.toString()}
                extraData={availableSlots}
            />
            {withinRange && <Text>{JSON.stringify(withinRange)}</Text>}
            <Button onPress={openModal} title="Close" />
        </View>
    )
}

type PackageProps = {
    openModal: Function,
    pack: string,
    setPackage: Function,
    setNote: Function,
}


const Package = ({ openModal, pack, setPackage, setNote, }: PackageProps) => {
    //////START DATE FUNCTIONS/////

    const dispatch = useDispatch()

    const { serviceList } = useSelector((state: any) => state.serviceListReducer, shallowEqual)

    const [packageList, setPackageList] = useState(serviceList)

    const selectPackage = (x: number) => {
        const packages: Array<ServiceInterface> = packageList
        packageList.map((p: ServiceInterface, y: number) => {
            packages[y].selected = false
        })
        packages[x].selected = true
        //console.log(`packages ialah ${JSON.stringify(packages)}`)
        setPackageList([...packages])
        setPackage(packages[x])
    }

    return (
        <View style={{ alignSelf: 'stretch', marginTop: Constants.statusBarHeight, padding: 10 }}>

            <View style={{ marginBottom: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: 'lightgrey' }}>
                <Text style={styles.textDefault}>{'Package'}</Text>
                {/* <Text style={[styles.header, { borderWidth: 1, borderColor: 'lightgrey', padding: 5 }]}>{pack}</Text> */}
                {/* <Picker
                    selectedValue={pack}
                    style={{ height: 88 }}
                    itemStyle={{ height: 88 }}
                    onValueChange={(itemValue: string, itemIndex) => 
                        setPackage(itemValue)
                    }>
                    <Picker.Item label="Full Body Massage" value="Full Body Massage" />
                    <Picker.Item label="Hair Style" value="Hair Style" />
                </Picker> */}

                <FlatList
                    data={packageList}
                    renderItem={({ item, index }) => <TouchableOpacity onPress={() => selectPackage(index)} style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between', marginVertical: 5 }}>
                        <View>
                            <Ionicons name={'md-checkbox'} size={27} color={item.selected === true ? 'blue' : 'grey'} />
                        </View>
                        <View>
                            <Text>{item.name}</Text>
                        </View>

                    </TouchableOpacity>}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={packageList}
                />

            </View>

            <View style={{ marginBottom: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: 'lightgrey' }}>
                <Text style={styles.textDefault}>{'Note'}</Text>
                <TextInput onChangeText={(value) => setNote(value)} multiline={true} numberOfLines={3} style={{ borderWidth: 1, borderColor: 'lightgrey', height: 50 }} />
            </View>
            <Button onPress={openModal} title="Close" />
        </View>
    )
}


const CustomerInfo = ({ openModal, setCustomerInfo }: { openModal: Function, setCustomerInfo: Function, }) => {

    const dispatch = useDispatch()
    const { customerList } = useSelector((state: any) => state.customerListReducer, shallowEqual)


    const [newCustomer, setNewCustomer] = useState({ name: undefined, phone: undefined })
    //const [phone, setPhone] = useState('')

    //const customerList = [{ name: 'Jenab', phone: '01234567890' }, { name: 'Mariam', phone: '01234567890' }]
    const name: any = newCustomer.name
    const filteredCustomerList = customerList.filter((c: CustomerInterface) => c?.name?.toLowerCase().includes(name?.toLowerCase()))

    const getCustomer = (val: CustomerInterface | undefined) => {
        //console.log(`customer is ${name}`)
        setCustomerInfo(val)
        //setCustomerPhone(name)
        openModal()
    }

    const setNewCustomerDetail = (val: object) => {
        const newC = { ...newCustomer, ...val }
        setNewCustomer(newC)
    }

    return (
        <View style={{ alignSelf: 'stretch', marginTop: Constants.statusBarHeight, padding: 10 }}>
            <View style={{ marginBottom: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: 'lightgrey' }}>
                <Text style={styles.textDefault}>{'Name'}</Text>
                <TextInput onChangeText={(value) => setNewCustomerDetail({ name: value })} style={{ borderWidth: 1, borderColor: 'lightgrey', height: 44 }} />
            </View>
            <View style={{ marginBottom: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: 'lightgrey' }}>
                <Text style={styles.textDefault}>{'Phone Number'}</Text>
                <TextInput onChangeText={(value) => setNewCustomerDetail({ phone: value })} style={{ borderWidth: 1, borderColor: 'lightgrey', height: 44 }} />
            </View>
            <Button onPress={openModal} title="Close" />
            {newCustomer && <TouchableOpacity onPress={() => getCustomer(newCustomer)} style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
                <View>
                    <Text>{newCustomer?.name}</Text>
                    <Text>{newCustomer?.phone}</Text>
                </View>
                <View>
                    <Text>Select</Text>
                </View>
            </TouchableOpacity>}
            <FlatList
                data={filteredCustomerList}
                renderItem={({ item, index }) => <TouchableOpacity onPress={() => getCustomer({ name: item.name, phone: item.phone })} style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
                    <View>
                        <Text>{item.name}</Text>
                        <Text>{item.phone}</Text>
                    </View>
                    <View>
                        <Text>Select</Text>
                    </View>
                </TouchableOpacity>}
                keyExtractor={(item, index) => index.toString()}
                extraData={filteredCustomerList}
            />
        </View>
    )
}