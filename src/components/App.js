import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";

import { AuthProvider } from "../context/AuthContext";

import Chats from "./Chats"

function App() {
  return (
    // <>
    // <Login/>
    // </>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chats" element={<Chats/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
