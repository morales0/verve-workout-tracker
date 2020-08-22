import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '../context/user-context'
import predefinedExercises from '../utils/predefined-exercises';

/**
 * Gives access to the state for the specific set name
 */
const useSetName = (wid, eid, setName, index) => {
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

/* Workout hook */
const useWorkout = (wid) => {
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