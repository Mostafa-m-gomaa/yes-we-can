import React from 'react'
import { useContext ,useState ,useEffect } from 'react'
import { AppContext } from '../../App'
import './contact.css'
import faceBookk from '../../assets/386622_facebook_icon.png'
import whatAppp from '../../assets/986960_whatsapp_icon.png'
import insta from '../../assets/insta.png'
import linked from '../../assets/5296501_linkedin_network_linkedin logo_icon.png'

import phonee from '../../assets/8726191_phone_volume_icon.png'
import home from '../../assets/185038_home_house_icon.png'

const Contact = () => {
    const {route} = useContext(AppContext)
    const [phone,setPhone]=useState("")
    const [address,setAddress]=useState("")
    const [facebook,setFacebook]=useState("")
    const [whatsApp,setWhatsApp]=useState("")
    const [linkedIn,setLinkedIn]=useState("")
    const [instagram,setInstagram]=useState("")

    
    useEffect(()=>{
        fetch(`${route}/contactUs`,{
            headers:{
                "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
     console.log(data)
     if(data.data){
setAddress(data.data[0].address)
setPhone(data.data[0].phone)
setFacebook(data.data[0].facebook)
setWhatsApp(data.data[0].whatsApp)
setLinkedIn(data.data[0].linkedIn)
setInstagram(data.data[0].instagram)

     }
        })
      },[])
  return (
   <div className="contact">
    <div className="container">
    <h2>اٍتصل بنا</h2>
    <div className="first-info">
        <div className="card">
            <img src={phonee} alt="phone"/>
            <h3>يمكنك الاتصال بنا علي</h3>
            <p>{phone}</p>
        </div>
        <div className="card">
            <img src={home} alt="home"/>
            <h3>يمكنك زيارتنا في</h3>
            <p>{address}</p>
        </div>
    </div>
    <div className="first-info">
   <a href={facebook} target='_blank'><img src={faceBookk} alt="" /></a>
   <a href={instagram} target='_blank'><img src={insta} alt="" /></a>
   <a href={linkedIn} target='_blank'><img src={linked} alt="" /></a>
   <a href={whatsApp} target='_blank'><img src={whatAppp} alt="" /></a>
     
    </div>
    </div>
   </div>
  )
}

export default Contact