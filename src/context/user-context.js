import React, { useContext, useState, useEffect } from 'react'
import ls from 'local-storage'
import { useAuth } from './auth-context'

const newUser ={
   name: 'Verver',
   initials: 'V',
   isWorkingOut: false,
   exerciseTypes: [
      {
         name: 'Pushups',
         setNames: ['reps']
      },
      {
         name: 'Pullups',
         setNames: ['reps']
      },
      {
         name: 'Bench Press',
         setNames: ['weight', 'reps']
      },
      {
         name: 'Shoulder Press',
         setNames: ['weight', 'reps']
      },
      {
         name: 'Body Squats',
         setNames: ['reps'],
      },
      {
         name: 'Dumbell Squats',
         setNames: ['weight', 'reps']
      }
   ],
   workouts: {}
}

const UserContext = React.createContext()

const UserProvider = ({children, userAuth, authenticated, db}) => {
   const [user, setUser] = useState(null)

   // 
   // Update user data when external data is updated
   useEffect(() => {
      if (authenticated) {
         db.ref(`users/${userAuth.uid}`)
            .on('value', snapshot => {
               setUser(snapshot.val())
            })
      } else {
         const lsData = ls.get('userData')

         if (lsData) {
            setUser(lsData)
         } else {
            ls('userData', newUser)
            setUser(newUser)
         }
      }
   }, [authenticated])

   // Update external user data when state is updated
   useEffect(() => {
      if(authenticated) {
      } else {
         ls('userData', user)
      }
   }, [user, authenticated])

   const subscribe = (action, callback) => {
      if (authenticated) {
         switch (action.type) {
            case 'setName':
               db.ref(`users/${user.uid}/workouts/${action.wid}/exercises/${action.eid}/sets/${action.setIndex}/${action.setName}`)
                  .on('value', snapshot => {
                     callback(snapshot)
                  });
               break
            case 'workout':
               db.ref(`users/${user.uid}/workouts/${action.wid}`)
                  .on('value', snapshot => {
                     callback(snapshot)
                  })
               break
            case 'exerciseTypes':
               db.ref(`users/${user.uid}/exerciseTypes`)
                  .on('value', snapshot => {
                     callback(snapshot)
                  })
               break
            default: break
         }
      } 
      // Not logged in, use local storage for now
      else {
         switch (action.type) {
            case 'workout':
               const snapshot = {}
               const workout = user.workouts[action.wid]

               snapshot.val = () => workout
               callback(snapshot)
               break;
            default: break;
         }
      }
   }

   const get = (node, callback) => {
      if (authenticated) {
         switch (node){
            case 'exerciseTypes':
               db.ref(`users/${user.uid}/exerciseTypes`).once('value').then(snapshot => callback(snapshot))
               break
            default: break
         }
      }
   }

   const set = (action, value) => {
      if (authenticated) {
         let workoutRef

         switch (action.type) {
            case 'createWorkout':
               // Create a new workout
               let workoutsRef = db.ref(`users/${user.uid}/workouts`)
               let newRef = workoutsRef.push()
               let workoutKey = newRef.key
               let now = new Date()

               let newWorkout = {
                  wid: workoutKey,
                  completed: false,
                  dateStartedString: now.toDateString(),
                  timeStarted: now.getTime(),
                  timeEnded: null,
                  exercises: false,
               }

               // Add workout to user database
               newRef.set(newWorkout)

               // Update user state
               db.ref(`users/${user.uid}`).update({
                  isWorkingOut: true,
                  currentWorkoutId: workoutKey
               })

               // Return the new key
               return workoutKey
            case 'updateWorkout':
               workoutRef = db.ref(`users/${user.uid}/workouts/${action.wid}`)
               workoutRef.set(value)
               break
            case 'completeWorkout':
               db.ref(`users/${user.uid}/workouts/${action.wid}`).update({completed: true})
               db.ref(`users/${user.uid}`).update({currentWorkoutId: false, isWorkingOut: false})
               break
            case 'createCustomExercise':
               db.ref(`users/${user.uid}/exerciseTypes`).update({
                  [action.name]: {
                     name: action.name,
                     setNames: action.setNames
                  }
               })
               break
            default: break
         }

      } else {
         switch (action.type) {
            case 'createWorkout':
               const now = new Date()

               setUser(curr => {
                  return {
                     ...curr,
                     isWorkingOut: true,
                     currentWorkoutID: action.wid,
                     workouts: {
                        [action.wid]: {
                           wid: action.wid,
                           completed: false,
                           dateStarted: now.toISOString(),
                           timeStarted: now.getTime(),
                           timeEnded: null,
                           exercises: {},
                        },
                        ...curr.workouts
                     }
                  }
               })
      
               break
            default: break;
         }
      }
   }

   return !user ? null : (
      <UserContext.Provider value={{user, authenticated, subscribe, get, set}}>
         {children}
      </UserContext.Provider>
   )
}

/**
 * Gives access to the global user state.
 */
const useUser = () => {
   return useContext(UserContext)
}

export { UserProvider, useUser }