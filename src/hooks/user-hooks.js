import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '../context/user-context'
import predefinedExercises from '../utils/predefined-exercises';

const useUserData = (authenticated) => {
   // If user is logged in
   if (authenticated){
      
   } 
   // If user is in guest mode
   else {
      
   }

   return []
}

const useWorkout = (wid) => {
   const userapi = useUser()
   const [workout, setWorkout] = useState()
   const [meta, setMeta] = useState({})
   const [exerciseTypes, setExerciseTypes] = useState([])

   // Subscribe to the user's data
   useEffect(() => {
      userapi.subscribe({type: 'workout', wid: wid}, snapshot => {
         const workoutSnap = snapshot.val()
         
         setWorkout(workoutSnap)
         setMeta(curr => {
            return {
               ...curr,
               totalExercises: Object.values(workoutSnap.exercises).reduce((acc, ex) => acc + 1, 0),
               completedExercises: Object.values(workoutSnap.exercises).reduce((acc, ex) => acc + (ex.completed ? 1 : 0), 0),
               uncompletedExercises: Object.values(workoutSnap.exercises).reduce((acc, ex) => acc + (ex.completed ? 0 : 1), 0),
            }
         })
      })

      // Get exercise types once
      userapi.subscribe({type: 'exerciseTypes'}, snapshot => {
         let arr = []

         snapshot.forEach((type) => {
            arr.push(type.val())
         })

         setExerciseTypes(arr)
      })
      // Unsubscribe?
   }, [])

   // Write data when updated
   useEffect(() => {
      if (workout) userapi.set({type: 'updateWorkout', wid: wid}, workout)
   }, [userapi, wid, workout])

   // Functions
   const completeWorkout = () => {
      userapi.set({type: 'completeWorkout', wid: wid})
   }
   
   const createCustomExercise = (name, setNames) => {
      userapi.set({type: 'createCustomExercise', name: name, setNames: setNames})
   }
   
   const addExerciseToWorkout = (name, setNames) => {
      const newUid = uuidv4()

      setWorkout(curr => {
         return {
            ...curr,
            exercises: {
               [newUid]: {
                  eid: newUid,
                  completed: false,
                  name: name,
                  setNames: setNames,
                  sets: false,
               },
               ...curr.exercises
            }
         }
      })
   }
   
   const removeExerciseFromWorkout = (eid) => {
      setWorkout( curr => {
         let updatedExercises = curr.exercises
         delete updatedExercises[eid]

         return {
            ...curr,
            exercises: Object.values(updatedExercises).length === 0 ? false : updatedExercises
         }
      })
   }
   
   const completeExercise = (eid) => {
      setWorkout(curr => {
         return {
            ...curr,
            exercises: {
               ...curr.exercises,
               [eid]: {
                  ...curr.exercises[eid],
                  completed: true
               }
            }
         }
      })
   }
   
   const uncompleteExercise = (eid) => {
      setWorkout(curr => {
         return {
            ...curr,
            exercises: {
               ...curr.exercises,
               [eid]: {
                  ...curr.exercises[eid],
                  completed: false
               }
            }
         }
      })
   }
   
   const addSetToExercise = (eid) => {
      setWorkout(curr => {
         let newSet = {}
         curr.exercises[eid].setNames.forEach((name) => {
            newSet[name] = 0;
         })

         let newSetArray = curr.exercises[eid].sets

         if (newSetArray) {
            newSetArray.push(newSet)
         } else {
            newSetArray = [newSet]
         }

         return {
            ...curr,
            exercises: {
               ...curr.exercises,
               [eid]: {
                  ...curr.exercises[eid],
                  sets: newSetArray
               }
            }
         }
      })
   }

   const removeSetFromExercise = (eid) => {
      setWorkout(curr => {
         let newSetArray = curr.exercises[eid].sets

         if (!newSetArray) return curr

         if (newSetArray.length === 1) {
            newSetArray = false;
         } else {
            newSetArray.pop()
         }

         return {
            ...curr,
            exercises: {
               ...curr.exercises,
               [eid]: {
                  ...curr.exercises[eid],
                  sets: newSetArray
               }
            }
         }
      })
   }
   
   const updateSetName = eid => (setIndex, setName) => value => {
      setWorkout(curr => {
         let setArr = curr.exercises[eid].sets
         setArr[setIndex][setName] = value

         return {
            ...curr,
            exercises: {
               ...curr.exercises,
               [eid]: {
                  ...curr.exercises[eid],
                  sets: setArr
               }
            }
         }
      })
   }

   // Return hooks
   return [
      workout, 
      meta,
      exerciseTypes,
      {
         addExerciseToWorkout,
         completeWorkout,
         createCustomExercise,
         exerciseapi: {
            removeExerciseFromWorkout,
            uncompleteExercise,
            completeExercise,
            addSetToExercise,
            removeSetFromExercise,
            updateSetName
         }
      }
   ]
}

const useSetName = (wid, eid, setIndex, setName) => {
   // Access to user context
   const userapi = useUser()
   // Set up local state
   const [value, setValue] = useState('');

   // Subscribe to the user's data
   useEffect(() => {
      userapi.subscribe({type: 'setName', wid: wid, eid: eid, setIndex: setIndex, setName: setName}, snapshot => {
         setValue(snapshot.val())
      })

      // Unsubscribe?
   }, [])

   // Write data when updated
   useEffect(() => {
      userapi.set({type: 'setName', wid: wid, eid: eid, setIndex: setIndex, setName: setName}, value)
   }, [value])

   // Return hooks
   return [value, setValue]
}



/********* OLD HOOKS *********/
/**
 * Gives access to the state for the specific set name
 */
const useSetNameOLD = (wid, eid, setName, index) => {
   const {user, dispatch} = useUser()
   const [value, setValue] = useState(user.workouts[wid].exercises[eid].sets[index][setName])

   useEffect(() => {
      setValue(user.workouts[wid].exercises[eid].sets[index][setName])
   }, [user, wid, eid, setName, index])

   // Uses the user dispatch to update the specific set name
   const updateValue = (newValue) => {
      const newSetArray = [...user.workouts[wid].exercises[eid].sets]
      newSetArray[index][setName] = newValue;

      // Dispatch: updateExercise
      dispatch({type: 'updateExercise', wid: wid, eid: eid, exerciseUpdates: {
         sets: newSetArray
      }})
   }

   return [value, updateValue]
}

const useExercise = (wid, eid) => {
   const {user, dispatch} = useUser()
   
   const completeExercise = (eid) => {
      dispatch({type: 'updateExercise', wid: wid, eid: eid, exerciseUpdates: {
         completed: true
      }})
   }

   const uncompleteExercise = (eid) => {
      dispatch({type: 'updateExercise', wid: wid, eid: eid, exerciseUpdates: {
         completed: false
      }})
   }
   
   const removeExercise = (eid) => {
      const updatedExercises = {...user.workouts[wid].exercises}
      delete updatedExercises[eid]

      dispatch({type: 'updateWorkout', wid: wid, workoutUpdates: {
         exercises: updatedExercises
      }})
   }

   const addSet = (eid) => {
      // First create new set using setnames
      const newSet = {}
      user.workouts[wid].exercises[eid].setNames.forEach((name) => {
         newSet[name] = 0;
      })

      // Dispatch: updateExercise
      dispatch({type: 'updateExercise', wid: wid, eid: eid, exerciseUpdates: {
         sets: [
            ...user.workouts[wid].exercises[eid].sets,
            newSet
         ]
      }})
   }

   const removeSet = (eid) => {
      // Remove last set from set array
      const newSetArray = [...user.workouts[wid].exercises[eid].sets]
      newSetArray.pop();

      // Dispatch: updateExercise
      dispatch({type: 'updateExercise', wid: wid, eid: eid, exerciseUpdates: {
         sets: newSetArray
      }})
   }

   return [
      user.workouts[wid].exercises[eid],
      completeExercise,
      uncompleteExercise,
      removeExercise,
      addSet,
      removeSet
   ]
}

const useWorkout2 = (wid) => {
   const {user, dispatch} = useUser()
   const [workout, setWorkout] = useState(user.workouts[wid])
   const [meta, setMeta] = useState({})

   useEffect(() => {
      setWorkout(user.workouts[wid])
   }, [user.workouts, wid])

   // Update useful meta data
   useEffect(() => {
      setMeta(curr => {
         return {
            ...curr,
            totalExercises: Object.values(workout.exercises).reduce((acc, ex) => acc + 1, 0),
            completedExercises: Object.values(workout.exercises).reduce((acc, ex) => acc + (ex.completed ? 1 : 0), 0),
            uncompletedExercises: Object.values(workout.exercises).reduce((acc, ex) => acc + (ex.completed ? 0 : 1), 0),
         }
      })

   }, [workout.exercises])

   // Define workout functions
   const addExercise = (name, setNames) => {
      const newUid = uuidv4()
      const exercises = {...workout.exercises}

      // Find the exercise model, otherwise create a new one
      /* let newExerciseModel = predefinedExercises[name]

      if (!newExerciseModel) newExerciseModel = {
         name: name,
         setNames: ['reps']
      } */

      // Run update on global user state
      dispatch({type: 'updateWorkout', wid: wid, workoutUpdates: {
         exercises: {
            [newUid]: {
               eid: newUid,
               completed: false,
               name: name,
               setNames: setNames,
               sets: [],
            },
            ...exercises,
         }
      }})
   }

   const completeWorkout = () => {

      dispatch({type: "updateUser", userUpdates: {
         isWorkingOut: false,
         currentWorkoutID: null,
      }})

      dispatch({type: "updateWorkout", wid: wid, workoutUpdates: {
         completed: true
      }})
   }


   return [
      workout,
      meta,
      user.exerciseTypes,
      addExercise,
      completeWorkout
   ]
}

export {
   useWorkout,
   useExercise,
   useSetName
}