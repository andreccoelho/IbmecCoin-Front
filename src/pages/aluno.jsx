import React, { useEffect, useState } from 'react';
import Base from './Base';
import { Link } from 'react-router-dom';
import {logoutUser} from "../util/auth";

const Aluno = () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [aluno, setAluno] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlunoData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/aluno/informacao`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ matricula: user['matricula'] }),
                });

                const data = await response.json();
                if (response.ok) {
                    setAluno(data.aluno);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                console.error('Error fetching aluno data:', error);
                setError('An error occurred. Please try again.');
            }
        };

        if (user) {
            fetchAlunoData();
        }
    }, [user]);

    if (!user) {
        return (
            <Base>
                <p>User not found in localStorage.</p>
            </Base>
        );
    }

    return (
        <>
            {error && <p>{error}</p>}
            <div className="aluno-info">
                <h1>PÁGINA DO ALUNO</h1>
                <h2>INFORMAÇÕES</h2>
                {aluno ? (
                    <>
                        <p>Usuário logado: {aluno.nome}</p>
                        <p>Matrícula: {aluno.matricula}</p>
                        <p>Saldo: {aluno.saldo}</p>
                        <p>Turma: {aluno.id_turma}</p>
                        <p>Tipo: {aluno.tipo}</p>
                        <p>Grupo: {aluno.id_grupo}</p>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className="aluno-turma">
                <h2>TURMA</h2>
                {aluno && !aluno.id_turma ? (
                    <Link to="/turma/entrar">Entrar em turma</Link>
                ) : (
                    <Link to={`/turma/${aluno ? aluno.id_turma : ''}`}>Ver turma</Link>
                )}
            </div>
            <div className="aluno-grupo">
                <h2>GRUPO</h2>
                {aluno && !aluno.id_grupo ? (
                    <>
                        <Link to="/grupo/criar">Criar grupo</Link>
                        <Link to="/grupo/convites">Ver convites</Link>
                    </>
                ) : (
                    <Link to="/grupo/informacao">Ver grupo</Link>
                )}
            </div>
            <div className="aluno-login">
                <h2>LOGIN</h2>
                <button onClick={logoutUser}>DESLOGAR</button>
            </div>
        </>
    );
};

export default Aluno;
