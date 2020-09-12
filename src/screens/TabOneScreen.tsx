import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, SectionList, TouchableOpacity, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { Text, View } from '../components/Themed';
import styles from '../styles/styles'

import {taskDates} from '../db/data'


const moment = extendMoment(Moment);

interface Task {
  dateStart?: string;
  dateEnd?: string;
  task: string;
  customer?: string;
  slot?:string;
}

interface AppDayInterface {
  title: string;
  data: Array<Task>;
}


export default function TabOneScreen({ navigation }: any) {


  const [addTaskVisible, setAddTaskVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={() => navigation.navigate('AddAppointment')}>
          <Ionicons name={'ios-add'} size={30} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // const taskDates: Array<Task> = [
  //   { dateStart: moment().add(3, 'd').format(), dateEnd: moment().add(3, 'd').add(2, 'h').format(), task: 'task 1', customer: 'Jenab', slot: 'a' },
  //   { dateStart: moment().add(3, 'd').add(3, 'h').format(), dateEnd: moment().add(3, 'd').add(4, 'h').format(), task: 'task 1.5', customer: 'Timah', slot: 'a' },
  //   { dateStart: moment().add(7, 'd').add(1, 'h').format(), dateEnd: moment().add(7, 'd').format(), task: 'task 2', customer: 'Kak Nor', slot: 'b' },
  //   { dateStart: moment().add(8, 'd').add(2, 'h').format(), dateEnd: moment().add(8, 'd').format(), task: 'task 3', customer: 'Senah', slot: 'a' },
  //   { dateStart: moment().add(10, 'd').add(1, 'h').format(), dateEnd: moment().add(10, 'd').format(), task: 'task 4', customer: 'Jenab', slot: 'a' },
  //   { dateStart: moment().add(12, 'd').add(1, 'h').format(), dateEnd: moment().add(12, 'd').format(), task: 'task 5', customer: 'Jenab', slot: 'a' },
  // ]




  const today = moment().format()
  const lastDay = moment().add(15, 'd').format()
  const range = moment.range(moment(today), moment(lastDay))
  const days = Array.from(range.by('day'))

  const appointmentDay: Array<AppDayInterface> = []
  days.map(d => {
    const tasks: Array<Task> = taskDates.filter(tD => moment(tD.dateStart).isSame(d, 'day'))
    appointmentDay.push({ title: d.format('dddd LL'), data: tasks.length > 0 ? tasks : [{ dateStart: undefined, dateEnd: undefined, task: 'NA', customer: '' }] })
    appointmentDay[0].title = 'Today'
  })


  return (
    <View style={styles.container}>

      <SectionList
        SectionSeparatorComponent={() => <View style={{ borderBottomWidth: 1, borderColor: 'lightgrey' }} />}
        //ListEmptyComponent={() => <View style={{ borderBottomWidth: 1 }} />}
        sections={appointmentDay}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Item task={item} navigation={navigation} />}
        renderSectionHeader={({ section: { title } }) => (
          <View style={{ padding: 10 }}><Text style={styles.header}>{title}</Text></View>
        )}
      />
    </View>
  );
}

const Item = ({ task, navigation }: any) => (
  <TouchableOpacity onPress={() => navigation.navigate('AppointmentDetail')} style={[styles.item, { backgroundColor: 'cornflowerblue', paddingLeft: 5 }]}>
    {task.task !== `NA` && <View style={[{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }]}>
      <Text style={styles.textDefault}>{moment(task.dateStart).format('hh:mm a')}</Text>
      <Text style={styles.textDefault}>{moment(task.dateEnd).format('hh:mm a')}</Text>
    </View>}
    <View style={[{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }]}>
      <Text style={styles.textDefault}>{task.task}</Text>
      <Text style={styles.textDefault}>{task.customer}</Text>
    </View>
  </TouchableOpacity>
);



