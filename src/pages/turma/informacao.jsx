import React, { useEffect, useState } from 'react';
import Base from '../Base';
import {Link, useParams} from 'react-router-dom';

const Turma = () => {
    const { id_turma } = useParams();

    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [turma, setTurma] = useState(null);
    const [error, setError] = useState(null);
    const [matricula_aluno_novo, setMatriculaAlunoNovo] = useState('');

    useEffect(() => {
        const fetchTurmaData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/turma/informacao`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id_turma: id_turma , matricula: user['matricula']}),
                });

                const data = await response.json();
                if (response.ok) {
                    setTurma(data.turma);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                console.error('Error fetching turma data:', error);
                setError('An error occurred. Please try again.');
            }
        };

        if (user) {
            fetchTurmaData();
        }
    }, [user]);

    const handleAddAluno = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/turma/adicionar_aluno`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_turma: id_turma, matricula_aluno_novo}),
            });

            const data = await response.json();
            if (response.ok) {
                setTurma(data.turma);
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error adding aluno:', error);
            setError('An error occurred. Please try again.');
        }
    };

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
            <div className="turma-info">
                <h1>TURMA</h1>
                <h2>INFORMAÇÕES</h2>
                {turma ? (
                    <>
                        <p>Matéria: {turma.nome}</p>
                        <p>Qtd. Alunos: {turma.turma.length}</p>
                        <p>Professor: {turma.professor.nome}</p>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className="turma-alunos">
                <h2>ALUNOS</h2>
                {turma && turma.turma.length > 0 ? (
                    <table>
                        <thead>
                        <tr>
                            <th>Matrícula</th>
                            <th>Nome</th>
                            <th>Saldo</th>
                        </tr>
                        </thead>
                        <tbody>
                        {turma.turma.map(aluno => (
                            <tr key={aluno.matricula}>
                                <td>{aluno.matricula}</td>
                                <td>{aluno.nome}</td>
                                <td>{aluno.saldo}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <h3>Não há alunos</h3>
                )}
            </div>
            {user.tipo === 'professor' && (
                <div className="turma-adicionar-aluno">
                    <h2>ADICIONAR ALUNO</h2>
                    <form onSubmit={handleAddAluno}>
                        <label htmlFor="matricula_aluno_novo"> Mátricula do aluno novo:
                            <input
                                type="text"
                                name="matricula_aluno_novo"
                                placeholder="Matricula do novo aluno"
                                value={matricula_aluno_novo}
                                onChange={(e) => setMatriculaAlunoNovo(e.target.value)}
                            />
                        </label>
                        <button type="submit">Adicionar</button>
                    </form>
                </div>
            )}
            <div className="turma-voltar">
                <Link to="/">Voltar</Link>
            </div>
        </>
    );
};

export default Turma;
