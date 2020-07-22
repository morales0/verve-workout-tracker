
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '../context/user-context'
import predefinedExercises from '../utils/predefined-exercises';

/* Workout hook */
const useWorkout = (wid) => {
   const {user, dispatch} = useUser()
   const workout = user.workouts[wid]

   // Create new workout if needed
   if (!workout) {
      dispatch({type: 'createNewWorkout'})
   }

   // Define workout functions
   const addExercise = (name) => {
      const newUid = uuidv4()
      const exercises = {...workout.exercises}

      // Find the exercise model, otherwise create a new one
      let newExerciseModel = predefinedExercises[name]

      if (!newExerciseModel) newExerciseModel = {
         name: name,
         setNames: ['reps']
      }

      // Run update on global user state
      dispatch({type: 'updateWorkout', wid: wid, workoutUpdates: {
         exercises: {
            [newUid]: {
               uid: newUid,
               completed: false,
               ...newExerciseModel,
               sets: [],
            },
            ...exercises,
         }
      }})
   }

   const removeExercise = (eid) => {
      const updatedExercises = [...user.workouts[wid].exercises]
      delete updatedExercises[eid]

      dispatch({type: 'updateWorkout', wid: wid, workoutUpdates: {
         exercises: updatedExercises
      }})
   }

   const addSet = (eid) => {
      // First create new set using setnames
      const newSet = {}
      workout[eid].setNames.forEach((name) => {
         newSet[name] = 0;
      })

      // Dispatch: updateExercise
      dispatch({type: 'updateExercise', wid: wid, eid: eid, exerciseUpdates: {
         sets: [
            ...workout[eid].sets,
            newSet
         ]
      }})
   }

   const removeSet = (eid) => {
      // Remove last set from set array
      const newSetArray = [...workout[wid].sets]
      newSetArray.pop();

      // Dispatch: updateExercise
      dispatch({type: 'updateExercise', wid: wid, eid: eid, exerciseUpdates: {
         sets: newSetArray
      }})
   }

   const updateSet = eid => setIndex => setName => newValue => {
      // Create and update the new set
      const newSetArray = [...workout[eid].sets]
      newSetArray[setIndex][setName] = newValue

      // Dispatch: updateExercise
      dispatch({type: 'updateExercise', wid: wid, eid: eid, exerciseUpdates: {
         sets: newSetArray
      }})
   }


   return {
      workout,
      addExercise,
      removeExercise,
      addSet,
      removeSet,
      updateSet
   }
}

export {
   useWorkout
}