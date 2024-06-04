import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Base from '../Base';

const TransacoesContainer = styled(motion.div)`
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

const Message = styled(motion.p)`
  color: ${props => (props.type === 'error' ? 'red' : 'green')};
  margin: 0.5em 0;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardItem = styled.div`
  margin: 0.5em 0;
  font-size: 1em;
`;

const ProfessorTransacoes = () => {
    const [transacoes, setTransacoes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransacoes = async () => {
            try {
                const response = await fetch('http://localhost:5000/professor/transacoes', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
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

        fetchTransacoes();
    }, []);

    return (
        <Base>
            <TransacoesContainer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {error && (
                    <Message
                        type="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {error}
                    </Message>
                )}
                <Header
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h1>Transações</h1>
                </Header>
                <CardContainer>
                    {transacoes.map((transacao, index) => (
                        <Card
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        >
                            <CardItem><strong>Emissor:</strong> {transacao.emissor_id}</CardItem>
                            <CardItem><strong>Receptor:</strong> {transacao.receptor_id}</CardItem>
                            <CardItem><strong>Valor:</strong> {transacao.valor}</CardItem>
                            <CardItem><strong>Data:</strong> {transacao.data}</CardItem>
                        </Card>
                    ))}
                </CardContainer>
            </TransacoesContainer>
        </Base>
    );
};

export default ProfessorTransacoes;
