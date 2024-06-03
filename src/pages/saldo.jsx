import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Base from './Base';
import Grupo from './grupo/informacao';

const SaldoContainer = styled.div`
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

const SectionTitle = styled.h2`
  margin: 0;
  padding-bottom: 0.5em;
  border-bottom: 1px solid #ccc;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  text-align: center;
  padding: 0.8em 1em;
  margin: 0.5em 0;
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

const Message = styled.p`
  color: ${props => props.type === 'error' ? 'red' : 'green'};
  margin: 0.5em 0;
`;

const Saldo = () => {
    const [userType, setUserType] = useState(null);
    const [aluno, setAluno] = useState(null);
    const [error, setError] = useState(null);
    const [isCheckingUser, setIsCheckingUser] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {
                setUserType(user.tipo);
                if (user.tipo === 'aluno') {
                    fetchAlunoData(user.matricula);
                }
                setIsCheckingUser(false);
            } else {
                setIsCheckingUser(true);
                navigate('/');
            }
        };

        const fetchAlunoData = async (matricula) => {
            try {
                const response = await fetch(`http://localhost:5000/aluno/informacao`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ matricula }),
                });

                const data = await response.json();
                if (response.ok) {
                    setAluno(data.aluno);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                console.error('Error fetching aluno data:', error);
                setError('An error occurred. Please try again.');
            }
        };

        checkUser();
    }, [navigate]);

    if (isCheckingUser) {
        return <div>Verificando usuário...</div>;
    }

    return (
        <Base>
            <SaldoContainer>
                <Header>
                    <h1>Saldo</h1>
                </Header>
                {error && <Message type="error">{error}</Message>}

                {userType === 'aluno' ? (
                    <>
                        <Section>
                            <SectionTitle>HISTÓRICO</SectionTitle>
                            <StyledLink to="/saldo/historico">Ver histórico</StyledLink>
                        </Section>

                        <Section>
                            <SectionTitle>GRUPO</SectionTitle>
                            {aluno && aluno.id_grupo ? (
                                <Grupo />
                            ) : (
                                <>
                                    <StyledLink to="/saldo/grupo/criar">Criar grupo</StyledLink>
                                    <StyledLink to="/saldo/grupo/convites">Ver convites</StyledLink>
                                </>
                            )}
                        </Section>
                    </>
                ) : (
                    <>
                        <Section>
                            <SectionTitle>PONTUAR</SectionTitle>
                            <StyledLink to="/saldo/beneficiar">Beneficiar aluno</StyledLink>
                        </Section>
                        <Section>
                            <SectionTitle>HISTÓRICO</SectionTitle>
                            <StyledLink to="/saldo/transacoes">Ver transações</StyledLink>
                        </Section>
                    </>
                )}
            </SaldoContainer>
        </Base>
    );
};

export default Saldo;