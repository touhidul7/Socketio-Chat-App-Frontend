/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";

const InputText = ({ addMessage }) => {
  const [message, setMessage] = useState();
  const sendMessage = () => {
    addMessage(message);
    setMessage("");
  };
  return (
    <div>
      <form className="inputtext_container" onSubmit={sendMessage}>
        <input
          name="message"
          id="message"
          placeholder="Input Message ..."
          onChange={(e) => setMessage(e.target.value)}
          required
          value={message}
        />
        <button type="submit">
          <IoSendSharp />
        </button>
      </form>
    </div>
  );
};

export default InputText;
