

import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import RestoreIcon from '@mui/icons-material/Restore';
import TextField from '@mui/material/TextField';
import { AuthContext } from '../contexts/AuthContext';



function HomeComponents() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
const {addToUserHistory}=useContext(AuthContext);
  const handleJoinVideoCall = async() => {
    await addToUserHistory(meetingCode)
    navigate(`/${meetingCode}`);
  };

  return (
    <>
    <div className='navBar'>
        <div style={{disply:"flex",alignItems:"center"}}>
<h2>MyVedio Call</h2>
        </div>
            <div style={{disply:"flex",alignItems:"center"}}>
<IconButton onClick={()=>{
  navigate("/history")
}}>
    <RestoreIcon/>
<p>History</p>
    
</IconButton>
<Button onClick={()=>{
   localStorage.removeItem("token") 
   navigate("/auth");
}} >Logout</Button>
        </div>
    </div>
    <div className="meetContainer">
        <div  className="leftPanel">
            <div>
             <h2>Providing Quality Vedio Call Just Like Quality Education</h2> 
             <div style={{dispaly:"flex",gap:"10px"}}>
<TextField onChange={e=>setMeetingCode(e.target.value)}  id="outlined-basic" label="Outlined" variant="outlined" />
           <Button onClick={handleJoinVideoCall} varient='contained'> Join </Button>
            </div>
            </div>

        </div>
        <div className="rightpanel">
            <img srcSet='/logo3.svg' alt=""/>
        </div>
    </div>
    </>
  )
}

export default withAuth(HomeComponents)
