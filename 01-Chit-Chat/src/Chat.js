import { Avatar, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {AttachFile, MoreVert, SearchOutlined,} from '@material-ui/icons'
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import MicIcon from "@material-ui/icons/Mic"
import './Chat.css'
import { useParams } from 'react-router-dom';
import db from './firebaseConfig';
import { useStateValue } from './StateProvider';
import firebase from "firebase";
const Chat = () => {
const [helloMangal, setHelloMangal] = useState("");
const [input, setInput] = useState("");
const {roomId} = useParams();

const[roomName, setRoomName] = useState("");
const[messages, setMessages] = useState([]);
const [{user}, dispatch] = useStateValue();





useEffect(() => {
    if(roomId){
       db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
           setRoomName(snapshot.data().name)
       )) 
    }
    db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp", "asc").onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())))
    },[roomId])

useEffect(() => {
setHelloMangal(Math.floor(Math.random() * 5000));
}, [roomId])





const sendMessage = (e) => {
 e.preventDefault();
 console.log("You typed >>>", input);
db.collection('rooms').doc(roomId).collection('messages').add({
    message: input,
    name: user.displayName,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()

})
 
 setInput("")
}

    return(
        <div className="chat">
        <div className="chat-header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${helloMangal}.svg`}/>
        <div className="chat-header-info">
        <h3>{roomName}</h3>
        <p>{new Date(
            messages[messages.length - 1]?.timestamp?.toDate()
        ).toUTCString()}</p>
       
        </div>
        <div className="chat-header-right">
        <IconButton>
        <SearchOutlined />
        </IconButton>
        <IconButton>
        <AttachFile />
        </IconButton>
        <IconButton>
        <MoreVert />
        </IconButton>
        </div>
        </div>

        <div className="chat-body">
        {messages.map((message) => (
            <p className={`chat-message ${message.name === user.displayName &&  'chat-reciever'}`}>
            <span className="chat-name">
           {message.name}
            </span>
           {message.message}
            <span className="time-stamp">
           {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
            </p>
        ))}
       
        </div>
        
        <div className="chat-footer">
<InsertEmoticonIcon />
<form>
<input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text"/>
<button onClick={sendMessage} type="submit">Send a message</button>
</form>
<MicIcon />

        </div>
        </div>
    )
}

export default Chat