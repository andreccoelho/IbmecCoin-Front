import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Base from '../Base';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: var(--primaria);
    font-family: Krub, sans-serif;
`;

const Title = styled.h2`
  font-size: 2em;
  margin-bottom: 1em;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 300px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 0.5em;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.8em;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  width: 100%;
`;

const Error = styled.div`
  color: red;
  margin-bottom: 1em;
`;

const Button = styled.button`
  padding: 0.8em 1em;
  border: none;
  border-radius: 5px;
  background-color: var(--primaria);
  color: var(--background);
  font-size: 1em;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    filter: brightness(1.2);
  }
`;

const AuthLogin = () => {
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ matricula, senha }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/perfil');
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <Base>
            <LoginContainer>
                <Title>Login</Title>
                <LoginForm
                    matricula={matricula}
                    senha={senha}
                    setMatricula={setMatricula}
                    setSenha={setSenha}
                    handleSubmit={handleSubmit}
                    error={error}
                />
            </LoginContainer>
        </Base>
    );
};

const LoginForm = ({ matricula, senha, setMatricula, setSenha, handleSubmit, error }) => {
    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label htmlFor="matricula">Matricula</Label>
                <Input
                    type="text"
                    id="matricula"
                    name="matricula"
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="senha">Senha</Label>
                <Input
                    type="password"
                    id="senha"
                    name="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
            </FormGroup>
            {error && <Error>{error}</Error>}
            <Button type="submit">Login</Button>
        </Form>
    );
};

export default AuthLogin;
