import React, { useEffect, useState } from 'react';
import Base from '../Base';
import { Link } from 'react-router-dom';

const BeneficiarIbmecCoins = () => {
    const [usuario, setUsuario] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [alunos, setAlunos] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchAlunos = async () => {
            try {
                const response = await fetch(`http://localhost:5000/aluno/alunos`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();
                if (response.ok) {
                    setAlunos(data.alunos);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                console.error('Error fetching alunos:', error);
                setError('Um erro ocorreu no get de alunos.');
            }
        };

        fetchAlunos();
    }, []);

    const handleTransfer = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/professor/beneficiar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usuario, quantidade })
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess('Transferência realizada com sucesso!');
                setUsuario('');
                setQuantidade('');
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error transferring IbmecCoins:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <Base>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
            <h1>Beneficiar IbmecCoins</h1>
            <form onSubmit={handleTransfer}>
                <label htmlFor="usuario">Usuário:</label>
                <input
                    type="text"
                    id="usuario"
                    name="usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
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

            <h1>Alunos</h1>
            <table>
                <thead>
                <tr>
                    <th>Matrícula</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Saldo</th>
                </tr>
                </thead>
                <tbody>
                {alunos.map(aluno => (
                    <tr key={aluno.matricula}>
                        <td>{aluno.matricula}</td>
                        <td>{aluno.nome}</td>
                        <td>{aluno.email}</td>
                        <td>{aluno.saldo}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Base>
    );
};

export default BeneficiarIbmecCoins;
