import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { auth } from "./config/Firebase";
import { onAuthStateChanged } from "firebase/auth";

import Index from './pages/index';
import Professor from './pages/professor';
import Aluno from './pages/aluno';
import HistoricoAluno from './pages/aluno/historico';
import Login from './pages/auth/login';
import Registro from './pages/auth/registro';
import GrupoAceitar from './pages/grupo/aceitar';
import GrupoConvidar from './pages/grupo/convidar';
import GrupoConvites from './pages/grupo/convites';
import GrupoCriar from './pages/grupo/criar';
import GrupoInformacao from './pages/grupo/informacao';
import GrupoTransferir from './pages/grupo/transferir';
import LojaComprar from './pages/loja/comprar';
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
import Qrcode from "./pages/qrcode/qrcode";

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
        <Route path="/aluno/historico" element={<HistoricoAluno />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/registro" element={<Registro />} />
        <Route path="/grupo/aceitar" element={<GrupoAceitar />} />
        <Route path="/grupo/convidar" element={<GrupoConvidar />} />
        <Route path="/grupo/convites" element={<GrupoConvites />} />
        <Route path="/grupo/criar" element={<GrupoCriar />} />
        <Route path="/grupo/informacao" element={<GrupoInformacao />} />
        <Route path="/grupo/transferir" element={<GrupoTransferir />} />
        <Route path="/loja/comprar" element={<LojaComprar />} />
        <Route path="/loja/item" element={<LojaItem />} />
        <Route path="/loja/loja" element={<Loja />} />
        <Route path="/professor/beneficiar" element={<BeneficiarProfessor />} />
        <Route path="/professor/transacoes" element={<TransacoesProfessor />} />
        <Route path="/qrcode/criar" element={<QrcodeCriar />} />
        <Route path="/qrcode" element={<Qrcode />} />
        <Route path="/qrcode/foto/:token" element={<QrCodeFoto />} />
        <Route path="/qrcode/leitor" element={<QrCodeLeitor />} />
        <Route path="/qrcode/registro-token" element={<QrCodeRegistroToken />} />
        <Route path="/qrcode/validar" element={<QrCodeValidar />} />
        <Route path="/turma/criar" element={<CriarTurma />} />
        <Route path="/turma/entrar" element={<TurmaEntrar />} />
        <Route path="/turma/:id_turma" element={<Turma />} />
        <Route path="/saldo" element={<Saldo />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
