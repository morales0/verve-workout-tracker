import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { Button } from '../..'
import { useUser } from '../../../context/user-context'

const CreateExerciseWidget = (props) => {
   const [name, setName] = useState('')
   const [setNames, setSetNames] = useState([])
   const {user, dispatch} = useUser()

   const updateSetNames = (e, setName) => {
      console.log(e.target.checked, setName)

      if (e.target.checked) {
         let newSetNames = [...setNames]
         newSetNames.push(setName)

         setSetNames(newSetNames)
      } else {
         let newSetNames = setNames.filter((listName) => setName !== listName)

         setSetNames(newSetNames)
      }
   }

   const verify = () => {
      return setNames.length !== 0 && name !== ''
   }

   const submit = () => {
      if (verify()) {
         props.customCallback(name, setNames)
      } else {
         console.log('no')
      }
   }

   return (
      <div className={props.className} css={`
         background: #57657b;
         border-radius: 4px;
         box-shadow: 0 0 5px 0 #00000050;

         max-width: 300px;
         min-width: 270px;
      `}>
         
         <div css={`
            padding: 1rem;
            display: flex;
            flex-direction: column;
         `}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} css={`
               padding: 5px;
               outline: none;
               border: none;
               border-radius: 4px;
               background: #757575;
               color: #f3f3f3;
               font-size: 1rem;
            `}/>
         </div>
         <div css={`
            display: flex;
            flex-flow: row wrap;
            justify-content: space-around;
            padding: 1rem;

            &>div{
               display: flex;
               flex-direction: column;
               align-items: center;
            }
         `}>
            <div>
               <input type="checkbox" id="reps" onChange={(e) => updateSetNames(e, 'reps')}/>
               <label htmlFor="reps">Reps</label>
            </div>
            <div>
               <input type="checkbox" id="weight" onChange={(e) => updateSetNames(e, 'weight')}/>
               <label htmlFor="weight">Weight</label>
            </div>
            <div>
               <input type="checkbox" id="time" onChange={(e) => updateSetNames(e, 'time')}/>
               <label htmlFor="time">Time</label>
            </div>
         </div>
         <div css={`
            display: flex;
            align-items: center;
            justify-content: center;
            padding: .5rem 1rem;
         `}>
            <Button onClick={() => {
               submit()
               props.onSubmit && props.onSubmit()
            }}>Submit</Button>
         </div>
      </div>
   )
}

export default CreateExerciseWidget
