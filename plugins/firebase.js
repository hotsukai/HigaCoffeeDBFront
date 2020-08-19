import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// SDKを使用するためのConfig情報
const firebaseConfig = {
    apiKey: "AIzaSyDYlHpVlwkHdbjVGLBuSkmBCRnPM5Gwnfk",
    authDomain: "higadbapp.firebaseapp.com",
    databaseURL: "https://higadbapp.firebaseio.com",
    projectId: "higadbapp",
    storageBucket: "higadbapp.appspot.com",
    messagingSenderId: "166806901337",
    appId: "1:166806901337:web:bc94f0e1f87025d4ed1748",
    measurementId: "G-KFXGGC7ZM1"
};
// Appの初期化
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
// 今回使用するAPI
export const auth = firebase.auth()
export const firestore = firebase.firestore()