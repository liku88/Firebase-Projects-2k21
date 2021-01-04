import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import {Avatar, IconButton} from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import {MoreVert, SearchOutlined} from '@material-ui/icons'
import SidebarChat from './SidebarChat'

import db from './firebaseConfig'
import { useStateValue } from './StateProvider'


const Sidebar = () => {

const [rooms, setRooms] = useState([]);
const [{user}, dispatch] = useStateValue();

useEffect(() => {
  db.collection('rooms').onSnapshot((snapshot) => 
      setRooms(snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
      })))
  )
},[])

    return(
<div className="sidebar">
<div className="sidebar-header">
<Avatar src={user?.photoURL}/>
<div className="sidebar-header-right">
<IconButton>
<DonutLargeIcon/>
</IconButton>
<IconButton>
<ChatIcon />
</IconButton>
<IconButton>
<MoreVert />
</IconButton>
</div>
</div>

<div className="sidebar-search">
<div className="sidebar-search-container">
<SearchOutlined />
<input type="text" placeholder="Search or start new chat" />
</div>
</div>

<div className="sidebar-chats">
<SidebarChat addNewChart />
{rooms.map(room => (
    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
))}

</div>

</div>
    )
}
export default Sidebar;