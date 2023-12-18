import React, { useContext } from 'react'
import './signUp.css'
import { Link } from 'react-router-dom'
import laptop from"../../assets/laptop.png"
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../App'
import { ToastContainer, toast } from 'react-toastify';
const SignUp = () => {
const history =useNavigate()
const {route,setLoader}=useContext(AppContext)
const [name,setName]=useState("") 
const [email,setEmail]=useState("")
const [phoneNum,setPhoneNum]=useState("")
const handleAdd = async (event) => {
  event.preventDefault();
  setLoader(true)
  try {
    const response = await fetch(`${route}/users/signUp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' ,
        "Authorization" :`Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
          name:name,
        email : email ,
        phone : phoneNum
   
 
      })
    })
    .then(res=>res.json())
  
    setLoader(false)
    if (response.data) {
    toast.success("تم التسجيل تواصل مع المسؤل لتفعيل حسابك")
  
    }
     else {
  // toast.error("sayed")
  toast.error(response.errors[0].msg)
  
    }
  } catch (error) {
    console.error(error);
  
  }
};


return (
    <div className="sign-up">
        <div className="container">
     
        <form action="" onSubmit={handleAdd}>
            <label htmlFor="">
              الاسم
              <input value={name} onChange={(e)=>setName(e.target.value)} type='text' />
            </label>
            <label htmlFor="">
              الايميل
              <input value={email}  type='text' onChange={(e)=>setEmail(e.target.value)} />
            </label>
            <label htmlFor="">
              رقم الهاتف
              <input  value={phoneNum} onChange={(e)=>setPhoneNum(e.target.value)} type='text' />
            </label>
          

 
            <button type='submit'>تسجيل</button>
          </form>
        </div>
    </div>
  )
}

export default SignUp
