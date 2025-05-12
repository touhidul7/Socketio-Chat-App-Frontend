/* eslint-disable react/prop-types */
import { useState } from "react";
import "../style.css";
import _ from "lodash";
import toast, { Toaster } from "react-hot-toast";

const UserLogin = ({ setUser }) => {
  const [passWord, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const handleUser = (e) => {
    e.preventDefault();
    if (passWord === "admin") {
      toast.success('Successfully toasted!');
      localStorage.setItem("user", userName);
      localStorage.setItem(
        "avatar",
        `https://picsum.photos/id/${_.random(1, 1000)}/200/300`
      );

      setTimeout(() => {
        setUser(userName);
      }, 2000); // 2 seconds delay
    } else {
      toast.error('Invalid username or password!');
    }
  };

  return (
    <div className="logincontainer">
      <Toaster />
      <div className="form-container">
        <h1 className="title">LOGIN / SIGNUP</h1>
        <form onSubmit={handleUser} className="form">
          <div className="input-group">
            <label htmlFor="username" className="username">
              Username
            </label>
            <input
              type="text"
              name="username"
              required
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="sign-in">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
