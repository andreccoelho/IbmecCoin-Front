import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import Base from "../Base";

const GruposContainer = styled(motion.div)`
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

const GrupoCard = styled(motion.div)`
  background-color: #f7f7f7;
  padding: 1em;
  border-radius: 10px;
  margin-bottom: 1em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const GrupoTitle = styled.h2`
  margin: 0 0 0.5em;
  color: var(--primaria);
`;

const GrupoDescription = styled.p`
  margin: 0 0 0.5em;
  font-size: 1em;
`;

const GrupoCreator = styled.p`
  margin: 0 0 1em;
  font-size: 1em;
  font-weight: bold;
`;

const MemberList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MemberItem = styled.li`
  margin: 0.5em 0;
  background-color: white;
  padding: 0.5em;
  border-radius: 5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const MemberInfo = styled.p`
  margin: 0;
  font-size: 0.9em;
`;

const Message = styled(motion.p)`
  color: ${props => (props.type === 'error' ? 'red' : 'green')};
  margin: 0.5em 0;
`;

const Grupos = () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const [error, setError] = useState(null);
    const [userType, setUserType] = useState(null);
    const [isCheckingUser, setIsCheckingUser] = useState(true);

    const [grupos, setGrupos] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = () => {
            if (user) {
                setUserType(user.tipo);
                setIsCheckingUser(false);
            } else {
                setIsCheckingUser(true);
                navigate('/');
            }
        };

        const fetchGrupos = async () => {
            try {
                const response = await fetch('http://localhost:5000/grupo/grupos', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    setGrupos(data.grupos);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                console.error('Error fetching grupos:', error);
                setError('An error occurred. Please try again.');
            }
        }

        checkUser();

        if (user && user.tipo === 'professor') {
            fetchGrupos();
        }
    }, [navigate, user]);

    if (isCheckingUser) {
        return <div>Verificando usuário...</div>;
    }

    if (userType !== 'professor') {
        return <div>Você não tem permissão para acessar esta página.</div>;
    }

    return (
        <Base>
            <GruposContainer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Header
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h1>Grupos</h1>
                </Header>
                {error && (
                    <Message
                        type="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        {error}
                    </Message>
                )}
                <div>
                    {grupos.map((grupo) => (
                        <GrupoCard
                            key={grupo.id_grupo}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 + grupo.id_grupo * 0.1 }}
                        >
                            <GrupoTitle>{grupo.nome}</GrupoTitle>
                            <GrupoDescription>{grupo.descricao}</GrupoDescription>
                            <GrupoCreator>Criador ID: {grupo.criador_id}</GrupoCreator>
                            <h3>Membros:</h3>
                            <MemberList>
                                {grupo.membros.map((membro, index) => (
                                    <MemberItem key={index}>
                                        <MemberInfo><strong>Nome:</strong> {membro.nome}</MemberInfo>
                                        <MemberInfo><strong>Email:</strong> {membro.email}</MemberInfo>
                                        <MemberInfo><strong>Tipo:</strong> {membro.tipo}</MemberInfo>
                                    </MemberItem>
                                ))}
                            </MemberList>
                        </GrupoCard>
                    ))}
                </div>
            </GruposContainer>
        </Base>
    );
}

export default Grupos;
