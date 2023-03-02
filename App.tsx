/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {
  sendMultiDeviceNotification,
  sendSingleDeviceNotification,
} from './src/utils/Notification.js';

function App(): JSX.Element {
  const [token, setToken] = useState('');
  useEffect(() => {
    //UNTUK MENDAPATKAN TOKEN UNIK, YG DAPAT DI GUNAKAN UNTUK MENGIRIM NOTIFIKASI KE DEVICE TERTENTU
    getFCMToken();
    //IZIN AGAR MENDAPATKAN NOTIFIKASI
    requestPermission();
    //MENUNGGU NOTIFIKASI DARI FCM DATANG
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('remoteMessage', JSON.stringify(remoteMessage));
      DisplayNotification(remoteMessage);
      //MENAMPILKAN ALERT KETIKA ADA NOTIFIKASI DARI FCM
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const getFCMToken = () => {
    messaging()
      .getToken()
      .then(token => {
        //menyimpan ke database
        // return saveTokenToDatabase(token);

        console.log('token=>>>', token);
        setToken(token);
      });
  };

  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
    console.log('authStatus==>', authStatus);
  };

  async function DisplayNotification(remoteMessage) {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  //YANG LOCAL TIDAK MENGGUNAKAN FCM
  async function localDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.displayNotification({
      title:
        '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
      subtitle: '&#129395;',
      body: 'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
      android: {
        channelId,
        color: '#4caf50',
        actions: [
          {
            title: '<b>Dance</b> &#128111;',
            pressAction: {id: 'dance'},
          },
          {
            title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
            pressAction: {id: 'cry'},
          },
        ],
      },
    });
  }

  const sendSingleNotification = async () => {
    let notificationData = {
      title: 'Send Single Notification',
      body: 'Notifikasi dari aplikasi Single Notification',
      token: token,
    };

    // console.log(notificationData);

    await sendSingleDeviceNotification(notificationData);
  };

  const sendMultiNotification = async () => {
    let notificationData = {
      title: 'Send Multi Notification',
      body: 'Notifikasi dari aplikasi Multi Notification',
      token: [token],
    };

    await sendMultiDeviceNotification(notificationData);
  };

  return (
    // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //   <Button
    //     title="Display Notification"
    //     onPress={() => localDisplayNotification()}
    //   />
    // </View>
    <View
      style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
      <Button
        title="Send Local Notification"
        onPress={localDisplayNotification}
        color="#000"
      />
      <Button
        title="Send Single Notification"
        onPress={sendSingleNotification}
        color="#903"
      />
      <Button
        title="Send Multi Notification"
        onPress={sendMultiNotification}
        color="#126"
      />
    </View>
  );
}

const styles = StyleSheet.create({});

export default App;
