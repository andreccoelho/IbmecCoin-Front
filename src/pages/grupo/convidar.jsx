import React, { useState } from 'react';
import Base from '../Base';

const Convidar = () => {
    const [matricula, setMatricula] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const handleInvite = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/grupo/convidar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ matricula: user.matricula, destinatario: matricula })
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess('Convite enviado com sucesso!');
                setMatricula('');
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error inviting member:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <Base>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
            <h1>CONVIDAR</h1>
            <form onSubmit={handleInvite}>
                <label htmlFor="matricula">Matrícula:</label>
                <input
                    type="text"
                    name="matricula"
                    id="matricula"
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
                    required
                />
                <input type="submit" value="Convidar" />
            </form>
        </Base>
    );
};

export default Convidar;
