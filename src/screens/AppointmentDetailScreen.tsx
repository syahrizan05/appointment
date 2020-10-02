import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, SectionList, TouchableOpacity, Modal, Button, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { Text, View } from '../components/Themed';
import styles from '../styles/styles'
import DateTimePicker from '@react-native-community/datetimepicker';
import Constants from "expo-constants";

const moment = extendMoment(Moment);

interface Task {
    date: string;
    task: string;
    customer?: string;
}

interface AppDayInterface {
    title: string;
    data: Array<Task>;
}


export default function AppointmentDetailScreen({ navigation }: any) {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeftt: () => (
                <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={() => navigation.goBack()}>
                    <Ionicons name={'ios-add'} size={30} />
                </TouchableOpacity>
            ),

        });
    }, [navigation]);



    return (
        <View style={[styles.container,{paddingHorizontal:10}]}>
            <View style={{marginBottom:10}}>
                <Text style={styles.header}>{moment().format('dddd LL')}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'stretch',justifyContent:'space-between',marginBottom:10 }}>
                <View>
                    <Text style={styles.textDefault}>{'Start'}</Text>
                    <Text style={styles.header}>{moment().format('hh:mm a')}</Text>
                </View>
                <View>
                    <Text style={styles.textDefault}>{'End'}</Text>
                    <Text style={styles.header}>{moment().format('hh:mm a')}</Text>
                </View>
            </View>
            <View style={{marginBottom:10}}>
                <Text style={styles.textDefault}>{'Pakage'}</Text>
                <Text style={styles.header}>{`Full Body Massage`}</Text>
                <Text style={styles.header}>{'Notes'}</Text>
            </View>
           
            <View style={{marginBottom:10}}>
                <Text style={styles.header}>{'Customer Info'}</Text>
            </View>
            <View style={{marginBottom:10}}>

                <Text style={styles.textDefault}>{'Name'}</Text>
                <Text style={styles.header}>{'Name'}</Text>
            </View>
            <View style={{marginBottom:10}}>

                <Text style={styles.textDefault}>{'Phone Number'}</Text>
                <Text style={styles.header}>{'Phone Number'}</Text>
            </View>
        </View>
    );
}



