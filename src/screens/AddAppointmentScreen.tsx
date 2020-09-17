import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, SectionList, TouchableOpacity, Modal, Button, Platform, TextInput, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { Text, View } from '../components/Themed';
import styles from '../styles/styles'
import DateTimePicker from '@react-native-community/datetimepicker';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Constants from "expo-constants";
import * as actionCreator from '../store/actions/action'
import { Task, AppDayInterface, SlotInterface, ServiceInterface, CustomerInterface } from '../types'
const moment = extendMoment(Moment);
const ios = Platform.OS === 'ios'


export default function AddAppointmentScreen({ navigation }: any) {

    const dispatch = useDispatch()
    //const { taskList } = useSelector((state: any) => state.taskListReducer, shallowEqual)
    const [modalVisible, setModalVisible] = useState(false);
    const [screen, setScreen] = useState('');
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [selectedSlot, setSelectedSlot] = useState(null)
    const [pack, setPackage] = useState({ name: 'Name' });
    const [note, setNote] = useState('Note');
    const [customerInfo, setCustomerInfo] = useState<{ name: undefined | string, phone: undefined | string }>({ name: undefined, phone: undefined });
    //const [customerPhone, setCustomerPhone] = useState('');

    const addTask = () => {
        const value: Task = { dateStart: moment(date).format(), dateEnd: moment(endDate).format(), slot: selectedSlot, task: pack, note, customer: customerInfo }
        dispatch(actionCreator.addTask(value))
        navigation.goBack()
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
        if (screenType == 'datetime') {
            setDate(moment().toDate())
            setEndDate(moment().add(1, 'h').toDate())
        }
        else if (screenType == 'package') { }
        else if (screenType == 'customer') {
            //setCustomerInfo({name:undefined,phone:undefined})
        }
        setScreen(screenType)
        setModalVisible(!modalVisible)
    }

    return (
        <ScrollView style={[styles.container, {}]}>
            <Modal visible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)}>
                {screen === 'datetime' ? <DateAndTime setSelectedSlot={setSelectedSlot} date={date} setDate={setDate} endDate={endDate} setEndDate={setEndDate} openModal={() => openModal(screen)} setModalVisible={setModalVisible} />
                    : screen === 'package' ? <Package setPackage={setPackage} setNote={setNote} openModal={() => openModal(screen)} />
                        : screen === 'customer' ? <CustomerInfo setCustomerInfo={setCustomerInfo} openModal={() => openModal(screen)} />
                            : <View />
                }
            </Modal>
            <TouchableOpacity onPress={() => openModal(`datetime`)}>
                <View style={{ marginBottom: 10, backgroundColor: '#FEFAF2', borderWidth: 1, borderColor: '#EAEBFF', padding: 10 }}>
                    <Text style={[styles.header]}>{'Date & Time'}</Text>
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={[styles.header, { borderWidth: 1, borderColor: 'lightgrey', padding: 5, marginBottom: 5 }]}>{date ? moment(date).format('dddd LL') : 'Date'}</Text>
                    <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between', marginBottom: 10 }}>
                        <View>
                            <Text style={[styles.header, { borderWidth: 1, borderColor: 'lightgrey', padding: 5 }]}>{date ? moment(date).format('hh:mm a') : 'Start'}</Text>
                        </View>
                        <View>
                            <Text style={[styles.header, { borderWidth: 1, borderColor: 'lightgrey', padding: 5 }]}>{endDate ? moment(endDate).format('hh:mm a') : 'End'}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openModal(`package`)} style={{ marginBottom: 10 }}>
                <View style={{ marginBottom: 10, backgroundColor: '#FEFAF2', borderWidth: 1, borderColor: '#EAEBFF', padding: 10 }}>
                    <Text style={[styles.header]}>{'Package'}</Text>
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={[styles.header, { borderWidth: 1, borderColor: 'lightgrey', padding: 5, marginBottom: 5 }]}>{pack.name}</Text>
                    <Text style={[styles.header, { borderWidth: 1, borderColor: 'lightgrey', padding: 5 }]}>{note}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openModal(`customer`)} style={{ marginBottom: 10 }}>
                <View style={{ marginBottom: 10, backgroundColor: '#FEFAF2', borderWidth: 1, borderColor: '#EAEBFF', padding: 10 }}>
                    <Text style={[styles.header]}>{'Customer Info'}</Text>
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.header, { borderWidth: 1, borderColor: 'lightgrey', padding: 5 }]}>{customerInfo?.name??'Name'}</Text>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.header, { borderWidth: 1, borderColor: 'lightgrey', padding: 5 }]}>{customerInfo?.phone??'Phone'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
}

const DateAndTime = ({  date, setDate, endDate, setEndDate, setSelectedSlot,setModalVisible }: any) => {
    //////START DATE FUNCTIONS/////

    const [show, setShow] = useState(false);
    const [showDateDatePicker, setShowDateDatePicker] = useState(false);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
   
    const { slotList } = useSelector((state: any) => state.slotListReducer, shallowEqual)
    const { taskList } = useSelector((state: any) => state.taskListReducer, shallowEqual)


    const withinRange = taskList.find((tD: Task) => moment(date).isBetween(moment(tD.dateStart), moment(tD.dateEnd)))
    const initAvailableSlots = slotList.filter((s: SlotInterface) => !taskList.find((tD: Task) => moment(date).isBetween(moment(tD.dateStart), moment(tD.dateEnd)) && tD.slot === s.name))

    const [availableSlots, setAvailableSlots] = useState(initAvailableSlots)

    useEffect(() => {
        const newAvailableSlots = slotList.filter((s: SlotInterface) => !taskList.find((tD: Task) => moment(date).isBetween(moment(tD.dateStart), moment(tD.dateEnd)) && tD.slot === s.name))
        newAvailableSlots[0].selected = true
        setAvailableSlots(newAvailableSlots)

    }, [date]);

    const onChange = (_event: any, selectedDate: Date | undefined) => {
        !ios && setShowDateDatePicker(false)
        !ios && setShowEndDatePicker(false)
        !ios && setShowStartDatePicker(false)
        const currentDate = selectedDate;
        setShow(ios);
        setDate(currentDate);
        setEndDate(moment(currentDate).add(1, 'h').toDate());
    };

    const onChangeEndDate = (_event: any, selectedDate: Date | undefined) => {
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
                        onChange={(event, value) => onChange(event, value)}
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
                renderItem={({ item, index }) =>
                    <TouchableOpacity onPress={() => selectSlot(index)} style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between', marginVertical: 5 }}>
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
            <Button onPress={()=>setModalVisible(false)} title="Close" />
        </View>
    )
}

type PackageProps = {
    openModal: Function,
    setPackage: Function,
    setNote: Function,
}

const Package = ({ openModal, setPackage, setNote, }: PackageProps) => {
    //////START DATE FUNCTIONS/////
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
            <Button onPress={() => openModal(false)} title="Close" />
        </View>
    )
}


const CustomerInfo = ({ openModal, setCustomerInfo }: { openModal: Function, setCustomerInfo: Function, }) => {

    const { customerList } = useSelector((state: any) => state.customerListReducer, shallowEqual)
    const [newCustomer, setNewCustomer] = useState({ name: undefined, phone: undefined })
    
    const name: any = newCustomer.name
    const filteredCustomerList = name ? customerList.filter((c: CustomerInterface) => c?.name?.toLowerCase().includes(name?.toLowerCase())) : customerList

    const getCustomer = (val: CustomerInterface | undefined) => {
        setCustomerInfo(val)
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
            <Button onPress={() => openModal(false)} title="Close" />
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