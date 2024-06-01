
import React from "react";
import { createRoot } from "react-dom/client";

import Home from "./pages/exemplos/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Fotos from "./pages/exemplos/Fotos";
import Login from "./pages/exemplos/Login";
import Logout from "./pages/exemplos/Logout";
import { auth } from "./config/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import Atletas from "./pages/exemplos/Atletas";
import Index from "./pages";

const container = document.getElementById("root");
const root = createRoot(container);

onAuthStateChanged(auth, (user)=> {
  if (user) {
    window.sessionStorage.setItem("accessToken", user.accessToken);
  } else {
    window.sessionStorage.removeItem("accessToken");
  }
});

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index/>} />
        <Route path="/professor" element={<Fotos/>} />
        <Route path="/aluno" element={<Atletas/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
