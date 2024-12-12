import React, { useEffect, useRef, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
const App = () => {
const [questions, setQuestions] = useState(null);
const [currentindex, setCurrentIndex] = useState(0);
const [score, setScore] = useState(0);
const Input = useRef([])
const navigate = useNavigate()
   
const NextQuestionHandler = () => {
  const selectedoption = Input.current.find(item => item.checked)
  const correctAnswer = questions[currentindex].correctAnswer

  if(selectedoption.value === correctAnswer){
    setScore(score + 1)
  }else{
    setScore(score)
  }

  if(currentindex < questions.length - 1){
    setCurrentIndex(currentindex + 1)
    selectedoption.checked = false
    return
  }
  navigate('score',{
    state:{
      score,
      questions
    }
  })
}

// function shuffleArray(array) {
//   let empty = [];
//   let shuffle = [];

//   for (let index = 0; index < array.length; index++) {
//     const randomNumber = Math.floor(Math.random() * array.length);
//     if(empty.includes(randomNumber)){
//       index--;
//     }else{
//       empty.push(randomNumber);
//       shuffle[randomNumber] = array[index];
//     }
//   }
//   return shuffleArray;
// }
function shuffleArray(arr){
  const emptyArr = []
  const shuffleArr = []
  for (let index = 0; index < arr.length; index++) {
      const randomNumber = Math.floor(Math.random() * arr.length)
      if(emptyArr.includes(randomNumber)){
        index--
      }else{
        emptyArr.push(randomNumber)
        shuffleArr[randomNumber] = arr[index]
      }
    } 
    return shuffleArr
}

  useEffect(()=>{
    const fetchQuestions = async () => {
      try {
        const res = await axios.get('https://the-trivia-api.com/v2/questions')
        console.log(res)
        setQuestions(res.data)
  
      } catch (error) {
        console.log(error)
      }
    }
    fetchQuestions()
    },[])
  return (
    <>
      <h1 className='text-5xl font-bold text-center mt-10'>Quiz App 100</h1>
      {
        questions ? <div>
          <h1 className='text-3xl m-10 bg-red-400 p-5 font-bold'>Q{currentindex + 1} : {questions[currentindex].question.text}</h1>
          {shuffleArray([...questions[currentindex].incorrectAnswers, 
           questions[currentindex].correctAnswer]).map((item,index)=>{
            return(
              <div key={index} className='flex gap-5 ml-10'>
                <input type="radio" value={item} id={index} name='question' className='w-4' 
                 ref={el => Input.current[index] = el}/>
                <label htmlFor={index} className='text-2xl'>{item}</label>
              </div>
            )
          })}
          <button onClick={NextQuestionHandler} className='text-2xl m-10 bg-blue-300 p-5 font-bold rounded-2xl'>Next</button>
        </div> : <h1 className='text-5xl font-bold text-center mt-10'>Loading...</h1>
      }
    </>
  )
}

export default App


