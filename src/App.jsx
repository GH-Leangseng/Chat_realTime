import { useEffect, useState } from 'react';
import {io} from 'socket.io-client'
import '../src/App.css'
function App() {
    const [userId , setUserId] = useState("");
    const [ownId , setOwnID] = useState("");
    const [name , setName] = useState("");
    const [message , setMessage] = useState("");
    const [allmessage, setAllMessage] = useState([]);
    // const socket = io('http://localhost:3001');
    const socket = io('https://chat-sz19.onrender.com');

  const sentMessage=()=>{
    if(message !== ""){
      const data = {
         message : message,
         toid  : userId,
         name : name
      }
      socket.emit('sent_message',data);
      console.log(data);
      console.log(allmessage);
      setAllMessage((pre)=>[...pre, data]);
      
    }
    setMessage("");

  }

  useEffect(()=>{
      socket.on('recv_message',data=>{
        // alert("get"+data.message);
        setAllMessage((pre)=>[...pre, data]);
        
       
      })
  },[socket])

 
  useEffect(()=>{
    socket.on("connect",()=>{
      // console.log(socket.id);
         setOwnID(socket.id);
    });
  },[])
  return (
    <div className='app' >
        <div className='chat-container pt-20'>
        <span className='text-center absolute top-2 left-1/2 -translate-x-1/2  px-20 bg-blue-600 text-white py-3 rounded-full'> User ID {"=>"}  {ownId}</span>
        
          {
            allmessage.map((data)=>(
              <div className='message' id= {data.name == name ? "you-container" : "other-con"}>
                
                  <p id= {data.name == name ? "you" : "other"}>
                    {data.message}
                    <h5 className='font-bold'>{data.name == name ? "You" : data.name }</h5>
                  </p>
                
              </div>
            ))
          }
       
         
     
        </div>
        <div className='message-box absolute flex px-2 bottom-0 left-0 w-full h-[6%] mb-2'>
            <input type="text" value={userId} className='w-full mx-2 bg-slate-200 rounded-full pl-5' placeholder='user Id ' onChange={e=>setUserId(e.target.value)} />
            <input type="text" value={name}  className='w-full mx-2  bg-slate-200 rounded-full pl-5' placeholder='your name ' onChange={e=>setName(e.target.value)}  />
            <input type="text"  value={message} className='w-full mx-2  bg-slate-200 rounded-full pl-5' placeholder='message'  onChange={e=>setMessage(e.target.value)} />
            <button className='px-5 py-2 mx-2 rounded-full w-[40%]  pl-5 bg-cyan-300 text-black uppercase' onClick={sentMessage}>Send</button>
          </div>
        
  
      </div>
  )
}

export default App
