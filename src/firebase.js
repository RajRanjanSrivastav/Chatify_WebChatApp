import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA28j-YSGngHu-4t9OOvelPujs0Yss72RY",
    authDomain: "webchatapp-e6a77.firebaseapp.com",
    projectId: "webchatapp-e6a77",
    storageBucket: "webchatapp-e6a77.appspot.com",
    messagingSenderId: "995893469701",
    appId: "1:995893469701:web:3fab0dafd000649c8af26c"
};

//initialize firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;