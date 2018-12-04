import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var config = process.env.NODE_ENV === 'development' ?
{
    apiKey: "AIzaSyBBQRtjYOaAGOygfSeqA4ypnrn2S9ob1l0",
    authDomain: "maquina-dev.firebaseapp.com",
    databaseURL: "https://maquina-dev.firebaseio.com",
    projectId: "maquina-dev",
    storageBucket: "maquina-dev.appspot.com",
    messagingSenderId: "617260439696"
} :
{
    apiKey: "AIzaSyAd3jgIfu6-ePo5jxDcs0ou0jtVz6Zyjl4",
    authDomain: "maquina-prod.firebaseapp.com",
    databaseURL: "https://maquina-prod.firebaseio.com",
    projectId: "maquina-prod",
    storageBucket: "maquina-prod.appspot.com",
    messagingSenderId: "914969412775"
};

firebase.initializeApp(config);

const database = firebase.database();
const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleAuthProvider, database as default };


