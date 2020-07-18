const initial_state = {
   '1': {
      uid: '1',
      name: "Pushups",
      setNames: ['reps'],
      sets: [
         { reps: 10 }, 
         { reps: 12 },
         { reps: 15 },
         { reps: 12 }
      ]
   },
   '2' : {
      uid: '2',
      name: "Shoulder Press",
      setNames: ['weight', 'reps'],
      sets: [
         { weight: 45, reps: 10 }, 
         { weight: 45, reps: 12 },
         { weight: 45, reps: 15 },
         { weight: 45, reps: 12 }
      ]
   }
}

export default initial_state;