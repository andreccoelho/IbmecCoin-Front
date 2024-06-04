import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Base from '../Base';

const ConvidarContainer = styled(motion.div)`
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

const Form = styled(motion.form)`
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

const Convidar = () => {
    const [matricula, setMatricula] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const handleInvite = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/grupo/convidar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ matricula: user.matricula, destinatario: matricula }),
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess('Convite enviado com sucesso!');
                setMatricula('');
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error inviting member:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <Base>
            <ConvidarContainer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Header
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h1>CONVIDAR</h1>
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
                {success && (
                    <Message
                        type="success"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        {success}
                    </Message>
                )}
                <Form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    onSubmit={handleInvite}
                >
                    <label htmlFor="matricula">Matrícula:</label>
                    <Input
                        type="text"
                        name="matricula"
                        id="matricula"
                        value={matricula}
                        onChange={(e) => setMatricula(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        Convidar
                    </Button>
                </Form>
            </ConvidarContainer>
        </Base>
    );
};

export default Convidar;
