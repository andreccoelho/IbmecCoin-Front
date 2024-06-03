import React, { useState } from 'react';
import Base from '../Base';
import {useNavigate} from "react-router-dom";

const TurmaEntrar = () => {
    const [nome, setNome] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const handleEntrar = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/turma/entrar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome: nome, matricula: user.matricula })
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess('Entrada na loja realizada com sucesso!');
                setNome('');
                navigate('/perfil');
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error entering loja:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <Base>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
            <h1>ENTRAR TURMA</h1>
            <h2>FORM</h2>
            <form onSubmit={handleEntrar}>
                <label htmlFor="nome">Nome:</label>
                <input
                    type="text"
                    name="nome"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Entrar</button>
            </form>
        </Base>
    );
};

export default TurmaEntrar;
