import React, { useEffect, useRef, useState } from "react";
import ChatLists from "./ChatLists";
import UserLogin from "./UserLogin";
import DInput from "./demoinput/DInput";
import socketIOClient from "socket.io-client";

const ChatContainer = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar"));
  const [chats, setChats] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const socketRef = useRef(null); // ✅ Use ref for persistent socket instance
  const SERVER_API = import.meta.env.VITE_SERVER_API;

  useEffect(() => {
    // ✅ Only create socket once
    if (!socketRef.current) {
      socketRef.current = socketIOClient(SERVER_API);

      socketRef.current.on("chat", (chats) => {
        setChats(chats);
      });

      socketRef.current.on("message", (msg) => {
        setChats((prevChats) => [...prevChats, msg]);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect(); // ✅ Clean up on unmount
        socketRef.current = null;
      }
    };
  }, [SERVER_API]);

  const addMessage = (chat) => {
    const tempId = Date.now().toString(); // optional: for sending UI
    const newChat = {
      username: localStorage.getItem("user"),
      message: chat,
      avatar: localStorage.getItem("avatar"),
      timeStamp: Date.now(),
      tempId,
    };

    setChats((prev) => [...prev, { ...newChat, sending: true }]); // optional for UI
    socketRef.current.emit("newMessage", newChat);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const Logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("avatar");
    setUser("");
    setAvatar("");
  };

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
          <DInput addMessage={addMessage} />
        </div>
      ) : (
        <UserLogin setUser={setUser} />
      )}
    </div>
  );
};

export default ChatContainer;
