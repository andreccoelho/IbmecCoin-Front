import React, { useState } from 'react';
import styled from 'styled-components';
import Base from '../Base';
import { useNavigate } from "react-router-dom";

const CriarTurmaContainer = styled.div`
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

const Form = styled.form`
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

const Message = styled.p`
  color: ${props => (props.type === 'error' ? 'red' : 'green')};
  margin: 0.5em 0;
`;

const CriarTurma = () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [nome, setNome] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleCreateTurma = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/turma/criar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome: nome, matricula: user['matricula'] }),
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess('Turma criada com sucesso!');
                setNome('');
                navigate('/perfil');
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error creating turma:', error);
            setError('An error occurred. Please try again.');
        }
    };

    if (!user) {
        return (
            <Base>
                <Message type="error">User not found in localStorage.</Message>
            </Base>
        );
    }

    return (
        <Base>
            <CriarTurmaContainer>
                <Header>
                    <h1>CRIAR TURMA</h1>
                </Header>
                {error && <Message type="error">{error}</Message>}
                {success && <Message type="success">{success}</Message>}
                <Form onSubmit={handleCreateTurma}>
                    <label htmlFor="nome">Nome da Turma</label>
                    <Input
                        type="text"
                        name="nome"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                    <Button type="submit">Criar</Button>
                </Form>
            </CriarTurmaContainer>
        </Base>
    );
};

export default CriarTurma;
