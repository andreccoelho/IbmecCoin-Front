import React, { useEffect, useState } from 'react';
import Base from './Base';
import {Link} from "react-router-dom";
import {logoutUser} from "../util/auth";

const Professor = () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [professor, setProfessor] = useState(null);
    const [turmas, setTurmas] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfessorData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/professor/informacao`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ matricula: user['matricula']}),
                });

                const data = await response.json();
                if (response.ok) {
                    setProfessor(data.professor);
                    setTurmas(data.turmas);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                console.error('Error fetching professor data:', error);
                setError('An error occurred. Please try again.');
            }
        };

        if (user) {
            fetchProfessorData();
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
            <div className="professor-info">
                <h1>PROFESSOR</h1>
                <h2>INFORMAÇÕES</h2>
                {professor ? (
                    <>
                        <p>Matrícula: {professor.matricula}</p>
                        <p>Nome: {professor.nome}</p>
                        <p>Email: {professor.email}</p>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className="professor-turma">
                <h2>TURMA</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Quantidade alunos</th>
                        <th>Acessar</th>
                    </tr>
                    </thead>
                    <tbody>
                    {turmas.length > 0 ? (
                        turmas.map(turma => (
                            <tr key={turma.id_turma}>
                                <td>{turma.nome}</td>
                                <td>{turma.turma.length}</td>
                                <td><Link to={`/turma/${turma.id_turma}`}>Acessar</Link></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">Nenhuma turma disponível</td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <a href="/turma/criar">Criar turma</a>
            </div>
            <div className="professor-login">
                <h2>LOGIN</h2>
                <button onClick={logoutUser}>DESLOGAR</button>
            </div>
        </>
    );
};

export default Professor;
