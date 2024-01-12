import React, { useEffect, useRef, useState } from 'react'
import DisplayArea from './components/DisplayArea'
import Logo from './components/Logo'
import HighestWPM from './components/HighestWPM'
import Footer from './components/Footer'

const App = () => {
  const [display , setDisplay] = useState(false)
  const hiddenInputRef = useRef();
  const handleKeyPress = (event) =>{
    if(event.key === 'Enter'){
      setDisplay(true)
    }
  }

  useEffect(()=>{
    hiddenInputRef.current.click();
      document.addEventListener('keypress' , handleKeyPress)
      return () =>{
        document.addEventListener('keypress' , handleKeyPress)
        
      }
  },[])
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center bg-gray-800'>
    <Logo />
    <HighestWPM />
    <input
        ref={hiddenInputRef}
        type="text"
        className='absolute opacity-0 pointer-events-none'
      />
        {display ? <DisplayArea  /> : <h1 className='text-3xl text-gray-400'>Press <span className='animate-pulse bg-gray-900 px-2 border rounded-lg'>Enter</span> to start</h1>}
        <Footer />
    </div>
  )
}

export default App