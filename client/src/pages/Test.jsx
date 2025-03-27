import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../store/counterSlice'

const Test = () => {
    const count = useSelector((state)=>state.counter.value)
    const dispatch = useDispatch()

  return (
    <div className='h-screen w-full bg-red-600'>
        <p>Count: {count}</p>
        <button onClick={()=>dispatch(increment())}>Increment</button>
        <button onClick={()=>dispatch(decrement())}>Decrement</button>
    </div>
  )
}

export default Test