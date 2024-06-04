import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Base from '../Base';
import { Link, useNavigate } from 'react-router-dom';

const ConvitesContainer = styled(motion.div)`
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

const Section = styled(motion.div)`
  background-color: #f7f7f7;
  padding: 1em;
  border-radius: 10px;
  margin-bottom: 1em;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
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

const CardButton = styled(motion.button)`
  padding: 0.8em 1em;
  border-radius: 5px;
  background-color: var(--primaria);
  color: white;
  font-size: 1em;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 1em;

  &:hover {
    background-color: #3700b3;
  }
`;

const Message = styled(motion.p)`
  color: ${props => (props.type === 'error' ? 'red' : 'green')};
  margin: 0.5em 0;
`;

const Convites = () => {
    const [convites, setConvites] = useState([]);
    const [error, setError] = useState(null);

    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const navigate = useNavigate();

    useEffect(() => {
        const fetchConvites = async () => {
            if (!user) {
                setError('Usuário não encontrado no localStorage');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/grupo/convites', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ matricula: user.matricula }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setConvites(data.convites);
            } catch (error) {
                console.error('Error fetching convites:', error);
                setError('An error occurred. Please try again.');
            }
        };

        fetchConvites();
    }, [user]);

    const handleAcceptInvite = async (id_convite) => {
        try {
            const response = await fetch('http://localhost:5000/grupo/aceitar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_convite, matricula: user.matricula }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setConvites(convites.filter(convite => convite.id_convite !== id_convite));
            alert('Convite aceito com sucesso!');
            navigate('/saldo');
        } catch (error) {
            console.error('Error accepting invite:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <Base>
            <ConvitesContainer
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
                    <h1>Convites</h1>
                </Header>

                <Section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <h2>Lista de convites</h2>
                    {convites.length === 0 ? (
                        <Message>Não há convites pendentes</Message>
                    ) : (
                        <CardContainer>
                            {convites.map((convite) => (
                                <Card
                                    key={convite.id_convite}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.6 + (convite.id_convite * 0.1) }}
                                >
                                    <CardItem><strong>Id:</strong> {convite.id_convite}</CardItem>
                                    <CardItem><strong>Grupo:</strong> {convite.id_grupo}</CardItem>
                                    <CardItem><strong>Convidado:</strong> {convite.convidado_matricula}</CardItem>
                                    <CardButton
                                        onClick={() => handleAcceptInvite(convite.id_convite)}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.8 }}
                                    >
                                        Aceitar
                                    </CardButton>
                                </Card>
                            ))}
                        </CardContainer>
                    )}
                </Section>
            </ConvitesContainer>
        </Base>
    );
};

export default Convites;
