import { useReducer } from 'react'

/**
 * This reducer controls all data updates
 */
const globalReducer = (state, action) => {
   switch(action.type){
      /* User meta data requests */
      case 'updateUser': {
         return Object.assign(state, action.userUpdates)
      }

      /* Workout requests */
      case 'createNewWorkout': {
         // Use the current date and time as the unique id
         const now = new Date();
         console.log('Creating new workout...')

         return {
            ...state,
            currentWorkoutID: action.wid,
            isWorkingOut: true,
            workouts: {
               [action.wid]: {
                  wid: action.wid,
                  completed: false,
                  dateStarted: now.toISOString,
                  timeStarted: now.getTime,
                  timeEnded: null,
                  exercises: {}
               },
               // Add the new workout to the top
               ...state.workouts
            }
         }
      }

      case 'updateWorkout': {
         return {
            ...state,
            workouts: {
               ...state.workouts,
               [action.wid]: Object.assign(state.workouts[action.wid], action.workoutUpdates)
            }
         }
      }

      case 'updateExercise': {
         return {
            ...state,
            workouts: {
               ...state.workouts,
               [action.wid]: {
                  ...state.workouts[action.wid],
                  exercises: {
                     ...state.workouts[action.wid].exercises,
                     [action.eid]: Object.assign(state.workouts[action.wid].exercises[action.eid], action.exerciseUpdates)
                  }
               }
            }
         }
      }

      /* OVERWRITE DATA (Only use for restarting data) */
      case 'SET_DATA': {
         return action.newState
      }

      default: {
         throw new Error(`Unhandled action type: ${action.type}`)
      }
   }
}

/**
 * Hooks into the global state and dispatch
 */
const useGlobalState = (initialState = {}) => {
   return useReducer(globalReducer, initialState)
}

export { useGlobalState }