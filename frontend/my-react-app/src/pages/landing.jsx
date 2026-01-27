import React from 'react'
import "../App.css"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



export default function Landing() {
  const router=useNavigate();
  return (
    <div className='landingContainer'>
     <nav>
      <div className='navheader'>
        <h2> My Vedio Call</h2>
      </div>
      <div className='navlist'>
        < button className='btn' onClick={()=>{
        router("/fgdre5fd5")
        }}>Join as guest</button>
        <button className='btn' onClick={()=>{
        router("/auth")
        }}>Register</button>
          <button className='btn' onClick={()=>{
        router("/auth")
        }}>Login</button>
      </div>
     </nav>
     <div className='landingMainContainer'>
      <div>
       <h2>
  <span style={{ color: "coral" }}>Connect</span> with your loved ones
</h2>
        <p className='pp'>Cover a Distance by Vedio Call</p>  
        <div role='button'>
        <Link to="/auth">
  <p>Get start</p>
</Link>
       </div>
       </div>
      <div>
        <img src="/phone4.png" alt=""></img></div>
     </div>
    </div>
  )
}


