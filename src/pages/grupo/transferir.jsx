import React, { useEffect, useState } from 'react';
import Base from '../Base';
import { useParams, Link } from 'react-router-dom';

const GrupoTransferir = () => {
    const { destinatario_matricula } = useParams();
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [destinatario, setDestinatario] = useState(destinatario_matricula || '');
    const [aluno, setAluno] = useState(null);
    const [quantidade, setQuantidade] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (destinatario_matricula) {
            setDestinatario(destinatario_matricula);
        }

        const fetchAlunoData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/aluno/informacao`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ matricula: user.matricula }),
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

    }, [destinatario_matricula, user]);

    const handleTransfer = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/grupo/transferir`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ matricula: user.matricula, usuario: destinatario, quantidade })
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess('Transferência realizada com sucesso!');
                setDestinatario('');
                setQuantidade('');
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error transferring IbmecCoins:', error);
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
        <Base>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
            <h1>Transferir IbmecCoins</h1>
            <p>Saldo atual: {aluno ? aluno.saldo : 'Carregando...'}</p>
            <form onSubmit={handleTransfer}>
                <label htmlFor="usuario">Usuário:</label>
                <input
                    type="text"
                    id="usuario"
                    name="usuario"
                    value={destinatario}
                    onChange={(e) => setDestinatario(e.target.value)}
                    required
                />
                <label htmlFor="quantidade">Quantidade:</label>
                <input
                    type="number"
                    id="quantidade"
                    name="quantidade"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    required
                />
                <button type="submit">Transferir</button>
            </form>
            <Link to="/">Voltar</Link>
        </Base>
    );
};

export default GrupoTransferir;
