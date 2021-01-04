import React, {useState, useEffect } from 'react'
import './SidebarChat.css'
import {Avatar} from '@material-ui/core'
import db from './firebaseConfig';
import {Link, useParams} from "react-router-dom"



const SidebarChat = ({id, name, addNewChart}) => {
   

    const [helloMangal , setHelloMangal] = useState("");

    const[lastSeenMsg, setLastSeenMsg] = useState([]);

    

useEffect(() => {
   setHelloMangal(Math.floor(Math.random() * 5000));
}, []);

useEffect(() => {
   if(id){
       db.collection("rooms").doc(id).collection("messages").orderBy("timestamp", "desc").onSnapshot((snapshot) => setLastSeenMsg(snapshot.docs.map((doc) => doc.data())))
   }
}, [id])

const createChat = () => {
 const roomName = prompt("Please enter name for Room");
 if(roomName){
    //  we will do some stuff here database work1
    db.collection("rooms").add({
        name : roomName
    })

 }
}
    return !addNewChart ?(
        <Link className="link" to={`/rooms/${id}`}>
        <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${helloMangal}.svg`} />
        <div className="sidebar-chat-info">
        <h2>{name}</h2>
        <p>{lastSeenMsg[0]?.message}</p>
        </div>
       
        
        </div>
        </Link>
    ) : (
        <div onClick={createChat} className="sidebarChat">
        <h2>Add new Chat</h2>
        </div>
    )
}
export default SidebarChat