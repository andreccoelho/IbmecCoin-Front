import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Base from '../Base';

const HistoricoContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1em;
    background-color: #fff;
    font-family: 'Krub', sans-serif;
    color: #333;
`;

const Header = styled(motion.div)`
    background-color: var(--primaria);
    color: white;
    padding: 1em;
    border-radius: 10px;
    text-align: center;
    margin-bottom: 1em;
`;

const FilterContainer = styled.div`
    margin-bottom: 1em;
`;

const FilterSelect = styled.select`
    padding: 0.5em;
    border-radius: 10px;
    border: 1px solid #ddd;
    font-family: 'Krub', sans-serif;
    font-size: 1em;
    color: #333;
    width: 100%;
`;

const FilterInput = styled.input`
    padding: 0.5em;
    border-radius: 10px;
    border: 1px solid #ddd;
    font-family: 'Krub', sans-serif;
    font-size: 1em;
    color: #333;
    width: 95%;
`;

const Section = styled(motion.div)`
    background-color: #f7f7f7;
    padding: 1em;
    border-radius: 10px;
    margin-bottom: 1em;
`;

const Card = styled(motion.div)`
    background-color: white;
    padding: 1em;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 1em;
`;

const CardItem = styled.p`
    margin: 0.5em 0;
    font-size: 1em;
`;

const Message = styled.p`
    color: ${props => (props.type === 'error' ? 'red' : 'green')};
    margin: 0.5em 0;
`;

const AlunoHistorico = () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [transacoes, setTransacoes] = useState([]);
    const [error, setError] = useState(null);
    const [filtro, setFiltro] = useState('data'); // Novo estado para filtro
    const [search, setSearch] = useState(''); // Novo estado para busca

    useEffect(() => {
        const fetchTransacoes = async () => {
            try {
                const response = await fetch('http://localhost:5000/aluno/historico', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ matricula: user.matricula }),
                });

                const data = await response.json();
                if (response.ok) {
                    setTransacoes(data.transacoes.map(transacao => ({
                        ...transacao,
                        tipo: transacao.receptor_id === 'loja' ? 'Compra' : 'Transferência'
                    })));
                } else {
                    setError(data.message);
                }
            } catch (error) {
                console.error('Error fetching transacoes:', error);
                setError('An error occurred. Please try again.');
            }
        };

        if (user) {
            fetchTransacoes();
        }
    }, [user]);

    const handleFiltroChange = (event) => {
        setFiltro(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const getSortedTransacoes = () => {
        const searchLower = search.toLowerCase();
        return [...transacoes]
            .filter(transacao =>
                String(transacao.emissor_nome).toLowerCase().includes(searchLower) ||
                String(transacao.receptor_nome).toLowerCase().includes(searchLower) ||
                String(transacao.valor).toLowerCase().includes(searchLower) ||
                String(transacao.data).toLowerCase().includes(searchLower)
            )
            .sort((a, b) => {
                switch (filtro) {
                    case 'data':
                        return new Date(b.data) - new Date(a.data);
                    case 'receptor':
                        return String(a.receptor_nome || '').localeCompare(String(b.receptor_nome || ''));
                    case 'emissor':
                        return String(a.emissor_nome || '').localeCompare(String(b.emissor_nome || ''));
                    case 'valor':
                        return parseFloat(b.valor) - parseFloat(a.valor);
                    default:
                        return 0;
                }
            });
    };

    if (!user) {
        return (
            <Base>
                <Message type="error">User not found in localStorage.</Message>
            </Base>
        );
    }

    return (
        <Base>
            <HistoricoContainer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {error && <Message type="error">{error}</Message>}
                <Header
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h1>HISTÓRICO DO ALUNO</h1>
                </Header>
                <FilterContainer>
                    <FilterSelect value={filtro} onChange={handleFiltroChange}>
                        <option value="data">Data</option>
                        <option value="receptor">Destinatário</option>
                        <option value="emissor">Emissor</option>
                        <option value="valor">Valor</option>
                    </FilterSelect>
                </FilterContainer>
                <FilterContainer>
                    <FilterInput
                        type="text"
                        placeholder="Filtrar..."
                        value={search}
                        onChange={handleSearchChange}
                    />
                </FilterContainer>
                <Section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <h2>LISTA DE TRANSAÇÕES</h2>
                    {getSortedTransacoes().map((transacao, index) => (
                        <Card
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        >
                            <CardItem><strong>Data:</strong> {transacao.data}</CardItem>
                            <CardItem><strong>Valor:</strong> {transacao.valor}</CardItem>
                            <CardItem><strong>Emissor:</strong> {transacao.emissor_nome}</CardItem>
                            <CardItem><strong>Receptor:</strong> {transacao.receptor_nome}</CardItem>
                            <CardItem><strong>Tipo:</strong> {transacao.tipo}</CardItem> {/* Novo campo tipo */}
                        </Card>
                    ))}
                </Section>
            </HistoricoContainer>
        </Base>
    );
};

export default AlunoHistorico;
