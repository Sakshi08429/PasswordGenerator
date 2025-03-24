import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'

function App() {
const[length,setLength]=useState(8)
const[numberAllowed, setNumberAllowed]=useState(false);
const[charAllowed,setCharAllowed]=useState(false)
const[password,setPassword]=useState("")

//ref HOOK
const passwordRef=useRef(null)


//usecallback(function ,dependencies)
const passwordGenerator=useCallback(()=>{
  let pass=""
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(numberAllowed){
    str+="0123456789"
  }
  if(charAllowed){
    str+="!@#$%^&*_+=[]{}~`"
  }
  for(let i=0;i<=length;i++){
    let char =Math.floor(Math.random()*str.length+1)
    pass+=str.charAt(char)
  }
  setPassword(pass)
},[length,charAllowed,numberAllowed,setPassword])

const copypasswordtoClipboard=useCallback(()=>{
  passwordRef.current?.select()
  // passwordRef.current?.setSelectionRange(0,3)
  window.navigator.clipboard.writeText(password)
},[password])

//callback and dependency array

useEffect(()=>{passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
   <div className= 'w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-10 text-orange-500 bg-gray-700'><h1 className='text-white text-center my-3'>Password Generator</h1>
    <div className='className="flex shadow rounded-lg overflow-hidden mb-4"'>
      <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password'
      readOnly
      ref={passwordRef}
      />
      <button onClick={copypasswordtoClipboard}className='outline-none bg-blue-700 text-white px-2 py-0.5 shrink-0 '>copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
    <div className='flex items-center gap-x-1'>
      <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
      <lablel>Lenght : {length}</lablel>

    </div>
    <div className='flex items-center gap-x-1'>
      <input type="checkbox" defaultChecked={numberAllowed} id="numberInput"  onChange={()=>{setNumberAllowed((prev)=>!prev)}}/>
      <lablel>Numbers </lablel>

    </div>

    </div>
    <div className='flex items-center gap-x-1'>
      <input type="checkbox" defaultChecked={charAllowed} id="charInput"  onChange={()=>{setCharAllowed((prev)=>!prev)}}/>
      <lablel>Characters </lablel>

    </div>
   </div>
    </>
  )
}

export default App
