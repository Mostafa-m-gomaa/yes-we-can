import React, { useContext , useState ,useEffect } from 'react'
import "./who.css"
import { AppContext } from '../../App'
import logo from "../../assets/logoo.png"
const Who = () => {
    const id ="65759c90c5f194bea18fa5c3"
    const {route}=useContext(AppContext)
    const [whoUs,setWhoUs]=useState("")
    const [about,setAbout]=useState("")


    useEffect(()=>{
        fetch(`${route}/webSiteInfo/${id}`)
        .then(res=>res.json())
        .then(data=>{
           
      setAbout(data.data.aboutUs)
      setWhoUs(data.data.whoAreWe)
        })
      },[])
  return (
<div className="who">
    <div className="head">
            <div>من نحن</div>
            <img src={logo} alt="" />
        </div>
    <div className="container"> 
    <div className="who-us">
        <h1>من نحن</h1>
        <p>{whoUs}</p>
        </div>
        <div className="about-us">
        <h1>عنا</h1>
        <p>{about}</p>
        </div>
    </div>
</div>
  )
}

export default Who