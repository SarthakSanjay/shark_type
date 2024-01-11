import { useEffect, useState } from 'react'
import './App.css'
import sentences from './utils/sentences'

function App() {
  const [result , setResult] = useState(false)
  const [sentence , setSentence] = useState(sentences[Math.floor(Math.random() * sentences.length)].toLowerCase())
  const [accuracy , setAccuracy] = useState(0)
  const [wordpermin , setWordPerMin] = useState(0)
  const [timeTaken , setTimeTaken] = useState(0)
  const [errors , setErrors] = useState(0)
  let index = 0
  let countError = 0
  let start = new Date().getTime()
  const handleKeyPress = (event) =>{
    setResult(false)
  
    if(event.key === sentence.charAt(index)){
      // console.log(sentence.charAt(sentence.length - 1 ));
      // console.log(event.key)
      document.getElementById(`${index}`).classList.add('text-white')
      index++
    }else{
      console.log('else block');
      document.getElementById(`${index}`).classList.add('text-red-500')
      // index++
      countError++
    }
    
    if(index === sentence.length){
      console.log(countError);
      let current = new Date().getTime()
      let wpm = (((sentence.length - countError)/5)/((current-start)/60000))
      setErrors(countError)
      setTimeTaken((current - start)/1000)
      setWordPerMin(Math.floor(wpm))
      setAccuracy(((sentence.length - countError)/sentence.length)*100)
      setSentence(sentences[Math.floor(Math.random()*sentences.length)].toLowerCase())
      setResult(true)
      start = index = countError =0
    }
  }
  

  function WPA(){
    return <div>
    <h1 className='text-[40px] text-yellow-400'>{wordpermin} WPM</h1>
    <h1 className='text-[30px] text-white'>Accuracy  {accuracy.toFixed(2)}%</h1>
    <h1 className='text-[30px] text-green-500'>Time  {timeTaken.toFixed(2)}s</h1>
    <h1 className='text-[30px] text-red-500'>Errors  {errors}</h1>
    </div>
  }
  
  function TextArea (){
    return  <div className='text-3xl text-gray-500'>
    {sentence.split('').map((letter,index)=>{
      return <span id={index} key={index}>{letter}</span>
    })}
</div>
  }
  useEffect(()=>{
    document.addEventListener('keydown', handleKeyPress);
      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
  },[result])

  
  // console.log(handleKeyPress())
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center bg-gray-800'>
    <div className='absolute top-0 left-0 p-10 text-[40px] text-blue-400'>SharkType</div>
      {/* <h1 className='text-3xl text-gray-600'>sl {sentence.length}</h1> */}
      {result ?<WPA />:<TextArea />}
      
    </div>
  )
}

export default App
