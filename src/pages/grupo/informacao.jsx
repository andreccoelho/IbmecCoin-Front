import React from 'react';
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

const Grupo = ({ grupo }) => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const navigate = useNavigate();

    const handleLeaveGroup = async () => {
        try {
            const response = await fetch(`http://localhost:5000/grupo/sair`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ matricula: user.matricula, id_grupo: grupo.id_grupo })
            });

            const data = await response.json();
            if (response.ok) {
                navigate('/saldo');
            } else {
                navigate('/saldo');
                setError(data.message);
            }
        } catch (error) {
            console.error('Error leaving group:', error);
            setError('An error occurred. Please try again.');
        }
    };

    const handleTransfer = (matricula) => {
        navigate(`/saldo/grupo/transferir/${matricula}/${grupo.id_turma}`);
    }

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
                                        <a onClick={() => handleTransfer(member.matricula)}>Transferir</a>
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
            </GrupoContainer>
        </Base>
    );
};

export default Grupo;
