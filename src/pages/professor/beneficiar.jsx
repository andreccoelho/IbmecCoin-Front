import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Base from '../Base';
import { Link } from 'react-router-dom';

const BeneficiarContainer = styled.div`
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
  font-size: 1em;
  text-decoration: none;
  transition: background 0.3s ease;
  margin-top: 1em;

  &:hover {
    background-color: #3700b3;
  }
`;

const BeneficiarIbmecCoins = () => {
    const [usuario, setUsuario] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [alunos, setAlunos] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchAlunos = async () => {
            try {
                const response = await fetch('http://localhost:5000/aluno/alunos', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    setAlunos(data.alunos);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                console.error('Error fetching alunos:', error);
                setError('Um erro ocorreu no get de alunos.');
            }
        };

        fetchAlunos();
    }, []);

    const handleTransfer = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/professor/beneficiar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usuario, quantidade }),
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess('Transferência realizada com sucesso!');
                setUsuario('');
                setQuantidade('');
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error transferring IbmecCoins:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <Base>
            <BeneficiarContainer>
                {error && <Message type="error">{error}</Message>}
                {success && <Message type="success">{success}</Message>}
                <Header>
                    <h1>Beneficiar IbmecCoins</h1>
                </Header>
                <Form onSubmit={handleTransfer}>
                    <label htmlFor="usuario">Usuário:</label>
                    <Input
                        type="text"
                        id="usuario"
                        name="usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        required
                    />
                    <label htmlFor="quantidade">Quantidade:</label>
                    <Input
                        type="number"
                        id="quantidade"
                        name="quantidade"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        required
                    />
                    <Button type="submit">Transferir</Button>
                </Form>

                <Header>
                    <h1>Alunos</h1>
                </Header>
                <CardContainer>
                    {alunos.map((aluno) => (
                        <Card key={aluno.matricula}>
                            <CardItem><strong>Matrícula:</strong> {aluno.matricula}</CardItem>
                            <CardItem><strong>Nome:</strong> {aluno.nome}</CardItem>
                            <CardItem><strong>Email:</strong> {aluno.email}</CardItem>
                            <CardItem><strong>Saldo:</strong> {aluno.saldo}</CardItem>
                        </Card>
                    ))}
                </CardContainer>
            </BeneficiarContainer>
        </Base>
    );
};

export default BeneficiarIbmecCoins;
