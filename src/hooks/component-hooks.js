import { useEffect, useState } from 'react'

const usePopUp = (ref) => {
   const [toggle, setToggle] = useState(false)

   useEffect(() => {
       // Bind the event listener
       document.addEventListener("mousedown", (e) => {
         if (ref.current && !ref.current.contains(e.target)) {
            setToggle(false);
         }
       });

       return () => {
           // Unbind the event listener on clean up
           document.removeEventListener("mousedown");
       };
   }, [ref]);

   return [
      toggle,
      setToggle,
   ]
}

export { usePopUp }