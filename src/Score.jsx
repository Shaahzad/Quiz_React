import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const Score = () => {
const [percentage, setPercentage] = useState(null)
const {state} = useLocation()


useEffect(() => {
  setPercentage(state.score / state.questions.length * 100)
}, [])
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <p className='text-2xl text-blue-500 font-bold'>Your score is {state.score}</p>
        <p className='text-2xl text-blue-500 font-bold'>Your percentage is {percentage}%</p>
    </div>
  )
}

export default Score
