import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Base from '../Base';

const RegisterContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--primaria);
  font-family: 'Krub', sans-serif;
  padding: 2em;
  background-color: #fff;
`;

const Title = styled(motion.h2)`
  font-size: 2em;
  margin-bottom: 1em;
`;

const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 400px;
`;

const FormGroup = styled(motion.div)`
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

const Select = styled.select`
  padding: 0.8em;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  width: 100%;
`;

const Error = styled(motion.div)`
  color: red;
  margin-bottom: 1em;
`;

const Success = styled(motion.div)`
  color: green;
  margin-bottom: 1em;
`;

const Button = styled(motion.button)`
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

const Registrar = () => {
    const [nome, setNome] = useState('');
    const [matricula, setMatricula] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [tipo, setTipo] = useState('aluno');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/auth/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, matricula, email, senha, tipo }),
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess('Registro realizado com sucesso!');
                setNome('');
                setMatricula('');
                setEmail('');
                setSenha('');
                setTipo('aluno');

                localStorage.setItem('user', JSON.stringify(data.user));
                if (data.user) {
                    navigate('/');
                }
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error registering user:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <Base>
            <RegisterContainer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Title
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Registrar
                </Title>
                {error && (
                    <Error
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        {error}
                    </Error>
                )}
                {success && (
                    <Success
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        {success}
                    </Success>
                )}
                <Form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    onSubmit={handleRegister}
                >
                    <FormGroup>
                        <Label htmlFor="nome">Nome</Label>
                        <Input
                            type="text"
                            id="nome"
                            name="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="matricula">Matrícula</Label>
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
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <FormGroup>
                        <Label htmlFor="tipo">Tipo</Label>
                        <Select
                            id="tipo"
                            name="tipo"
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                        >
                            <option value="aluno">Aluno</option>
                            <option value="professor">Professor</option>
                        </Select>
                    </FormGroup>
                    <Button
                        type="submit"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        Registrar
                    </Button>
                </Form>
            </RegisterContainer>
        </Base>
    );
};

export default Registrar;
