/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import ChatLists from "./ChatLists";
// import InputText from "./InputText";
import UserLogin from "./UserLogin";
import socketIOClient from "socket.io-client";
import DInput from "./demoinput/DInput";

const ChatContainer = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar"));
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const socketio = socketIOClient(SERVER_API);
  const [chats, setChats] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    socketio.on("chat", (chats) => {
      setChats(chats);
    });

    socketio.on('message', (msg) => {
      setChats((prevChats) => [...prevChats, msg])
    })

    return () => {
      socketio.off('chat')
      socketio.off('message')
    }
  }, [setChats, socketio]);

  const addMessage = (chat) => {
    const newChat = {
      username: localStorage.getItem("user"),
      message: chat,
      avatar: localStorage.getItem("avatar"),
    };
    socketio.emit('newMessage', newChat)
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const Logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem('avatar')
    setUser('')
    setAvatar('')
  }

  return (
    <div>
        
      {user ? (
        <div className="home">
          <div className="chats_header">
            <h2>BEGGER CHAT</h2>
            <div className="Profile" onClick={toggleDropdown}>
              <h4>
              <img className="headerlogo" src={avatar} alt="Profile" /> 
              {user}
              </h4>
              {dropdownVisible && (
                <div className="dropdown">
                  <p className="chats_logout" onClick={Logout}>
                    <strong>Logout</strong>
                  </p>
                </div>
              )}
            </div>
          </div>
          <ChatLists chats={chats} />
          {/* <InputText addMessage={addMessage} /> */}
          <DInput addMessage={addMessage}/>
        </div>
      ) : (
        <UserLogin setUser={setUser} />
      )}
    </div>
  );
};

export default ChatContainer;
