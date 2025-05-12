/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./input.css";
import { useForm } from 'react-hook-form';

import { CirclePlus, SendHorizontal } from "lucide-react";
const DInput = ({ addMessage }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();


  /* hook form */
  const onSubmit = (data) => {
    addMessage(data?.messageInput);
    reset();
  };





  return (
    <div className="fixed bottom-0 left-0 right-0 m-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex bg-[#2d2d2d] border-[1px] border-[#3f3f3f] rounded-lg msg-input-container mx-6 mb-4">
          <div className="messageBox">
            <div className="fileUploadWrapper">
              <label htmlFor="file">
                <CirclePlus className="text-gray-400 hover:text-white" />
                <span className="tooltip">Add Files</span>
              </label>
              <input type="file" id="file" name="file" />
            </div>
            <input
              {...register("messageInput", { required: true })}
              required
              placeholder="Message..."
              type="text"
              id="messageInput"
            />
          </div>
          <button id="sendButton" type="submit">
            <SendHorizontal className="text-gray-400 hover:text-white" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default DInput;
