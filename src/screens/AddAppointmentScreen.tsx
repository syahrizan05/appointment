import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, SectionList, TouchableOpacity, Modal, Button, Platform, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { Text, View } from '../components/Themed';
import styles from '../styles/styles'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-community/picker';
import { taskDates } from '../db/data'

import Constants from "expo-constants";

const moment = extendMoment(Moment);

interface Task {
    date: string;
    task: string;
    customer?: string;
}



export default function AddAppointmentScreen({ navigation }: any) {


    const [modalVisible, setModalVisible] = useState(false);
    const [screen, setScreen] = useState('');

    const [date, setDate] = useState(moment().toDate());
    const [endDate, setEndDate] = useState(moment().toDate());

    const [pack, setPackage] = useState('');
    const [note, setNote] = useState('');

    const withinRange = taskDates.find(tD => moment(date).isBetween(moment(tD.dateStart), moment(tD.dateEnd)))


    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeftt: () => (
                <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={() => navigation.goBack()}>
                    <Ionicons name={'ios-add'} size={30} />
                </TouchableOpacity>
            ),

        });
    }, [navigation]);

    const openModal = (screenType: string) => {
        setScreen(screenType)
        setModalVisible(!modalVisible)

    }




    return (
        <View style={[styles.container, { paddingHorizontal: 10 }]}>
            <Modal visible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)}>
                {screen === 'datetime' ? <DateAndTime withinRange={withinRange} date={date} setDate={setDate} endDate={endDate} setEndDate={setEndDate} openModal={() => openModal(screen)} />
                    : screen === 'package' ? <Package pack={pack} setPackage={setPackage} setNote={setNote} openModal={() => openModal(screen)} />
                        : screen === 'customer' ? <CustomerInfo openModal={() => openModal(screen)} />
                            : <View />
                }

            </Modal>


            <View style={{ marginBottom: 10 }}>
                <Text style={[styles.header, { borderWidth: 1, borderColor: 'lightgrey', padding: 5 }]}>{moment(date).format('dddd LL')}</Text>
            </View>
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
                <Text style={[styles.header, { borderWidth: 1, borderColor: 'lightgrey', padding: 5 }]}>{pack}</Text>
                <Text style={[styles.header, { borderWidth: 1, borderColor: 'lightgrey', padding: 5 }]}>{note}</Text>
            </TouchableOpacity>

            <View style={{ marginBottom: 10 }}>
                <Text style={[styles.header]}>{'Customer Info'}</Text>
            </View>
            <TouchableOpacity onPress={() => openModal(`customer`)} style={{ marginBottom: 10 }}>

                <Text style={styles.textDefault}>{'Name'}</Text>
                <Text style={[styles.header, { borderWidth: 1, borderColor: 'lightgrey', padding: 5 }]}>{'Name'}</Text>
            </TouchableOpacity>
            <View style={{ marginBottom: 10 }}>

                <Text style={styles.textDefault}>{'Phone Number'}</Text>
                <Text style={[styles.header, { borderWidth: 1, borderColor: 'lightgrey', padding: 5 }]}>{'Phone Number'}</Text>
            </View>
        </View>
    );
}



const DateAndTime = ({ openModal, date, setDate, endDate, setEndDate, withinRange }: any) => {
    //////START DATE FUNCTIONS/////

    const [show, setShow] = useState(false);
    const [showDateDatePicker, setShowDateDatePicker] = useState(false);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);


    const onChange = (_event: Event, selectedDate: Date) => {
        setShowDateDatePicker(false)
        setShowEndDatePicker(false)
        setShowStartDatePicker(false)
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

    };

    const onChangeEndDate = (_event: Event, selectedDate: Date) => {
        setShowDateDatePicker(false)
        setShowEndDatePicker(false)
        setShowStartDatePicker(false)
        const currentDate = selectedDate || endDate;
        setShow(Platform.OS === 'ios');
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
                        display="spinner"
                        onChange={onChange}
                        // textColor="red" 
                        minuteInterval={15}
                    />
                )}
            </View>
            {withinRange && <Text>Within Range {withinRange.task}</Text>}

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
                        minimumDate={moment().toDate()}
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
                        value={endDate}
                        mode={'time'}
                        is24Hour={true}
                        display="spinner"
                        onChange={onChangeEndDate}
                        // textColor="red" 
                        minuteInterval={15}
                    />
                )}
            </View>
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


const Package = ({ openModal, pack, setPackage, setNote }: PackageProps) => {
    //////START DATE FUNCTIONS/////


    const packageType = [{ name: 'Full Body', selected: false }, { name: 'Hair Style', selected: false }]

    const [packageList, setPackageList] = useState(packageType)

    const selectPackage = (index: number) => {
        const packages = packageList
        packageList.map((p, index) => {
            packages[index].selected = false
        })
        packages[index].selected = true
        //console.log(`packages ialah ${JSON.stringify(packages)}`)
        setPackageList([...packages])
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


const CustomerInfo = ({ openModal }: { openModal: Function }) => {

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const customerList = [{ name: 'Jenab', phone: '01234567890' }, { name: 'Mariam', phone: '01234567890' }]
    const filteredCustomerList = customerList.filter(c => c.name.includes(name))

    return (
        <View style={{ alignSelf: 'stretch', marginTop: Constants.statusBarHeight, padding: 10 }}>

            <View style={{ marginBottom: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: 'lightgrey' }}>
                <Text style={styles.textDefault}>{'Name'}</Text>
                <TextInput onChangeText={(value) => setName(value)} style={{ borderWidth: 1, borderColor: 'lightgrey', height: 44 }} />
            </View>
            <View style={{ marginBottom: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: 'lightgrey' }}>
                <Text style={styles.textDefault}>{'Phone Number'}</Text>
                <TextInput onChangeText={(value) => setPhone(value)} style={{ borderWidth: 1, borderColor: 'lightgrey', height: 44 }} />
            </View>
            <Button onPress={openModal} title="Close" />
            <FlatList
                data={filteredCustomerList}
                renderItem={({ item, index }) => <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
                    <View>
                        <Text>{item.name}</Text>
                        <Text>{item.phone}</Text>
                    </View>
                    <View>
                        <Text>Select</Text>
                    </View>
                </View>}
                keyExtractor={(item, index) => index.toString()}
                extraData={filteredCustomerList}
            />
        </View>
    )
}