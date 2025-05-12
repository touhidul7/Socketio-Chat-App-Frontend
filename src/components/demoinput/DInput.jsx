/* eslint-disable react/prop-types */
import { useState } from "react";
import "./input.css";
import { CirclePlus, SendHorizontal } from "lucide-react";
const DInput = ({ addMessage }) => {
  const [message, setMessage] = useState();
  const sendMessage = () => {
    addMessage(message);
    setMessage("");
  };
  return (
    <div className="fixed bottom-0 left-0 right-0 m-auto">
      <form onSubmit={sendMessage}>
        <div className="flex bg-[#2d2d2d] border-[1px] border-[#3f3f3f] rounded-lg msg-input-container mx-6 mb-4">
          <div className="messageBox">
            <div className="fileUploadWrapper">
              <label htmlFor="file">
             <CirclePlus className="text-gray-400 hover:text-white"/>
                <span className="tooltip">Add Files</span>
              </label>
              <input type="file" id="file" name="file" />
            </div>
            <input
              onChange={(e) => setMessage(e.target.value)}
              required
              value={message}
              placeholder="Message..."
              type="text"
              id="messageInput"
            />
          </div>
          <button id="sendButton" type="submit">
          <SendHorizontal className="text-gray-400 hover:text-white"/>
          </button>
        </div>
      </form>
    </div>
  );
};

export default DInput;
