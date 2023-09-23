import React from "react";
import { useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { ChatEngine } from "react-chat-engine";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Chats = () => {
  const navigate = useNavigate();
  const didMountRef = useRef(false)
  const { user } = useAuth();
  const [loading ,setLoading] = useState(true)
  // console.log(user);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };
  
  const getFile = async(url)=>{
    const response = await fetch(url);
    const data = await response.blob();
    console.log(data)
    return new File([data],"userPhoto.jpg",{type:"image/jpeg"})
  }

  useEffect(() => {
    if (!didMountRef.current){
      didMountRef.current = true
  }

    if (!user || user===null) {
      navigate("/");
      return;
    }

    axios.get('https://api.chatengine.io/users/me/', 
    {
      headers: {
        'project-id' : 'b604b148-8c0d-4193-8593-857c1e5c934b',
        "user-name": user.email,
        "user-secret": user.uid,
      },
    }).then((res)=>{
      setLoading(false);
      console.log(res)
    })
    .catch(()=>{
      let formdata = new FormData();
      formdata.append('email',user.email);
      formdata.append('username',user.email);
      formdata.append('secret',user.uid);
      getFile(user.photoURL)
      .then((avatar)=>{
        formdata.append('avatar',avatar,avatar.name)

        axios.post('https://api.chatengine.io/users/',
        formdata,
        {headers: {"Private-Key":"62a24833-8b98-482e-97e5-0b4c8534c1ee"}})
        .then((res)=>{
          setLoading(false)
          console.log(res)
        })
        .catch((error)=>{
          console.log(error)
        })
      })
     
    })
  }, [user, navigate]);
  // console.log(ans)

  if(!user || loading) return "Loading..."
  return (
    <>
      <div className="chats-page">
        <div className="nav-bar">
          <div className="logo-tab">Chatify</div>
          <div className="logout-tab" onClick={handleLogout}>
            Logout
           {/* {console.log(process.env.REACT_CHATAPP_KEY)} */}
          </div>
        </div>
        <ChatEngine
          height="calc(100vh-86px)"
          projectID="b604b148-8c0d-4193-8593-857c1e5c934b"
          // projectID={process.env.REACT_CHATAPP_ID}
          userName={user.email}
          userSecret={user.uid}
        />
      </div>
    </>
  );
};

export default Chats;

