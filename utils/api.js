import { AsyncStorage } from "react-native";
//import { Notifications, Permissions } from 'expo'

export const DECKS_STORAGE_KEY = "Flashcards:decks";
//export const NOTIFICATION_KEY = 'IvyFlashcards:notifications'

/**
 * Return all of the decks along with their titles, questions, and answers
 *
 * @function getDecks
 */
export const getDecks = () => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results =>
    formatDecks(results)
  );
};

const setDummyData = async () => {
  const decks = {
    React: {
      title: "React",
      questions: [
        {
          question: "What is React?",
          answer: "A library for managing user interfaces"
        },
        {
          question: "Where do you make Ajax requests in React?",
          answer: "The componentDidMount lifecycle event"
        }
      ]
    },
    JavaScript: {
      title: "JavaScript",
      questions: [
        {
          question: "What is a closure?",
          answer:
            "The combination of a function and the lexical environment within which that function was declared."
        }
      ]
    }
  };

  await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
  return decks;
};

const formatDecks = async results => {
  //return results === null ? setDummyData() : JSON.parse(results);
  if (results === null) {
    console.log("Results are empty");
    return await setDummyData();
  } else {
    console.log("Results are not empty");
    return JSON.parse(results);
  }
};

/**
 * Take in two arguments, title and card, and will add the card to the list of questions
 * for the deck with the associated title.
 *
 * @function addCardToDeck
 */
export const addCardToDeck = (card, title) => {
  getDecks()
    .then(decks => {
      return {
        ...decks,
        [title]: {
          title,
          questions: decks[title].questions.concat([card])
        }
      };
    })
    .then(newDecks => {
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(newDecks));
    });
};

/**
 * Initialize app data, clear added decks / cards.
 *
 * @function clearDecks
 */
export const clearDecks = () => {
  return AsyncStorage.removeItem(DECKS_STORAGE_KEY);
};

/**
 * Take in a single title argument and add it to the decks.
 *
 * @function saveDeckTitle
 */
export const saveDeckTitle = title => {
  getDecks()
    .then(decks => {
      return {
        ...decks,
        [title]: {
          title,
          questions: []
        }
      };
    })
    .then(newDecks => {
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(newDecks));
    });
};

// export function clearLocalNotification () {
//   return AsyncStorage.removeItem(NOTIFICATION_KEY)
//     .then(Notifications.cancelAllScheduledNotificationsAsync)
// }

// function createNotification () {
//   return {
//     title: 'Learn by Flashcards!',
//     body: "👋 don't forget to review your flashcards today!",
//     ios: {
//       sound: true,
//     },
//     android: {
//       sound: true,
//       priority: 'high',
//       sticky: false,
//       vibrate: true,
//     }
//   }
// }

// export function setLocalNotification () {
//   AsyncStorage.getItem(NOTIFICATION_KEY)
//     .then(JSON.parse)
//     .then((data) => {
//       if (data === null) {
//         Permissions.askAsync(Permissions.NOTIFICATIONS)
//           .then(({ status }) => {
//             if (status === 'granted') {
//               Notifications.cancelAllScheduledNotificationsAsync()

//               let tomorrow = new Date()
//               tomorrow.setDate(tomorrow.getDate() + 1)
//               tomorrow.setHours(20)
//               tomorrow.setMinutes(0)

//               Notifications.scheduleLocalNotificationAsync(
//                 createNotification(),
//                 {
//                   time: tomorrow,
//                   repeat: 'day',
//                 }
//               )

//               AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
//             }
//           })
//       }
//     })
// }