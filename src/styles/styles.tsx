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
      paddingHorizontal: 0,
      //backgroundColor:'#D3EEFF'
    },
    item: {
      backgroundColor: "#f9c2ff",
      //paddingLeft: 10,
      marginRight: 10,
      marginVertical: 10
    },
    header: {
      fontSize: 20,
      //backgroundColor: "#fff",
      color:'black'
      //paddingVertical: 10
    },
    title: {
      fontSize: 20,
      color:'grey'
    },
    textDefault: { fontSize: 17,color:'grey' },
   
    shadow: {
      ...elevationShadowStyle(5),
      backgroundColor: 'white' // It'll look weird without a background color!
    },
  appointmentInfo:{
    //marginBottom: 10,
    backgroundColor: "#FEFAF2",
    borderWidth: 1,
    borderColor: "#EAEBFF",
    padding: 10,
  }

  });

export default styles