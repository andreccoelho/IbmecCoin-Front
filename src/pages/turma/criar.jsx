import React, { useState } from 'react';
import Base from '../Base';

const CriarTurma = () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [nome, setNome] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleCreateTurma = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/turma/criar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome: nome, matricula: user['matricula'] }),
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess('Turma criada com sucesso!');
                setNome('');
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error creating turma:', error);
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
            <h1>CRIAR TURMA</h1>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
            <form onSubmit={handleCreateTurma}>
                <label htmlFor="nome">Nome da Turma</label>
                <input
                    type="text"
                    name="nome"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <br />
                <button type="submit">Criar</button>
            </form>
        </Base>
    );
};

export default CriarTurma;
