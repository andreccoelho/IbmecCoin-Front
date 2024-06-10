import React, { useEffect, useState } from 'react';
import Base from '../Base';
import { useNavigate } from 'react-router-dom';
import { Card, CardButton, CardContainer, CardItem, ConvitesContainer, Header, Message, Section } from "./Style";

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

            console.log('Fetching convites for user:', user);

            try {
                const requestBody = JSON.stringify({ matricula: user.matricula });
                console.log('Request body:', requestBody);

                const response = await fetch('http://localhost:5000/grupo/convites', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: requestBody,
                });

                const data = await response.json();
                if (!response.ok) {
                    if (data.convites && data.convites.length === 0) {
                        setConvites([]);
                        setError(data.message);
                    } else {
                        throw new Error(data.message || `HTTP error! status: ${response.status}`);
                    }
                } else {
                    console.log('Convites fetched:', data);
                    setConvites(data.convites);
                    setError(null); // Clear any previous error
                }
            } catch (error) {
                console.error('Error fetching convites:', error);
                setError(error.message || 'An error occurred. Please try again.');
            }
        };

        fetchConvites();
    }, [user?.matricula]);

    const handleAcceptInvite = async (id_convite) => {
        try {
            const requestBody = JSON.stringify({ id_convite, matricula: user.matricula });
            console.log('Accept invite request body:', requestBody);

            const response = await fetch('http://localhost:5000/grupo/aceitar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: requestBody,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Invite accepted:', data);
            setConvites(convites.filter(convite => convite.id_convite !== id_convite));
            alert('Convite aceito com sucesso!');
            navigate('/saldo');
        } catch (error) {
            console.error('Error accepting invite:', error);
            setError(error.message || 'An error occurred. Please try again.');
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
                    {convites.length === 0 && !error ? (
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
