import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '../context/user-context'
import predefinedExercises from '../utils/predefined-exercises';

/* Workout hook */
const useWorkout = (wid) => {
   const {user, dispatch} = useUser()
   const [workout, setWorkout] = useState(user.workouts[wid])

   useEffect(() => {
      setWorkout(user.workouts[wid])
   }, [user.workouts, wid])

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

   const completeExercise = (eid) => {
      const exercises = {...workout.exercises}
      const completedExercises = {...workout.completedExercises}

      // Remove the eid from exercises and save
      const completedExercise = exercises[eid]
      delete exercises[eid]
      completedExercises[eid] = completedExercise

      dispatch({type: 'updateWorkout', wid: wid, workoutUpdates: {
         exercises: exercises,
         completedExercises: completedExercises
      }})
   }

   const removeExercise = (eid) => {
      const updatedExercises = {...workout.exercises}
      delete updatedExercises[eid]

      dispatch({type: 'updateWorkout', wid: wid, workoutUpdates: {
         exercises: updatedExercises
      }})
   }

   const addSet = (eid) => {
      console.log('workout', workout.exercises[eid])
      console.log('eid', eid)
      // First create new set using setnames
      const newSet = {}
      workout.exercises[eid].setNames.forEach((name) => {
         newSet[name] = 0;
      })

      // Dispatch: updateExercise
      dispatch({type: 'updateExercise', wid: wid, eid: eid, exerciseUpdates: {
         sets: [
            ...workout.exercises[eid].sets,
            newSet
         ]
      }})
   }

   const removeSet = (eid) => {
      // Remove last set from set array
      const newSetArray = [...workout.exercises[eid].sets]
      newSetArray.pop();

      // Dispatch: updateExercise
      dispatch({type: 'updateExercise', wid: wid, eid: eid, exerciseUpdates: {
         sets: newSetArray
      }})
   }

   const updateSet = (eid, setIndex) => (setName, newValue) => {
      console.log(eid, setIndex, newValue)
      // Create and update the new set
      const newSetArray = [...workout.exercises[eid].sets]
      newSetArray[setIndex][setName] = newValue

      // Dispatch: updateExercise
      dispatch({type: 'updateExercise', wid: wid, eid: eid, exerciseUpdates: {
         sets: newSetArray
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
      user.exerciseTypes,
      addExercise,
      completeExercise,
      removeExercise,
      addSet,
      removeSet,
      updateSet, 
      completeWorkout
   ]
}

export {
   useWorkout
}