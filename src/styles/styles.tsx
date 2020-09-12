import { StyleSheet } from 'react-native'
import Layout from '../constants/Layout'
import Constants from 'expo-constants';


const fontSize = 14

const elevationShadowStyle = (elevation: number) => {
  return {
    elevation,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 * elevation },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation
  };
}


export const styles =
  StyleSheet.create({

    container: {
      flex: 1,
      marginHorizontal: 0,
      paddingHorizontal: 0
    },
    item: {
      backgroundColor: "#f9c2ff",
      //paddingLeft: 10,
      marginRight: 10,
      marginVertical: 10
    },
    header: {
      fontSize: 20,
      backgroundColor: "#fff",
      //paddingVertical: 10
    },
    title: {
      fontSize: 20
    },
    textDefault: { fontSize: 17 },
   
    shadow: {
      ...elevationShadowStyle(5),
      backgroundColor: 'white' // It'll look weird without a background color!
    },
  

  });

export default styles