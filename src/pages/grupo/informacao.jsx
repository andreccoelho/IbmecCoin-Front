import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Base from '../Base';
import { Link, useNavigate } from 'react-router-dom';

const GrupoContainer = styled(motion.div)`
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

const InfoContainer = styled(motion.div)`
  background-color: #f7f7f7;
  padding: 1em;
  border-radius: 10px;
  margin-bottom: 1em;
`;

const InfoItem = styled.p`
  margin: 0.5em 0;
  font-size: 1em;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin: 0.5em 0;
  font-size: 1em;

  a {
    margin-left: 1em;
    color: var(--primaria);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Button = styled(motion.button)`
  padding: 0.8em 1em;
  border-radius: 5px;
  background-color: var(--primaria);
  color: white;
  font-size: 1em;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-bottom: 1em;

  &:hover {
    background-color: #3700b3;
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  text-align: center;
  padding: 0.8em 1em;
  border-radius: 5px;
  background-color: var(--primaria);
  color: white;
  font-size: 1em;
  text-decoration: none;
  transition: background 0.3s ease;

  &:hover {
    background-color: #3700b3;
  }
`;

const Message = styled(motion.p)`
  color: ${props => (props.type === 'error' ? 'red' : 'green')};
  margin: 0.5em 0;
`;

const Grupo = () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [grupo, setGrupo] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchGrupo = async () => {
            try {
                const response = await fetch(`http://localhost:5000/grupo/informacao`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ matricula: user.matricula })
                });

                const data = await response.json();
                if (response.ok) {
                    setGrupo(data.grupo);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                console.error('Error fetching grupo:', error);
                setError('An error occurred. Please try again.');
            }
        };

        if (user) {
            fetchGrupo();
        }
    }, [user]);

    const handleLeaveGroup = async () => {
        try {
            const response = await fetch(`http://localhost:5000/grupo/sair`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ matricula: user.matricula })
            });

            const data = await response.json();
            if (response.ok) {
                navigate('/saldo');
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error leaving group:', error);
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
            <GrupoContainer
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
                {grupo ? (
                    <>
                        <Header
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h2>INFORMAÇÃO</h2>
                        </Header>
                        <InfoContainer
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <InfoItem>Nome: {grupo.nome}</InfoItem>
                            <InfoItem>Descrição: {grupo.descricao}</InfoItem>
                        </InfoContainer>

                        <Header
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <h2>MEMBROS</h2>
                        </Header>
                        <InfoContainer
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            {grupo.membros.length > 0 ? (
                                <List>
                                    {grupo.membros.map(member => (
                                        <ListItem key={member.matricula}>
                                            {member.nome}
                                            {user.nome !== member.nome && (
                                                <Link to={`/saldo/grupo/transferir/${member.matricula}`}>Transferir</Link>
                                            )}
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <InfoItem>Nenhum</InfoItem>
                            )}
                            <StyledLink to="/saldo/grupo/convidar">Convidar</StyledLink>
                        </InfoContainer>
                        <Button
                            onClick={handleLeaveGroup}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                        >
                            Sair do grupo
                        </Button>
                    </>
                ) : (
                    <InfoItem>Loading...</InfoItem>
                )}
            </GrupoContainer>
        </Base>
    );
};

export default Grupo;
