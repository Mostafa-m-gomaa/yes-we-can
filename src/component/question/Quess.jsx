import React, { useContext, useEffect ,useCallback } from 'react'
import { useState } from 'react';
import { AppContext } from '../../App';
import logo from "../../assets/logoo.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ques.css'
import { useNavigate } from 'react-router-dom';
import { type } from '@testing-library/user-event/dist/type';


const Quess = () => {
    const {route ,setLoader }=useContext(AppContext)
    const [ques,setQues]=useState([])
    const [answers,setAnswers]=useState([])
    const [email1,setEmail1]=useState("")
    const [email2,setEmail2]=useState("")
    const [email3,setEmail3]=useState("")
    const history =useNavigate()

      const handleAnswers = (num, id ,corr) => {
     if(typeof(num) === "number"){

       const existingAnswerIndex = answers.findIndex(answer => answer.questionId === id);
   
       if (existingAnswerIndex !== -1) {
           // If the question has an answer, update the existing answer
           const updatedAnswers = [...answers];
           updatedAnswers[existingAnswerIndex].answer = num;
           setAnswers(updatedAnswers);
       } else {
           // If the question doesn't have an answer, add a new answer
           const newObject = {
               questionId: id,
               answer: num
           };
           setAnswers([...answers, newObject]);
       }
    
     }
     else{
      if(corr === num){
        const existingAnswerIndex = answers.findIndex(answer => answer.questionId === id);
   
        if (existingAnswerIndex !== -1) {
            // If the question has an answer, update the existing answer
            const updatedAnswers = [...answers];
            updatedAnswers[existingAnswerIndex].answer = 1;
            setAnswers(updatedAnswers);
        } else {
            // If the question doesn't have an answer, add a new answer
            const newObject = {
                questionId: id,
                answer: 1 ,
                answerText : num
            };
            setAnswers([...answers, newObject]);
        }
      }
      else{
        const existingAnswerIndex = answers.findIndex(answer => answer.questionId === id);
   
        if (existingAnswerIndex !== -1) {
            // If the question has an answer, update the existing answer
            const updatedAnswers = [...answers];
            updatedAnswers[existingAnswerIndex].answer = 0;
            setAnswers(updatedAnswers);
        } else {
            // If the question doesn't have an answer, add a new answer
            const newObject = {
                questionId: id,
                answer: 0 ,
                answerText : num
            };
            setAnswers([...answers, newObject]);
        }
      }
   
     }

    
    };

      const handleSubmit = async (event) => {
        event.preventDefault();
        setLoader(true)
        if(answers.length != ques.length){
          toast.error("يجب ان تجاوب علي كل الاسئلة")
          setLoader(false)
        }
        if(answers.length === ques.length){
         
          const raterEmails =[sessionStorage.getItem("email1") ,sessionStorage.getItem("email2") ,sessionStorage.getItem("email3")]
          const raterNames =[sessionStorage.getItem("name1") ,sessionStorage.getItem("name2") ,sessionStorage.getItem("name3")]
          try {
            const response = await fetch(`${route}/answer/saveanswers`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json' ,
                "Authorization" :`Bearer ${localStorage.getItem("token")}`
              },
              body: JSON.stringify({
                  raterEmails : raterEmails ,
                  raterNames : raterNames ,
                  answers :answers
              })
            })
            .then(res=>res.json())
            console.log(response)
            setLoader(false)
            if (response.status === "success") {
              toast.success(response.message)
              history("/")
      
            } if(response.errors){
          toast.error(response.errors[0].msg)
          
            }
          } catch (error) {
            console.error(error);
          
          }
        }
      };

    useEffect(()=>{
        fetch(`${route}/questions/takeTest`,{
            headers:{
                "Authorization" :`Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
          console.log(data)
          if(data.questions){
            setQues(data.questions)
       
          }
        })
      },[])
  return (
<div className="ques">
    <div className="container">
        <div className="head">
            <div>الأسئلة</div>
            <img src={logo} alt="" />
        </div>
        <div className="all-ques">


{ques.map((quesItem, index) => (
  <div className="ques-card" key={index}>
    <div className="text">{index + 1} - {quesItem.text}</div>
    {quesItem.options.length > 0 ? (
      <div className="known-answers">
        {quesItem.options.map((option, optionIndex) => (
          <div className="radio-button-container" key={optionIndex}>
            <div className="radio-button">
              <input
                type="radio"
                className="radio-button__input"
                id={`${index}-${optionIndex}`}
                name={quesItem._id}
                onClick={() => handleAnswers(option, quesItem._id ,quesItem.correctAnswer)}
              />
              <label
                className="radio-button__label"
                htmlFor={`${index}-${optionIndex}`}
              >
                <span className="radio-button__custom"></span>
                {option}
              </label>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="radio-input">
        {[1, 2, 3, 4, 5].map((value) => (
          <label key={value}>
            <input
              onClick={() => handleAnswers(value, quesItem._id , "no")}
              value={`value-${value}`}
              name={quesItem.text}
              id={`value-${value}-${index}`}
              type="radio"
            />
            <span>{value}</span>
          </label>
        ))}
        <span className="selection"></span>
      </div>
    )}
  </div>
))}


        </div>
            <button onClick={handleSubmit}>ارسال الاجابات</button>


    
    </div>
</div>
    )
}

export default Quess
