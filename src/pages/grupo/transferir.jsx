import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Base from '../Base';
import { useParams, Link } from 'react-router-dom';
import {CardContainer, Header} from "../loja/loja";

const TransferContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2em;
  background-color: #fff;
  font-family: 'Krub', sans-serif;
  color: #333;
`;

const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 80%;
  max-width: 400px;
  background-color: #f7f7f7;
  padding: 1em;
  border-radius: 10px;
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

  &:hover {
    background-color: #3700b3;
  }
`;

const Message = styled(motion.p)`
  color: ${props => (props.type === 'error' ? 'red' : 'green')};
  margin: 0.5em 0;
`;

const BackLink = styled(Link)`
  margin-top: 1em;
  color: var(--primaria);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const GrupoTransferir = () => {
    const { destinatario_matricula } = useParams();
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [destinatario, setDestinatario] = useState(destinatario_matricula || '');
    const [aluno, setAluno] = useState(null);
    const [quantidade, setQuantidade] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (destinatario_matricula) {
            setDestinatario(destinatario_matricula);
        }

        const fetchAlunoData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/aluno/informacao`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
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

    }, [destinatario_matricula, user]);

    const handleTransfer = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/grupo/transferir`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ matricula: user.matricula, usuario: destinatario, quantidade })
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess('Transferência realizada com sucesso!');
                setDestinatario('');
                setQuantidade('');
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error transferring IbmecCoins:', error);
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
            <TransferContainer
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
                {success && (
                    <Message
                        type="success"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {success}
                    </Message>
                )}
                <Header
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    >
                    <h1>Transferir IbmecCoins</h1>
                </Header>
                <CardContainer
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.5, delay: 0.4}}
                >
                    <p>Saldo atual: {aluno ? aluno.saldo : 'Carregando...'}</p>
                    <Form
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.5, delay: 0.4}}
                        onSubmit={handleTransfer}
                    >
                        <Label htmlFor="usuario">Usuário:</Label>
                        <Input
                            type="text"
                            id="usuario"
                            name="usuario"
                            value={destinatario}
                            onChange={(e) => setDestinatario(e.target.value)}
                            required
                        />
                        <Label htmlFor="quantidade">Quantidade:</Label>
                        <Input
                            type="number"
                            id="quantidade"
                            name="quantidade"
                            value={quantidade}
                            onChange={(e) => setQuantidade(e.target.value)}
                            required
                        />
                        <Button
                            type="submit"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 0.5, delay: 0.6}}
                        >
                            Transferir
                        </Button>
                    </Form>
                </CardContainer>
            </TransferContainer>
        </Base>
    );
};

export default GrupoTransferir;
