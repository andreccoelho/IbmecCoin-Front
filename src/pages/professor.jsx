import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Base from './Base';
import { logoutUser } from '../util/auth';
import ProfessorLogin from '../components/Logout';

const ProfessorContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1em;
    background-color: #fff;
      font-family: Krub, sans-serif;
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

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const CardItem = styled.div`
    margin: 0.5em 0;
    font-size: 1em;
`;

const CardButton = styled(Link)`
  padding: 0.8em 1em;
  border-radius: 5px;
  background-color: var(--primaria);
  color: white;
  font-size: 1em;
  border: none;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 1em;

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
  font-size: 1.5em;
  text-decoration: none;
  transition: background 0.3s ease;
  margin-top: 1em;

  &:hover {
    background-color: #3700b3;
  }
`;

const Professor = () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [professor, setProfessor] = useState(null);
    const [turmas, setTurmas] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfessorData = async () => {
            try {
                const response = await fetch('http://localhost:5000/professor/informacao', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ matricula: user.matricula }),
                });

                const data = await response.json();
                if (response.ok) {
                    setProfessor(data.professor);
                    setTurmas(data.turmas);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                console.error('Error fetching professor data:', error);
                setError('An error occurred. Please try again.');
            }
        };

        if (user) {
            fetchProfessorData();
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
        <Base>
            <ProfessorContainer>
                <Header>
                    <Name>Professor: {professor ? professor.nome : 'Loading...'}</Name>
                </Header>
                <InfoContainer>
                    <h2>INFORMAÇÕES</h2>
                    {error && <InfoItem style={{ color: 'red' }}>{error}</InfoItem>}
                    <InfoItem>Matrícula: {professor ? professor.matricula : 'Loading...'}</InfoItem>
                    <InfoItem>Email: {professor ? professor.email : 'Loading...'}</InfoItem>
                </InfoContainer>
                <CardContainer>
                    <h2>TURMAS</h2>
                    {turmas.length > 0 ? (
                        turmas.map((turma) => (
                            <Card key={turma.id_turma}>
                                <CardItem><strong>Nome:</strong> {turma.nome}</CardItem>
                                <CardItem><strong>Quantidade alunos:</strong> {turma.turma.length}</CardItem>
                                <CardButton to={`/perfil/turma/${turma.id_turma}`}>Acessar</CardButton>
                            </Card>
                        ))
                    ) : (
                        <h3>Não há turmas disponíveis</h3>
                    )}
                    <StyledLink to="/perfil/turma/criar">Criar turma</StyledLink>
                </CardContainer>
                <StyledLink as="div">
                    <ProfessorLogin />
                </StyledLink>
            </ProfessorContainer>
        </Base>
    );
};

export default Professor;
