import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { auth } from "./config/Firebase";
import { onAuthStateChanged } from "firebase/auth";

import Index from './pages/index';
import HistoricoAluno from './pages/aluno/historico';
import Login from './pages/auth/login';
import Registro from './pages/auth/registro';
import GrupoAceitar from './pages/grupo/aceitar';
import GrupoConvidar from './pages/grupo/convidar';
import GrupoConvites from './pages/grupo/convites';
import GrupoCriar from './pages/grupo/criar';
import GrupoTransferir from './pages/grupo/transferir';
import LojaItem from './pages/loja/item';
import Loja from './pages/loja/loja';
import BeneficiarProfessor from './pages/professor/beneficiar';
import TransacoesProfessor from './pages/professor/transacoes';
import QrcodeCriar from './pages/qrcode/criar';
import QrCodeFoto from './pages/qrcode/foto';
import QrCodeLeitor from './pages/qrcode/leitor';
import QrCodeRegistroToken from './pages/qrcode/registro-token';
import QrCodeValidar from './pages/qrcode/validar';
import TurmaCriar from './pages/turma/criar';
import TurmaEntrar from './pages/turma/entrar';
import Turma from './pages/turma/informacao';
import Perfil from "./pages/perfil";
import CriarTurma from "./pages/turma/criar";
import Saldo from "./pages/saldo";
import Qrcode from "./pages/qrcode";
import Grupo from "./pages/grupo/informacao";
import Grupos from "./pages/grupo/grupos";

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
        <Route path="/" element={<Index />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/saldo/historico" element={<HistoricoAluno />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/registro" element={<Registro />} />
        <Route path="/saldo/grupo/aceitar" element={<GrupoAceitar />} />
        <Route path="/saldo/grupo/convidar" element={<GrupoConvidar />} />
        <Route path="/saldo/grupo/convites" element={<GrupoConvites />} />
        <Route path="/saldo/grupo/criar" element={<GrupoCriar />} />
        <Route path="/saldo/grupo" element={<Grupo />} />
        <Route path="/saldo/grupo/transferir/:destinatario_matricula" element={<GrupoTransferir />} />
        <Route path="/saldo/grupos" element={<Grupos />} />
        <Route path="/loja/item/:id_item" element={<LojaItem />} />
        <Route path="/loja" element={<Loja />} />
        <Route path="/saldo/beneficiar" element={<BeneficiarProfessor />} />
        <Route path="/saldo/transacoes" element={<TransacoesProfessor />} />
        <Route path="/qrcode/criar" element={<QrcodeCriar />} />
        <Route path="/qrcode" element={<Qrcode />} />
        <Route path="/qrcode/foto/:token" element={<QrCodeFoto />} />
        <Route path="/qrcode/leitor" element={<QrCodeLeitor />} />
        <Route path="/qrcode/registro-token" element={<QrCodeRegistroToken />} />
        <Route path="/qrcode/validar" element={<QrCodeValidar />} />
        <Route path="/perfil/turma/criar" element={<CriarTurma />} />
        <Route path="/perfil/turma/entrar" element={<TurmaEntrar />} />
        <Route path="/perfil/turma/:id_turma" element={<Turma />} />
        <Route path="/saldo" element={<Saldo />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
