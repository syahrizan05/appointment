import * as firebase from 'firebase';
import moment from 'moment'
// import shortid from 'shortid'
// import _ from 'lodash'
// import * as GoogleSignIn from 'expo-google-sign-in'
// import * as  AppAuth from 'expo-app-auth'

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDDHV_Ahb_ZxUhakF5gOTMbnUTva7CI0Ow",
    authDomain: "syah-190f4.firebaseapp.com",
    databaseURL: "https://syah-190f4.firebaseio.com",
    projectId: "syah-190f4",
    storageBucket: "syah-190f4.appspot.com",
    messagingSenderId: "745146460759",
    appId: "1:745146460759:web:260d7f4365065020281112",
    measurementId: "G-DG3E5759TR"
};

//var conf=
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

var db = firebase.firestore();

export const populateMessage = () => {
    return (dispatch: any, getState: any) => {
        db.collection("messages")
            .onSnapshot(function (querySnapshot: any) {
                const messages: any = [];
                querySnapshot.forEach(function (doc: any) {
                    messages.push(doc.data());
                    console.log(doc.data())
                });
                //console.log("Current cities in CA: ", messages.join(", "));
                dispatch({ type: 'POPULATE_MESSAGE', payload: { messages } })

            });
    }
}

export const login = (email: string, password: string) => {
    return (dispatch: any, getState: any) => {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error: any) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            errorMessage && console.log(error.message)
            // ...
        });
    }
}



export const checkLogin = () => {
    return (dispatch: any, getState: any) => {
        firebase.auth().onAuthStateChanged((user: any) => {
            if (user) {
                // User is signed in.
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                console.log(uid)
                dispatch({ type: 'SET_LOGIN', payload: { loggedIn: true } })


            } else {

                dispatch({ type: 'SET_LOGIN', payload: { loggedIn: false } })
            }
            // ...
        });
    }
}



export const handleSubmit = (values: any) => {
    return (dispatch: any, getState: any) => {
        db.collection("messages").add({
            ...values,
            date: moment().format()

        }).then(() => console.log('added'))
            .catch((error: any) => {
                console.error("Error adding document: ", error);
            })
    }
}




