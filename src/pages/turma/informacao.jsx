import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Base from '../Base';

const TurmaContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1em;
    background-color: #fff;
      font-family: Krub, sans-serif;
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

const StyledLink = styled(Link)`
    display: inline-block;
    text-align: center;
    padding: 0.8em 1em;
    border-radius: 5px;
    background-color: var(--primaria);
    color: white;
    font-size: 1.2em;
    text-decoration: none;
    transition: background 0.3s ease;

    &:hover {
        background-color: #3700b3;
    }
`;

const AddAlunoForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1em;
    background-color: #f7f7f7;
    padding: 1em;
    border-radius: 10px;
    margin-bottom: 1em;
`;

const Input = styled.input`
    padding: 0.8em;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1em;
`;

const Button = styled.button`
  padding: 0.8em 1em;
  border-radius: 5px;
  background-color: var(--primaria);
  color: white;
  font-size: 1em;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #3700b3;
  }
`;

const Turma = () => {
    const { id_turma } = useParams();

    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [turma, setTurma] = useState(null);
    const [error, setError] = useState(null);
    const [matricula_aluno_novo, setMatriculaAlunoNovo] = useState('');

    useEffect(() => {
        const fetchTurmaData = async () => {
            try {
                const response = await fetch('http://localhost:5000/turma/informacao', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id_turma, matricula: user.matricula }),
                });

                const data = await response.json();
                if (response.ok) {
                    setTurma(data.turma);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                console.error('Error fetching turma data:', error);
                setError('An error occurred. Please try again.');
            }
        };

        if (user) {
            fetchTurmaData();
        }
    }, [user, id_turma]);

    const handleAddAluno = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/turma/adicionar_aluno', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_turma, matricula_aluno_novo }),
            });

            const data = await response.json();
            if (response.ok) {
                setTurma(data.turma);
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error adding aluno:', error);
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
            <TurmaContainer>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Header>
                    <h1>TURMA</h1>
                </Header>
                <InfoContainer>
                    <h2>INFORMAÇÕES</h2>
                    {turma ? (
                        <>
                            <InfoItem>Matéria: {turma.nome}</InfoItem>
                            <InfoItem>Qtd. Alunos: {turma.turma.length}</InfoItem>
                            <InfoItem>Professor: {turma.professor.nome}</InfoItem>
                        </>
                    ) : (
                        <InfoItem>Loading...</InfoItem>
                    )}
                </InfoContainer>
                <CardContainer>
                    <h2>ALUNOS</h2>
                    {turma && turma.turma.length > 0 ? (
                        turma.turma.map((aluno) => (
                            <Card key={aluno.matricula}>
                                <CardItem><strong>Matrícula:</strong> {aluno.matricula}</CardItem>
                                <CardItem><strong>Nome:</strong> {aluno.nome}</CardItem>
                                <CardItem><strong>Saldo:</strong> {aluno.saldo}</CardItem>
                            </Card>
                        ))
                    ) : (
                        <h3>Não há alunos</h3>
                    )}
                </CardContainer>
                {user.tipo === 'professor' && (
                    <AddAlunoForm onSubmit={handleAddAluno}>
                        <h2>ADICIONAR ALUNO</h2>
                        <label htmlFor="matricula_aluno_novo">Matrícula do aluno novo:</label>
                        <Input
                            type="text"
                            name="matricula_aluno_novo"
                            placeholder="Matricula do novo aluno"
                            value={matricula_aluno_novo}
                            onChange={(e) => setMatriculaAlunoNovo(e.target.value)}
                        />
                        <Button type="submit">Adicionar</Button>
                    </AddAlunoForm>
                )}
                <StyledLink to="/">Voltar</StyledLink>
            </TurmaContainer>
        </Base>
    );
};

export default Turma;
