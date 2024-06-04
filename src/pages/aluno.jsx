import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Base from './Base';
import Logout from '../components/Logout';
import {CardContainer} from "./loja/loja";

const AlunoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1em;
    background-color: #fff;
    font-family: 'Arial', sans-serif;
    color: #333;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--primaria);
    color: white;
    padding: 1em;
    border-radius: 10px;
`;

const Name = styled.h2`
    font-size: 1.2em;
    margin: 0;
`;

const BalanceContainer = styled.div`
    margin: 1em 0;
    text-align: center;
`;

const Balance = styled.h1`
    font-size: 3em;
    color: var(--primaria);
    margin: 0;
`;

const InfoContainer = styled.div`
    background-color: #f7f7f7;
    padding: 1em;
    border-radius: 10px;
    margin-bottom: 1em;
`;

const InfoItem = styled.p`
    margin: 0.5em 0;
    font-size: 1em;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1em;
`;

const StyledLink = styled(Link)`
    display: inline-block;
    text-align: center;
    padding: 0.8em 1em;
    width: 100%;
    border-radius: 5px;
    background-color: var(--primaria);
    color: white;
    font-size: 1.5em;
    text-decoration: none;
    transition: background 0.3s ease;

    &:hover {
        background-color: #3700b3;
    }
`;

const LogoutButton = styled.button`
    display: inline-block;
    text-align: center;
    padding: 0.8em 1em;
    width: 100%;
    border-radius: 5px;
    background-color: #e0e0e0;
    color: #333;
    font-size: 1em;
    border: none;
    cursor: pointer;
    transition: background 0.3s ease;
    
    button{
        background-color: #e0e0e0;
        font-size: 1.5em;
        color: #333;
        border: none;
        cursor: pointer;
        transition: background 0.3s ease;
    }

    &:hover {
        background-color: #bdbdbd;
    }
`;

const Aluno = () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [aluno, setAluno] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlunoData = async () => {
            try {
                const response = await fetch('http://localhost:5000/aluno/informacao', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ matricula: user.matricula }),
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

        if (user) {
            fetchAlunoData();
        }
    }, [user]);

    if (!user) {
        return (
            <Base>
                <p>User not found in localStorage.</p>
            </Base>
        );
    }

    return (
        <CardContainer>
            <Header>
                <Name>Aluno: {aluno ? aluno.nome : 'Loading...'}</Name>
            </Header>
            <AlunoContainer>
                <BalanceContainer>
                    <Balance>{aluno ? `${aluno.saldo} IC` : 'Loading...'}</Balance>
                </BalanceContainer>
                <InfoContainer>
                    <h2>INFORMAÇÕES</h2>
                    {error && <InfoItem style={{ color: 'red' }}>{error}</InfoItem>}
                    <InfoItem>Matrícula: {aluno ? aluno.matricula : 'Loading...'}</InfoItem>
                    <InfoItem>Turma: {aluno ? aluno.id_turma : 'Loading...'}</InfoItem>
                    <InfoItem>Tipo: {aluno ? aluno.tipo : 'Loading...'}</InfoItem>
                    <InfoItem>Grupo: {aluno ? aluno.id_grupo : 'Loading...'}</InfoItem>
                </InfoContainer>
            </AlunoContainer>
            <ButtonContainer>
                {aluno && !aluno.id_turma ? (
                    <StyledLink to="/perfil/turma/entrar">Entrar em turma</StyledLink>
                ) : (
                    <StyledLink to={`/perfil/turma/${aluno ? aluno.id_turma : ''}`}>Ver turma</StyledLink>
                )}
                <LogoutButton>
                    <Logout />
                </LogoutButton>
            </ButtonContainer>
        </CardContainer>
    );
};

export default Aluno;
