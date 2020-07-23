
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '../context/user-context'
import predefinedExercises from '../utils/predefined-exercises';

/* Workout hook */
const useWorkout = (wid) => {
   const {user, dispatch} = useUser()
   const workout = user.workouts[wid]

   // Create new workout if needed
   if (!workout) {
      console.log('Updating state...')
      dispatch({type: 'createNewWorkout', wid: wid})
   }

   // Define workout functions
   const addExercise = (name) => {
      const newUid = uuidv4()
      const exercises = {...user.workouts[wid].exercises}

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
               eid: newUid,
               completed: false,
               ...newExerciseModel,
               sets: [],
            },
            ...exercises,
         }
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
      console.log('workout', user.workouts[wid].exercises[eid])
      console.log('eid', eid)
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

   const updateSet = (eid, setIndex) => (setName, newValue) => {
      console.log(eid, setIndex, newValue)
      // Create and update the new set
      const newSetArray = [...user.workouts[wid].exercises[eid].sets]
      newSetArray[setIndex][setName] = newValue

      // Dispatch: updateExercise
      dispatch({type: 'updateExercise', wid: wid, eid: eid, exerciseUpdates: {
         sets: newSetArray
      }})
   }


   return [
      user.workouts[wid],
      (name) => addExercise(name),
      (eid) => removeExercise(eid),
      (eid) => addSet(eid),
      (eid) => removeSet(eid),
      updateSet
   ]
}

export {
   useWorkout
}