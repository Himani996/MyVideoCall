// // import React,{useState, useEffect,useRef} from 'react'
// // import styles from"../styles/videoComponent.module.css";
// // import {Badge,IconButton,TextField} from "@mui/material";
// // import Button from "@mui/material/Button";
// // import { io } from "socket.io-client";
// // import VideocamIcon from '@mui/icons-material/Videocam';
// // import VideocamOffIcon from '@mui/icons-material/VideocamOff';
// // import MicIcon from '@mui/icons-material/Mic';
// // import MicOffIcon from '@mui/icons-material/MicOff';
// // import CallEndIcon from '@mui/icons-material/CallEnd';
// // import ScreenShareIcon from '@mui/icons-material/ScreenShare';
// // import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
// // import ChatIcon from '@mui/icons-material/Chat';


// // const socket_url="http://localhost:8000";
// // var connections={};

// // const peerConfigConnections={
// //     "iceServers":[
// //         {"urls":"stun:stun.l.google.com:19302"}
// //     ]
// // }


// // export default function VideoMeetComponents() {

// //     var socketRef=useRef();
// //     let socketIdRef=useRef();
// // let localVideoRef=useRef();

// // let[videoAvailable,setVideoAvailable]=useState(true);
// // let[audioAvailable,setAudioAvailable]=useState(true);

// // let[video,setVideo]=useState();
// // let[audio,setAudio]=useState();

// // let[screen,setScreen]=useState();
// // let[showModel,setModel]=useState();

// // let[screenAvailable,setScreenAvailable]=useState();
// // let[messages,setMessages]=useState();

// // let[message,setMessage]=useState();
// // let[newMessages,setNewMessages]=useState(0);

// // let[askForUsername,setAskForUsername]=useState(true);
// // let[username,setUsername]=useState("");

// // const VideoRef=useRef();
// // let [videos,setVideos]=useState([]);

// // useEffect(()=>{
// //     console.log("HELLO")
// //     getPermission();
// // },[])

// // const getPermission=async()=>{
// //     try{
// //         const videoPermission=await navigator.mediaDevices.getUserMedia({video:true});
// //         if(videoPermission){
// // setVideoAvailable(true);
// //         }else{
// //             setVideoAvailable(false);
// //         }
// // const audioPermission=await navigator.mediaDevices.getUserMedia({audio:true});
// //         if(videoPermission){
// // setAudioAvailable(true);
// //         }else{
// //             setAudioAvailable(false);
// //         }

// //         if(navigator.mediaDevices.getDisplayMedia){
// //             setScreenAvailable(true);
// //         }else{
// //             setScreenAvailable(false);
// //         }

// //         if(videoAvailable || audioAvailable){
// //             const userMediaStream =await navigator.mediaDevices.getUserMedia({video:videoAvailable,audio:audioAvailable});
// //             if(userMediaStream){
// //                 window.localStream=userMediaStream;
// //                 if(localVideoRef.current){
// //                     localVideoRef.current.srcObject=userMediaStream;
// //                 }
// //             }
// //         }

// //     }catch (e){
// // console.log(e);
// //     }
// // }

// //  let getUserMediaSuccess = (stream) => {
// //         try {
// //             window.localStream.getTracks().forEach(track => track.stop())
// //         } catch (e) { console.log(e) }

// //         window.localStream = stream
// //         localVideoRef.current.srcObject = stream

// //         for (let id in connections) {
// //             if (id === socketIdRef.current) continue

// //             connections[id].addStream(window.localStream)

// //             connections[id].createOffer().then((description) => {
// //                 console.log(description)
// //                 connections[id].setLocalDescription(description)
// //                     .then(() => {
// //                         socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
// //                     })
// //                     .catch(e => console.log(e))
// //             })
// //         }

// //         stream.getTracks().forEach(track => track.onended = () => {
// //             setVideo(false);
// //             setAudio(false);

// //             try {
// //                 let tracks = localVideoRef.current.srcObject.getTracks()
// //                 tracks.forEach(track => track.stop())
// //             } catch (e) { console.log(e) }

// //             let blackSilence = (...args) => new MediaStream([black(...args), silence()])
// //             window.localStream = blackSilence()
// //             localVideoRef.current.srcObject = window.localStream

// //             for (let id in connections) {
// //                 connections[id].addStream(window.localStream)

// //                 connections[id].createOffer().then((description) => {
// //                     connections[id].setLocalDescription(description)
// //                         .then(() => {
// //                             socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
// //                         })
// //                         .catch(e => console.log(e))
// //                 })
// //             }
// //         })
// //     }




// // let silence=()=>{
// //     let ctx=new AudioContext()
// //     let oscillator=ctx.createOscillator();
// //     let dst=oscillator.connect(ctx.createMediaStreamDestination());
// //     oscillator.start();
// //     ctx.resume();
// //     return Object.assign(dst.stream.getAudioTracks()[0],{enabled:false})
// // }
// // let black=({width=640,height=480}={})=>{
// // let canvas=Object.assign(document.createElement("canvas"),{width,height});
// // canvas.getContext('2d').fillRect(0,0,width,height);
// // return Object.assign(stream.getVideoTracks()[0],{enabled:false})
// // }




// // let getUserMedia=()=>{
// //     if((video&& videoAvailable) || (audio && audioAvailable)){
// //         navigator.mediaDevices.getUserMedia({video:video,audio:audio})
// //         .then(getUserMediaSuccess)
// //         .then((stream)=>{})
// //         .catch((e)=>console.log(e))
// //     }else{
// //         try{
// //             let tracks=localVideoRef.current.srcObject.getTracks();
// //             tracks.forEach(track=>track.stop())
// //         }catch (e){ }
// //     }
// // }

// // useEffect(()=>{
// //     if(video!==undefined && audio!==undefined){
// //         getUserMedia();
// //     }
// // },[audio,video])

// // // let gotMessageFromServer=(fromId,message)=>{
// // // var signal=()=>JSON.parse(message)

// // // if(fromId!==socketIdRef.current){
// // //     if(signal.sdp){
// // //         connections[fromId].setRemotesDescription (new RTCSessionDescription(signal.sdp)).then(()=>{
// // //             if(signal.sdp.type==="offer"){
// // //                 connections[fromId].createAnswer().then((description)=>{
// // //                     socketIdRef.current.emit("signal",fromId,ISON.stringify({"sdp":connections[fromId]}))
// // //                 .catch(e=>console.log(e))
// // //             .catch(e=> console.log(e))
// // //                 })
// // //             }
// // //         }).catch(e=>console.log(e))
// // //     }
// // //     if(signal.ice){
// // //         connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e=>console.log(e));
// // //     }
// // // }
// // // }

// //  let gotMessageFromServer = (fromId, message) => {
// //         var signal = JSON.parse(message)

// //         if (fromId !== socketIdRef.current) {
// //             if (signal.sdp) {
// //                 connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
// //                     if (signal.sdp.type === 'offer') {
// //                         connections[fromId].createAnswer().then((description) => {
// //                             connections[fromId].setLocalDescription(description).then(() => {
// //                                 socketRef.current.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }))
// //                             }).catch(e => console.log(e))
// //                         }).catch(e => console.log(e))
// //                     }
// //                 }).catch(e => console.log(e))
// //             }

// //             if (signal.ice) {
// //                 connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
// //             }
// //         }
// //     }




// // let addMessage=()=>{

// // }

// //  let connectToSocketServer=()=>{
// //     socketRef.current=io.connect(socket_url,{secure:false})

// //     console.log("socket_url =", socket_url);

// //     socketRef.current.on("signal",gotMessageFromServer);
// //     socketRef.current.on("connect",()=>{
// //             console.log("My socket id:", socketRef.current.id);
// //         socketRef.current.emit("join-call",window.location.href)
// //         socketIdRef.current=socketRef.current.id
// //         socketRef.current.on("chat-message",addMessage)
// //         socketRef.current.on("user-left",(id)=>{
// //             setVideo((video)=>video.filter((video)=>video.socketId!==id))
// //         })
// //         socketRef.current.on("user-joined",(id,client)=>{
// //             // getScopedCssBaselineUtilityClass
// //             client.forEach((socketListId)=>{
// //                 connections[socketListId]=new RTCPeerConnection(peerConfigConnections)

// //                 connections[socketListId].onicecandidate=(event)=>{
// //                     if(event.candidate!=null){
// //                         socketRef.current.emit("signal",socketListId,JSON.stringify({'ice':event.candidate}))
// //                     }
// //                 }
// //                 connections[socketListId].onaddstream=(event)=>{
// //                 let videoExists=VideoRef.current.find(video=>video.socketId===socketListId);
// //                 if(videoExists){
// //                     setVideo(video=>{
// //                         const updateVideos=video.map(video=>VideoDecoder.socketId
// //                             ===socketListId?{...video,stream:event.stream}:video
// //                         );
// //                         VideoRef.current=updateVideos;
// //                         return updateVideos;
// //                     })
// //                 }else{
// //                     let newVideo={
// //                         socketId:socketListId,
// //                         stream:event.stream,
// //                         autoPlay:true,
// //                         playsinline:true
// //                     }
// //                     setVideo(videos=>{
// //                         const updateVideos=[...videos,newVideo];
// //                         VideoRef.current=updateVideos;
// //                         return updateVideos;
// //                     });
// //                 }
// //                 };
            
// //                 if(window.localStream!==undefined && window.localStorage!==null){
// //                     connections[socketListId].addStream(window.localStream);
// //                 }else{
// //               let blackSilence=(...args)=>new MediaStream([black(...args),silence()])
// // window.localStream==blackSilence();
// // connections[socketListId].addStream(window.localStream);
// //                 }

// //             })
// //             if(id===socketIdRef.current){
// //                 for(let id2 in connections){
// //                     if(id2===socketIdRef.current) continue;
// //                     try{
// //                         connections[id2].addStream(window.localStream)
// //                     }catch(e){

// //                     }
// //                     connections[id2].createOffer().then((description)=>{
// //                         connections[id2].setLocalDescription(description)
// //                         .then(()=>{
// //                             socketRef.current.emit("signal",id2,JSON.stringify({"sdp":connections[id2].localDescription}))
// //                         })
// //                         .catch(e=>console.log(e))
// //                     })
// //                 }
// //             }
// //         })
// //     })
// // }

// // let getMedia=()=>{
// //     setVideo(videoAvailable);
// //     setAudio(audioAvailable);
// //     connectToSocketServer();
// // }


// // let connect=()=>{
// //     setAskForUsername(false);
// //     getMedia();
// // }

// // let handleVideo=()=>{
// //     setVideo(!video);
// // }

// // let handleAudio=()=>{
// //     setAudio(!audio);
// // }
// //    useEffect(() => {
// //         if (screen !== undefined) {
// //             getDislayMedia();
// //         }
// //     }, [screen])

    
// //  let handleScreen = () => {
// //         setScreen(!screen);
// //     }

// //     let handleEndCall = () => {
// //         try {
// //             let tracks = localVideoref.current.srcObject.getTracks()
// //             tracks.forEach(track => track.stop())
// //         } catch (e) { }
// //         window.location.href = "/"
// //     }

// //   return (
// //     <div>
// //         {askForUsername===true?
// //         <div>
// //             <h2>Enter into Lobby</h2>
// //             <TextField id="outlined-basic" label="username" value={username} onChange={e=>setUsername(e.target.value)} variant="outlined" />
// // <Button variant="contained" onClick={connect}>connect</Button>

// // <div>
// // <video ref={localVideoRef} autoPlay muted></video>
// //     </div>


// //     </div>:<div className={styles.meetVideoContainer}>
// //     <video className={styles.meetUserVideo} ref={localVideoRef} autoPlay muted/>

// // <div className={styles.buttonContiner}>
// // <IconButton onClick={handleVideo}sx={{ color: "white" }}>
// //   {video ? <VideocamIcon /> : <VideocamOffIcon />}
// // </IconButton>

// // <IconButton sx={{ color: "error.main" }}>
// //   <CallEndIcon />
// // </IconButton>

// // <IconButton onClick={handleAudio}sx={{ color: "white" }}>
// //   {audio ? <MicIcon /> : <MicOffIcon />}
// // </IconButton>

// // {screenAvailable===true?
// // <IconButton  sx={{ color: "white" }}>
// //     {screen===true?<ScreenShareIcon/>:<StopScreenShareIcon/>}
// // </IconButton>:<></>}

// // <Badge badgeContent={newMessages} max={999} color="warning">
// //     <IconButton sx={{ color: "white" }}>
// //  <ChatIcon/>
// // </IconButton>
// // </Badge>

// //     </div>
// // <div className={styles.conferenceView}>
// //     {videos.map((video)=>{
// //         <div  key={video.socketId}>

// // <video
// //     data-socket={video.socketId}
// //      autoPlay
// //       playsInline
// //     ref={(ref)=>{
// //         if(ref && video.stream){
// //         ref.srcObject=video.stream;}
// //     }}>
// //     autoPlay
// // </video>
// //         </div>
// //     })}
// //     </div>
// //     </div>
// //             }
     
// //     </div>
// //   )
// // }

// import React, { useState, useEffect, useRef } from "react";
// import styles from "../styles/videoComponent.module.css";
// import { Badge, IconButton, TextField } from "@mui/material";
// import Button from "@mui/material/Button";
// import { io } from "socket.io-client";

// import VideocamIcon from "@mui/icons-material/Videocam";
// import VideocamOffIcon from "@mui/icons-material/VideocamOff";
// import MicIcon from "@mui/icons-material/Mic";
// import MicOffIcon from "@mui/icons-material/MicOff";
// import CallEndIcon from "@mui/icons-material/CallEnd";
// import ChatIcon from "@mui/icons-material/Chat";
// import ScreenShareIcon from "@mui/icons-material/ScreenShare";
// import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";


// const socket_url = "http://localhost:8000";

// const peerConfigConnections = {
//   iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
// };

// let connections = {};

// export default function VideoMeetComponents() {
//   const socketRef = useRef(null);
//   const socketIdRef = useRef(null);
//   const localVideoRef = useRef(null);

//   // const [askForUsername, setAskForUsername] = useState(true);
//   // const [username, setUsername] = useState("");

//   // const [videoAvailable, setVideoAvailable] = useState(true);
//   // const [audioAvailable, setAudioAvailable] = useState(true);

//   // const [video, setVideo] = useState(true);
//   // const [audio, setAudio] = useState(true);

//   // const [videos, setVideos] = useState([]);

// let[videoAvailable,setVideoAvailable]=useState(true);
// let[audioAvailable,setAudioAvailable]=useState(true);

// let[video,setVideo]=useState();
// let[audio,setAudio]=useState();

// let[screen,setScreen]=useState();
// let[showModel,setModel]=useState(true);

// let[screenAvailable,setScreenAvailable]=useState();
// let[messages,setMessages]=useState(0);

// let[message,setMessage]=useState();
// let[newMessages,setNewMessages]=useState(0);

// let[askForUsername,setAskForUsername]=useState(true);
// let[username,setUsername]=useState("");

// const VideoRef=useRef();
// let [videos,setVideos]=useState([]);

//   // ================= PERMISSION =================
//   useEffect(() => {
//     getPermissions();
//   }, []);

//   const getPermissions = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });
//       window.localStream = stream;
//       localVideoRef.current.srcObject = stream;
//     } catch (err) {
//       console.log(err);
//     }
//   };

// //   let addMessage=(data,sender,socketTdSender)=>{
// //     setMessages((prevMessages)=>{
// //       ...prevMessages,
// //       {sender:sender,data:data}
// //     });
// //     if(socketIdSender!==socketIdRef.current){
// // setMessages((prevMessages)=>prevMessages+1)
// //     }
// //   }

// let addMessage = (data, sender, socketIdSender) => {
//   setMessages((prevMessages,[]) => [
//     ...prevMessages,
//     { sender: sender, data: data }
//   ]);

//   if (socketIdSender !== socketIdRef.current) {
//     // yahan sirf unread count ya notification logic hona chahiye
//     setNewMessageCount((prev) => prev + 1);
//   }
// };


//   // ================= SOCKET =================
//   const connectToSocketServer = () => {
//     socketRef.current = io(socket_url);

//     socketRef.current.on("connect", () => {
//       socketIdRef.current = socketRef.current.id;
//       socketRef.current.emit("join-call", window.location.href);
//     });

//     socketRef.current.on("signal", gotMessageFromServer);

//     socketRef.current.on("user-joined", (id, clients) => {
//       clients.forEach((socketListId) => {
//         if (connections[socketListId]) return;

//         const peer = new RTCPeerConnection(peerConfigConnections);
//         connections[socketListId] = peer;

//         // ICE
//         peer.onicecandidate = (event) => {
//           if (event.candidate) {
//             socketRef.current.emit(
//               "signal",
//               socketListId,
//               JSON.stringify({ ice: event.candidate })
//             );
//           }
//         };

//         // TRACK (REMOTE VIDEO)
//         peer.ontrack = (event) => {
//           const remoteStream = event.streams[0];

//           setVideos((prev) => {
//             if (prev.find((v) => v.socketId === socketListId)) return prev;
//             return [...prev, { socketId: socketListId, stream: remoteStream }];
//           });
//         };

//         // ADD LOCAL TRACKS
//         window.localStream.getTracks().forEach((track) => {
//           peer.addTrack(track, window.localStream);
//         });
//       });

//       // CREATE OFFER
//       if (id === socketIdRef.current) {
//         for (let peerId in connections) {
//           if (peerId === socketIdRef.current) continue;

//           connections[peerId].createOffer().then((offer) => {
//             connections[peerId].setLocalDescription(offer);
//             socketRef.current.emit(
//               "signal",
//               peerId,
//               JSON.stringify({ sdp: offer })
//             );
//           });
//         }
//       }
//     });
//   };

//   // ================= SIGNAL HANDLER =================
//   const gotMessageFromServer = (fromId, message) => {
//     const signal = JSON.parse(message);

//     if (fromId === socketIdRef.current) return;

//     if (signal.sdp) {
//       connections[fromId]
//         .setRemoteDescription(new RTCSessionDescription(signal.sdp))
//         .then(() => {
//           if (signal.sdp.type === "offer") {
//             connections[fromId].createAnswer().then((answer) => {
//               connections[fromId].setLocalDescription(answer);
//               socketRef.current.emit(
//                 "signal",
//                 fromId,
//                 JSON.stringify({ sdp: answer })
//               );
//             });
//           }
//         });
//     }

//     if (signal.ice) {
//       connections[fromId].addIceCandidate(
//         new RTCIceCandidate(signal.ice)
//       );
//     }
//   };

//   // ================= UI ACTIONS =================
//   const connect = () => {
//     setAskForUsername(false);
//     connectToSocketServer();
//   };

//   const handleVideo = () => {
//     window.localStream.getVideoTracks()[0].enabled = !video;
//     setVideo(!video);
//   };

//   const handleAudio = () => {
//     window.localStream.getAudioTracks()[0].enabled = !audio;
//     setAudio(!audio);
//   };

//   let getDisplayMediaSuccess=(stream)=>{
//     try{
// window.localStream.getTracks().forEach(track=>track.stop())
//     }catch(e){console.log(e)}
//     window.localStream=stream;
//     localVideoRef.current.srcObject=stream;

//     for(let id in connections){
//         if(id===socketIdRef.current)continue;
//         connections[id].addStream(window.localStream)
//         connections[id].createoffer().then(description)
//         .then(()=>{
//             socketRef.current.emit("signal",id,JSON.stringify({"sdp":connections[id].setLocalDescription}))
//         })
//         .catch((e)=>console.log(e));
//     }
//   }
  
//   let getDisplayMedia=()=>{
//     if(screen){
//         if(navigator.mediaDevices.getDisplayMedia){
//             navigator.mediaDevices. getDisplayMedia({vedio:true,audio:true})
//             .then(getDisplayMediaSuccess)
//             .then((stram)=>{})
//             .catch((e)=> console.log(e))
//         }
//     }
//   }
  
//   useEffect(()=>{
//     if(screen!==undefined){
//         getDisplayMadia();
//     }
//   },[screen])

//   // let handleScreen=()={
//   //   setScreen(!screen)
//   // }
//   let sendMessage=()=>{
//     socketRef.current.emit("chat-message",message,username);
//     setMessages("");
//   }

//   const handleEndCall = () => {
//     window.localStream.getTracks().forEach((t) => t.stop());
//     window.location.href = "/";
//   };

//   // ================= JSX =================
//   return (
//     <div>
//       {askForUsername ? (
//         <div>
//           <h2>Enter Lobby</h2>
//           <TextField
//             label="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <Button onClick={connect}>Connect</Button>

//           <video ref={localVideoRef} autoPlay muted />
//         </div>
//       ) : (
//         <div className={styles.meetVideoContainer}>
//         {showModel? <div className={styles.chatRoom}>
//         <div className={styles.chatContainer}>
//         <h1> Chat</h1>
//         <div className={styles.chattingDisplay}> 
// {messages.map((item,index)=>{
// return(
//   <div key={index}>
    
//     <p style={{fontWeight:"bold"}}>{item.sender}</p>
//     <p>{item.data}</p>
//     </div>
// )
// })}
//         </div>
//         <div className={styles.chattingArea}>
//         <TextField value={message} onChange={e=>setMessage(e.target.value)} id="outlined-basic" label="Outlined" variant="outlined" />
//         <Button variant='contained' onClick={sendMessage}>Send</Button>
//         </div>
//         </div>
//          </div>:<></>}
//           <video
//             className={styles.meetUserVideo}
//             ref={localVideoRef}
//             autoPlay
//             muted
//           />

//           <div className={styles.buttonContiner}>
//             <IconButton onClick={handleVideo} sx={{ color: "white" }}>
//               {video ? <VideocamIcon /> : <VideocamOffIcon />}
//             </IconButton>

//             <IconButton onClick={handleEndCall} sx={{ color: "error.main" }}>
//               <CallEndIcon />
//             </IconButton>

//             <IconButton onClick={handleAudio} sx={{ color: "white" }}>
//               {audio ? <MicIcon /> : <MicOffIcon />}
//             </IconButton>

//              {screenAvailable===true?
//  <IconButton  sx={{ color: "white" }}>
//      {screen===true?<ScreenShareIcon/>:<StopScreenShareIcon/>}
//  </IconButton>:<></>}
//  {/* {screenAvailable && (
//   <IconButton sx={{ color: "white" }}>
//     {screen ? <StopScreenShareIcon /> : <ScreenShareIcon />}
//   </IconButton>
// )} */}


//             <Badge badgeContent={newMessages} color="warning">
//               <IconButton onClick={()=>setModel(!showModel)}sx={{ color: "white" }}>
//                 <ChatIcon />
//               </IconButton>
//             </Badge>
//           </div>

//           <div className={styles.conferenceView}>
//             {videos.map((v) => (
//               <video
//                 key={v.socketId}
//                 autoPlay
//                 playsInline
//                 ref={(ref) => {
//                   if (ref) ref.srcObject = v.stream;
//                 }}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from 'react'
import io from "socket.io-client";
import { Badge, IconButton, TextField } from '@mui/material';
import { Button } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff'
import styles from "../styles/videoComponent.module.css";
import CallEndIcon from '@mui/icons-material/CallEnd'
import MicIcon from '@mui/icons-material/Mic'
import MicOffIcon from '@mui/icons-material/MicOff'
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare'
import ChatIcon from '@mui/icons-material/Chat'


const server_url ="http://localhost:8000";

var connections = {};

const peerConfigConnections = {
    "iceServers": [
        { "urls": "stun:stun.l.google.com:19302" }
    ]
}

export default function VideoMeetComponent() {

    var socketRef = useRef();
    let socketIdRef = useRef();

    let localVideoref = useRef();

    let [videoAvailable, setVideoAvailable] = useState(true);

    let [audioAvailable, setAudioAvailable] = useState(true);

    let [video, setVideo] = useState([]);

    let [audio, setAudio] = useState();

    let [screen, setScreen] = useState();

    let [showModal, setModal] = useState(true);

    let [screenAvailable, setScreenAvailable] = useState();

    let [messages, setMessages] = useState([])

    let [message, setMessage] = useState("");

    let [newMessages, setNewMessages] = useState(3);

    let [askForUsername, setAskForUsername] = useState(true);

    let [username, setUsername] = useState("");

    const videoRef = useRef([])

    let [videos, setVideos] = useState([])

    // TODO
    // if(isChrome() === false) {


    // }

    useEffect(() => {
        console.log("HELLO")
        getPermissions();

    })

    let getDislayMedia = () => {
        if (screen) {
            if (navigator.mediaDevices.getDisplayMedia) {
                navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
                    .then(getDislayMediaSuccess)
                    .then((stream) => { })
                    .catch((e) => console.log(e))
            }
        }
    }

    const getPermissions = async () => {
        try {
            const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoPermission) {
                setVideoAvailable(true);
                console.log('Video permission granted');
            } else {
                setVideoAvailable(false);
                console.log('Video permission denied');
            }

            const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
            if (audioPermission) {
                setAudioAvailable(true);
                console.log('Audio permission granted');
            } else {
                setAudioAvailable(false);
                console.log('Audio permission denied');
            }

            if (navigator.mediaDevices.getDisplayMedia) {
                setScreenAvailable(true);
            } else {
                setScreenAvailable(false);
            }

            if (videoAvailable || audioAvailable) {
                const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable });
                if (userMediaStream) {
                    window.localStream = userMediaStream;
                    if (localVideoref.current) {
                        localVideoref.current.srcObject = userMediaStream;
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (video !== undefined && audio !== undefined) {
            getUserMedia();
            console.log("SET STATE HAS ", video, audio);

        }


    }, [video, audio])
    let getMedia = () => {
        setVideo(videoAvailable);
        setAudio(audioAvailable);
        connectToSocketServer();

    }




    let getUserMediaSuccess = (stream) => {
        try {
            window.localStream.getTracks().forEach(track => track.stop())
        } catch (e) { console.log(e) }

        window.localStream = stream
        localVideoref.current.srcObject = stream

        for (let id in connections) {
            if (id === socketIdRef.current) continue

            connections[id].addStream(window.localStream)

            connections[id].createOffer().then((description) => {
                console.log(description)
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                    })
                    .catch(e => console.log(e))
            })
        }

        stream.getTracks().forEach(track => track.onended = () => {
            setVideo(false);
            setAudio(false);

            try {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { console.log(e) }

            let blackSilence = (...args) => new MediaStream([black(...args), silence()])
            window.localStream = blackSilence()
            localVideoref.current.srcObject = window.localStream

            for (let id in connections) {
                connections[id].addStream(window.localStream)

                connections[id].createOffer().then((description) => {
                    connections[id].setLocalDescription(description)
                        .then(() => {
                            socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                        })
                        .catch(e => console.log(e))
                })
            }
        })
    }

    let getUserMedia = () => {
        if ((video && videoAvailable) || (audio && audioAvailable)) {
            navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
                .then(getUserMediaSuccess)
                .then((stream) => { })
                .catch((e) => console.log(e))
        } else {
            try {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { }
        }
    }





    let getDislayMediaSuccess = (stream) => {
        console.log("HERE")
        try {
            window.localStream.getTracks().forEach(track => track.stop())
        } catch (e) { console.log(e) }

        window.localStream = stream
        localVideoref.current.srcObject = stream

        for (let id in connections) {
            if (id === socketIdRef.current) continue

            connections[id].addStream(window.localStream)

            connections[id].createOffer().then((description) => {
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                    })
                    .catch(e => console.log(e))
            })
        }

        stream.getTracks().forEach(track => track.onended = () => {
            setScreen(false)

            try {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { console.log(e) }

            let blackSilence = (...args) => new MediaStream([black(...args), silence()])
            window.localStream = blackSilence()
            localVideoref.current.srcObject = window.localStream

            getUserMedia()

        })
    }

    let gotMessageFromServer = (fromId, message) => {
        var signal = JSON.parse(message)

        if (fromId !== socketIdRef.current) {
            if (signal.sdp) {
                connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
                    if (signal.sdp.type === 'offer') {
                        connections[fromId].createAnswer().then((description) => {
                            connections[fromId].setLocalDescription(description).then(() => {
                                socketRef.current.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }))
                            }).catch(e => console.log(e))
                        }).catch(e => console.log(e))
                    }
                }).catch(e => console.log(e))
            }

            if (signal.ice) {
                connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
            }
        }
    }




    let connectToSocketServer = () => {
        socketRef.current = io.connect(server_url, { secure: false })

        socketRef.current.on('signal', gotMessageFromServer)

        socketRef.current.on('connect', () => {
            socketRef.current.emit('join-call', window.location.href)
            socketIdRef.current = socketRef.current.id

            socketRef.current.on('chat-message', addMessage)

            socketRef.current.on('user-left', (id) => {
                setVideos((videos) => videos.filter((video) => video.socketId !== id))
            })

            socketRef.current.on('user-joined', (id, clients) => {
                clients.forEach((socketListId) => {

                    connections[socketListId] = new RTCPeerConnection(peerConfigConnections)
                    // Wait for their ice candidate       
                    connections[socketListId].onicecandidate = function (event) {
                        if (event.candidate != null) {
                            socketRef.current.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }))
                        }
                    }

                    // Wait for their video stream
                    connections[socketListId].onaddstream = (event) => {
                        console.log("BEFORE:", videoRef.current);
                        console.log("FINDING ID: ", socketListId);

                        let videoExists = videoRef.current.find(video => video.socketId === socketListId);

                        if (videoExists) {
                            console.log("FOUND EXISTING");

                            // Update the stream of the existing video
                            setVideos(videos => {
                                const updatedVideos = videos.map(video =>
                                    video.socketId === socketListId ? { ...video, stream: event.stream } : video
                                );
                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            });
                        } else {
                            // Create a new video
                            console.log("CREATING NEW");
                            let newVideo = {
                                socketId: socketListId,
                                stream: event.stream,
                                autoplay: true,
                                playsinline: true
                            };

                            setVideos(videos => {
                                const updatedVideos = [...videos, newVideo];
                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            });
                        }
                    };


                    // Add the local video stream
                    if (window.localStream !== undefined && window.localStream !== null) {
                        connections[socketListId].addStream(window.localStream)
                    } else {
                        let blackSilence = (...args) => new MediaStream([black(...args), silence()])
                        window.localStream = blackSilence()
                        connections[socketListId].addStream(window.localStream)
                    }
                })

                if (id === socketIdRef.current) {
                    for (let id2 in connections) {
                        if (id2 === socketIdRef.current) continue

                        try {
                            connections[id2].addStream(window.localStream)
                        } catch (e) { }

                        connections[id2].createOffer().then((description) => {
                            connections[id2].setLocalDescription(description)
                                .then(() => {
                                    socketRef.current.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription }))
                                })
                                .catch(e => console.log(e))
                        })
                    }
                }
            })
        })
    }

    let silence = () => {
        let ctx = new AudioContext()
        let oscillator = ctx.createOscillator()
        let dst = oscillator.connect(ctx.createMediaStreamDestination())
        oscillator.start()
        ctx.resume()
        return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false })
    }
    let black = ({ width = 640, height = 480 } = {}) => {
        let canvas = Object.assign(document.createElement("canvas"), { width, height })
        canvas.getContext('2d').fillRect(0, 0, width, height)
        let stream = canvas.captureStream()
        return Object.assign(stream.getVideoTracks()[0], { enabled: false })
    }

    let handleVideo = () => {
        setVideo(!video);
        // getUserMedia();
    }
    let handleAudio = () => {
        setAudio(!audio)
        // getUserMedia();
    }

    useEffect(() => {
        if (screen !== undefined) {
            getDislayMedia();
        }
    }, [screen])
    let handleScreen = () => {
        setScreen(!screen);
    }

    let handleEndCall = () => {
        try {
            let tracks = localVideoref.current.srcObject.getTracks()
            tracks.forEach(track => track.stop())
        } catch (e) { }
        window.location.href = "/home"
    }

    let openChat = () => {
        setModal(true);
        setNewMessages(0);
    }
    let closeChat = () => {
        setModal(false);
    }
    let handleMessage = (e) => {
        setMessage(e.target.value);
    }

    const addMessage = (data, sender, socketIdSender) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: sender, data: data }
        ]);
        if (socketIdSender !== socketIdRef.current) {
            setNewMessages((prevNewMessages) => prevNewMessages + 1);
        }
    };



    let sendMessage = () => {
        console.log(socketRef.current);
        socketRef.current.emit('chat-message', message, username)
        setMessage("");

        // this.setState({ message: "", sender: username })
    }

    
    let connect = () => {
        setAskForUsername(false);
        getMedia();
    }


    return (
        <div>

            {askForUsername === true ?

                <div>


                    <h2>Enter into Lobby </h2>
                    <TextField id="outlined-basic" label="Username" value={username} onChange={e => setUsername(e.target.value)} variant="outlined" />
                    <Button variant="contained" onClick={connect}>Connect</Button>


                    <div>
                        <video ref={localVideoref} autoPlay muted></video>
                    </div>

                </div> :


                <div className={styles.meetVideoContainer}>

                    {showModal ? <div className={styles.chatRoom}>

                        <div className={styles.chatContainer}>
                            <h1>Chat</h1>

                            <div className={styles.chattingDisplay}>

                                {messages.length !== 0 ? messages.map((item, index) => {

                                    console.log(messages)
                                    return (
                                        <div style={{ marginBottom: "20px" }} key={index}>
                                            <p style={{ fontWeight: "bold" }}>{item.sender}</p>
                                            <p>{item.data}</p>
                                        </div>
                                    )
                                }) : <p>No Messages Yet</p>}


                            </div>

                            <div className={styles.chattingArea}>
                                <TextField value={message} onChange={(e) => setMessage(e.target.value)} id="outlined-basic" label="Enter Your chat" variant="outlined" />
                                <Button variant='contained' onClick={sendMessage}>Send</Button>
                            </div>


                        </div>
                    </div> : <></>}


                    <div className={styles.buttonContainers}>
                        <IconButton onClick={handleVideo} style={{ color: "white" }}>
                            {(video === true) ? <VideocamIcon /> : <VideocamOffIcon />}
                        </IconButton>
                        <IconButton onClick={handleEndCall} style={{ color: "red" }}>
                            <CallEndIcon  />
                        </IconButton>
                        <IconButton onClick={handleAudio} style={{ color: "white" }}>
                            {audio === true ? <MicIcon /> : <MicOffIcon />}
                        </IconButton>

                        {screenAvailable === true ?
                            <IconButton onClick={handleScreen} style={{ color: "white" }}>
                                {screen === true ? <ScreenShareIcon /> : <StopScreenShareIcon />}
                            </IconButton> : <></>}

                        <Badge badgeContent={newMessages} max={999} color='orange'>
                            <IconButton onClick={() => setModal(!showModal)} style={{ color: "white" }}>
                                <ChatIcon />                        </IconButton>
                        </Badge>

                    </div>


                    <video className={styles.meetUserVideo} ref={localVideoref} autoPlay muted></video>

                    <div className={styles.conferenceView}>
                        {videos.map((video) => (
                            <div key={video.socketId}>
                                <video

                                    data-socket={video.socketId}
                                    ref={ref => {
                                        if (ref && video.stream) {
                                            ref.srcObject = video.stream;
                                        }
                                    }}
                                    autoPlay
                                >
                                </video>
                            </div>

                        ))}

                    </div>

                </div>

            }

        </div>
    )
}
