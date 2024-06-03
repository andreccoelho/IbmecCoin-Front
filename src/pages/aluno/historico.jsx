import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Base from '../Base';

const HistoricoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1em;
    background-color: #fff;
    font-family: 'Arial', sans-serif;
    color: #333;
`;

const Header = styled.div`
    background-color: var(--primaria);
    color: white;
    padding: 1em;
    border-radius: 10px;
    text-align: center;
    margin-bottom: 1em;
`;

const Section = styled.div`
    background-color: #f7f7f7;
    padding: 1em;
    border-radius: 10px;
    margin-bottom: 1em;
`;

const Card = styled.div`
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
                    setTransacoes(data.transacoes);
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

    if (!user) {
        return (
            <Base>
                <Message type="error">User not found in localStorage.</Message>
            </Base>
        );
    }

    return (
        <Base>
            <HistoricoContainer>
                {error && <Message type="error">{error}</Message>}
                <Header>
                    <h1>HISTÓRICO DO ALUNO</h1>
                </Header>

                <Section>
                    <h2>LISTA DE TRANSAÇÕES</h2>
                    {transacoes.map((transacao, index) => (
                        <Card key={index}>
                            <CardItem><strong>Data:</strong> {transacao.data}</CardItem>
                            <CardItem><strong>Valor:</strong> {transacao.valor}</CardItem>
                            <CardItem><strong>Emissor:</strong> {transacao.emissor_id}</CardItem>
                            <CardItem><strong>Receptor:</strong> {transacao.receptor_id}</CardItem>
                        </Card>
                    ))}
                </Section>
            </HistoricoContainer>
        </Base>
    );
};

export default AlunoHistorico;
