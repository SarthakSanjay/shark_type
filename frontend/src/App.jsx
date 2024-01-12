import React, { useEffect, useRef, useState } from 'react'
import DisplayArea from './components/DisplayArea'
import Logo from './components/Logo'
import HighestWPM from './components/HighestWPM'
import Footer from './components/Footer'

const App = () => {
  const [display , setDisplay] = useState(false)
  const inputRef = useRef();

  const handleButtonClick = () => {
    // Focus on the input element to open the keyboard
    inputRef.current.focus();
  };
  const handleKeyPress = (event) =>{
    if(event.key === 'Enter'){
      setDisplay(true)
    }
  }

  useEffect(()=>{

      document.addEventListener('keypress' , handleKeyPress)
      return () =>{
        document.addEventListener('keypress' , handleKeyPress)
        
      }
  },[])
  return (<>
    <div className='h-screen hidden lg:flex w-screen  flex-col justify-center items-center bg-gray-800'>
    
    <Logo />
    <HighestWPM />
    <input
        ref={inputRef}
        type="text"
        className='absolute opacity-0 pointer-events-none'
      />
        {display ? <DisplayArea  /> : <h1 className='text-3xl text-gray-400'>Press <span className='animate-pulse bg-gray-900 px-2 border rounded-lg'>Enter</span> to start</h1>}
        <button className='absolute  lg:hidden bottom-16 bg-purple-500 text-white mb-5 py-1 px-2 rounded-md border' onClick={handleButtonClick}>Open Keyboard</button>
        <Footer />
    </div>
    <div className='flex justify-center items-center bg-black text-white h-screen w-screen lg:hidden'>For mobiles work in progress please visit this website on pc</div>
  </>
  )
}

export default App