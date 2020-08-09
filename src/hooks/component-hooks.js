import { useEffect, useState } from 'react'

const usePopUp = (ref) => {
   const [toggle, setToggle] = useState(false)

   useEffect(() => {
      const handleClick = (e) => {
         if (ref.current && !ref.current.contains(e.target)) {
            setToggle(false);
         }
       }
       // Bind the event listener
       document.addEventListener("mousedown", (e) => handleClick(e));

       return () => {
           // Unbind the event listener on clean up
           document.removeEventListener("mousedown", (e) => handleClick(e));
       };
   }, [ref]);

   return [
      toggle,
      setToggle,
   ]
}

export { usePopUp }