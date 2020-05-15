import {Notifications} from 'expo';
import {AsyncStorage} from 'react-native';
import * as Permissions from 'expo-permissions'


export const NOTIFICATION_KEY = 'Flashcards:notifications'


export function formatDeckTitle(title){
    return {
        [title]: {
            title,
            questions: []
          }
    }
}



export const filterObject = (obj, filter, filterValue) => 
   Object.keys(obj).reduce((acc, val) => 
   (obj[val][filter] === filterValue ? acc : {
       ...acc,
       [val]: obj[val]
   }                                        
), {});



export function clearLocalNotification(){
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification(){
    return{
        title: "Study Time",
        body: "Don't forget to revise your flashcards today",
        ios:{
            sound: true
        },
        android:{
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}


export function setLocalNotification(){
    AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
        if (data === null){
            Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({status}) => {
                if (status === 'granted'){
                    Notifications.cancelAllScheduledNotificationsAsync()


                    let tomorrow = new Date ()
                    tomorrow.setDate(tomorrow.getDate() + 1)
                    tomorrow.setHours(16)
                    tomorrow.setMinutes(0)

                    Notifications.scheduleLocalNotificationAsync(
                        createNotification(),
                        {
                            time: tomorrow,
                            repeat: 'day',
                        }
                    )

                    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                }
            })
        }
    })
}