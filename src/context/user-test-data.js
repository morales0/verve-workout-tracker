const testUserData = {
   uid: '1',
   name: 'Stormplup',
   displayName: 'SP',
   isWorkingOut: true,
   currentWorkoutId: '07-19-2020-21:57',
   workouts: {
      '07-19-2020-21-57': {
         wid: '07-19-2020-21-57',
         completed: false,
         dateStarted: '07-19-2020',
         timeStarted: '21:57',
         timeEnded: null,
         exercises: {
            '1': {
               uid: '1',
               name: "Pushups",
               /* This will be an interface describing the 
                  workout, kind of like a class. This is so 
                  the data representation is controlled. */
               setNames: ['reps'], 
               sets: [
                  { reps: 10 }, 
                  { reps: 12 },
                  { reps: 15 },
                  { reps: 12 }
               ]
            },
         }

      },
      '07-18-2020-18-57': {
         wid: '07-18-2020-18-57',
         completed: true,
         dateStarted: '07-18-2020',
         timeStarted: '18:00',
         timeEnded: '18:45',
         exercises: {
            '1': {
               uid: '1',
               name: "Pushups",
               /* This will be an interface describing the 
                  workout, kind of like a class. This is so 
                  the data representation is controlled. */
               setNames: ['reps'], 
               sets: [
                  { reps: 10 }, 
                  { reps: 12 },
                  { reps: 15 },
                  { reps: 12 }
               ]
            },
         }
      }
   }
}