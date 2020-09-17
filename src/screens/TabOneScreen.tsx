import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, SectionList, TouchableOpacity, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { Text, View } from '../components/Themed';
import styles from '../styles/styles'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import { Task, AppDayInterface } from '../types'


const moment = extendMoment(Moment);




export default function TabOneScreen({ navigation }: any) {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actionCreator.populateTasks())
    dispatch(actionCreator.populateServices())
    dispatch(actionCreator.populateSlots())
    dispatch(actionCreator.populateCustomers())
  }, [])

  const { taskList } = useSelector((state: any) => state.taskListReducer, shallowEqual)


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



  const today = moment().format()
  const lastDay = moment().add(15, 'd').format()
  const range = moment.range(moment(today), moment(lastDay))
  const days = Array.from(range.by('day'))

  const appointmentDay: Array<AppDayInterface> = []
  days.map(d => {
    const tasks: Array<Task> = taskList?.filter(tD => moment(tD.dateStart).isSame(d, 'day'))
    appointmentDay.push({ title: d.format('dddd LL'), data: tasks?.length > 0 ? tasks : [{ dateStart: undefined, dateEnd: undefined, task: 'NA', customer: '' }] })
    appointmentDay[0].title = 'Today'
  })

  //taskList&&console.log(`tasklist ialah ${JSON.stringify(taskList)}`)

  return (
    <View style={styles.container}>

      <SectionList
        SectionSeparatorComponent={() => <View style={{ borderBottomWidth: 1, borderColor: '#EAEBFF' }} />}
        //ListEmptyComponent={() => <View style={{ borderBottomWidth: 1 }} />}
        sections={appointmentDay}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Item task={item} navigation={navigation} />}
        renderSectionHeader={({ section: { title } }) => (
          <View style={{ padding: 10, backgroundColor: '#FEFAF2' }}><Text style={styles.header}>{title}</Text></View>
        )}
      />
    </View>
  );
}

const Item = ({ task, navigation }: any) => (
  <TouchableOpacity onPress={() => navigation.navigate('AppointmentDetail')} style={[styles.item, { backgroundColor: '#FEBCC8', paddingLeft: 5 }]}>
    {task.task !== `NA` && <View style={[{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }]}>
      <Text style={styles.textDefault}>{moment(task.dateStart).format('hh:mm a')}</Text>
      <Text style={styles.textDefault}>{moment(task.dateEnd).format('hh:mm a')}</Text>
    </View>}
    <View style={[{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }]}>
      <Text style={styles.textDefault}>{task.task.name}</Text>
      <Text style={styles.textDefault}>{task.customer.name}</Text>
    </View>
  </TouchableOpacity>
);



