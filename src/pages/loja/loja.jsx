import React, { useEffect, useState } from 'react';
import Base from '../Base';
import { Link } from 'react-router-dom';

const LojaItens = () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [itens, setItens] = useState([]);
    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchItens = async () => {
            try {
                const response = await fetch(`http://localhost:5000/loja/itens`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();
                if (response.ok) {
                    setItens(data.itens);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                console.error('Error fetching itens:', error);
                setError('An error occurred. Please try again.');
            }
        };

        fetchItens();
    }, []);

    const handleAddItem = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/loja/adicionar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, valor })
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess('Item adicionado com sucesso!');
                setNome('');
                setValor('');
                setItens([...itens, data.item]);
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error adding item:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <Base>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
            <h1>LOJA - ITENS</h1>

            {user && user.tipo === "aluno" && (
                <>
                    <h2>SALDO</h2>
                    <p>Seu saldo é de IbmecCoins {user.saldo}</p>
                </>
            )}

            <h2>TABELA</h2>
            <table>
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Preço</th>
                    {user && user.tipo === "aluno" && <th>Comprar</th>}
                </tr>
                </thead>
                <tbody>
                {itens.map(item => (
                    <tr key={item.id_item}>
                        <td><Link to={`/loja/item/${item.id_item}`}>{item.nome}</Link></td>
                        <td>{item.valor}</td>
                        {user && user.tipo === "aluno" && (
                            <td><Link to={`/loja/comprar/${item.id_item}`}>Comprar</Link></td>
                        )}
                    </tr>
                    ))}
                </tbody>
            </table>

            {user && user.tipo === "professor" && (
                <div>
                    <h2>ADICIONAR ITEM</h2>
                    <form onSubmit={handleAddItem}>
                        <label htmlFor="nome">Nome:</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                        <label htmlFor="valor">Valor:</label>
                        <input
                            type="number"
                            id="valor"
                            name="valor"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                            required
                        />
                        <input type="submit" value="Adicionar" />
                    </form>
                </div>
            )}

            <h2>VOLTAR</h2>
            <Link to="/">Voltar</Link>
        </Base>
);
};

export default LojaItens;
