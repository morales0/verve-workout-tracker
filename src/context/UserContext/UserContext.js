import React, {useReducer} from 'react'
import { v4 as uuidv4 } from 'uuid';

const UserContext = React.createContext();
UserContext.displayName = "UserContext"

/**
 * This reducer is used to keep track of the state in the 
 * current workout page. The user's data in the remote database
 * will be updated incrementally (auto-save)
 * 
 * @param {*} state The current state
 * @param {*} action The necessary parameters to update the state
 */
const workoutReducer = (state, action) => {
   switch (action.type) {
      case 'addExercise': {
         return { ...state, [action.uid] : action.newExercise }
      }

      case 'removeExercise' : {
         const newState = {...state}
         delete newState[action.uid]

         return newState
      }

      case 'updateExercise' : {
         return { ...state, [action.uid] : action.updatedExercise }
      }

      default: {
         throw new Error(`Unhandled action type: ${action.type}`)
      }
   }
}

/**
 * Hook to use teh reducer for the workout page
 * @param {*} initialState 
 */
const useWorkoutReducer = (initialState = {}) => {
   return useReducer(workoutReducer, initialState)
}

const useWorkout = (initialState = {}) => {
   const [state, dispatch] = useReducer(workoutReducer, initialState)

   const addExercise = () => {
      const newUid = uuidv4()

      dispatch({type: 'addExercise', uid: newUid, newExercise: {
         uid: newUid,
         name: "New Exercise",
         setNames: ['reps'],
         sets: []
      }})
   }

   const removeExercise = (uid) => dispatch({type: 'removeExercise', uid: uid})

   const addSet = (uid) => {
      // First create new set using setnames
      const newSet = {}
      state[uid].setNames.forEach((name) => {
         newSet[name] = 0;
      })

      // Add to current array of sets
      const newSetArray = [...state[uid].sets, newSet]

      // Update the exercise object with the new array
      const newExercise = Object.assign(state[uid], {sets: newSetArray})

      // Dispatch: updateExercise
      dispatch({type: 'updateExercise', uid: uid, updatedExercise: newExercise})
   }

   const removeSet = (uid) => {
      // Remove last set from set array
      const newSetArray = [...state[uid].sets]
      newSetArray.pop();

      // Update exercise object
      const newExercise = Object.assign(state[uid], {sets: newSetArray})

      // Dispatch: updateExercise
      dispatch({type: 'updateExercise', uid: uid, updatedExercise: newExercise})
   }

   const updateSet = uid => setIndex => setName => newValue => {
      // Create and update the new set
      const newSetArray = [...state[uid].sets]
      newSetArray[setIndex][setName] = newValue

      // Update the exercise object
      const newExercise = Object.assign(state[uid], {sets: newSetArray})

      console.log("Dispatching update")

      // Dispatch: updateExercise
      dispatch({type: 'updateExercise', uid: uid, updatedExercise: newExercise})
   }

   return {state, addExercise, removeExercise, addSet, removeSet, updateSet}
} 

const UserProvider = (props) => {
   const user = {
      name: 'Francisco',
      data: {

      }
   }

   return (
      <UserContext.Provider value={user} {...props}>
         {props.children}
      </UserContext.Provider>
   )
}

export { useWorkout }