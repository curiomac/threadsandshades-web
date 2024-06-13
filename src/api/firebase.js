// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyDtTO0JUdpGBQoPy4ABYImJBdFkhnT67YE",
    authDomain: "threadsandshades-2023.firebaseapp.com",
    projectId: "threadsandshades-2023",
    storageBucket: "threadsandshades-2023.appspot.com",
    messagingSenderId: "1055792516204",
    appId: "1:1055792516204:web:a2f86163ecc37c3306dc49",
    measurementId: "G-Y1ME04WH0N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            const token = await getToken(messaging,
                { vapidKey: 'BGI72c3acay_vr3SD9SJEw13SKrXP4AZlCwNZDELGn8k-hgkJLcnYztYmp4oC2ihcxYkf2D0NbS3B4KJJ_aHTVI' }
            );
            localStorage.setItem('fcm-token', token)
            console.log('FCM Token:', token);
            // Send the token to your backend to store it and use it to send push notifications
        } else {
            console.log('Notification permission denied');
        }
    } catch (error) {
        console.log('Error getting FCM token', error);
    }
}