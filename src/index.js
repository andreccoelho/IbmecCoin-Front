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
import QrCodeCriar from './pages/qrcode/criar';
import QrCodeExibirToken from './pages/qrcode/exibir-token';
import QrCodeFoto from './pages/qrcode/foto';
import QrCodeLeitor from './pages/qrcode/leitor';
import QrCodeRegistroToken from './pages/qrcode/registro-token';
import QrCodeValidar from './pages/qrcode/validar';
import TurmaCriar from './pages/turma/criar';
import TurmaEntrar from './pages/turma/entrar';
import TurmaInformacao from './pages/turma/informacao';

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
        <Route path="/professor" element={<Professor />} />
        <Route path="/aluno" element={<Aluno />} />
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
        <Route path="/qrcode/criar" element={<QrCodeCriar />} />
        <Route path="/qrcode/exibir-token" element={<QrCodeExibirToken />} />
        <Route path="/qrcode/foto" element={<QrCodeFoto />} />
        <Route path="/qrcode/leitor" element={<QrCodeLeitor />} />
        <Route path="/qrcode/registro-token" element={<QrCodeRegistroToken />} />
        <Route path="/qrcode/validar" element={<QrCodeValidar />} />
        <Route path="/turma/criar" element={<TurmaCriar />} />
        <Route path="/turma/entrar" element={<TurmaEntrar />} />
        <Route path="/turma/informacao" element={<TurmaInformacao />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
