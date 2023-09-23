import React from "react";
import { GoogleOutlined } from "@ant-design/icons";
import "firebase/compat/app";
// import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const handleGoogle = async(e) => {
    const provider = await new GoogleAuthProvider();
    return signInWithPopup(auth,provider)
  };
  return (
    <div id="login-page">
      <div id="login-card">
        <h2>Welcome to Chatify</h2>
        <br />
        <div className="login-button google" onClick={handleGoogle}>
          <GoogleOutlined /> Sign In with Google
        </div>
      </div>
    </div>
  );
};

export default Login;
