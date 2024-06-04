import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Base from '../Base';
import { Link, useNavigate } from 'react-router-dom';

const LojaContainer = styled.div`
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

    a {
        color: var(--primaria);
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
`;

const CardButton = styled.button`
    padding: 0.8em 1em;
    border-radius: 5px;
    background-color: var(--primaria);
    color: white;
    font-size: 1em;
    border: none;
    cursor: pointer;
    transition: background 0.3s ease;
    margin-top: 1em;

    &:hover {
        background-color: #3700b3;
    }
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

const LojaItens = () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const [userType, setUserType] = useState(null);
    const [aluno, setAluno] = useState(null);
    const [isCheckingUser, setIsCheckingUser] = useState(true);
    const [itens, setItens] = useState([]);
    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = () => {
            if (user) {
                setUserType(user.tipo);
                setIsCheckingUser(false);
            } else {
                setIsCheckingUser(true);
                navigate('/');
            }
        };

        const fetchAlunoData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/aluno/informacao`, {
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

        const fetchItens = async () => {
            try {
                const response = await fetch(`http://localhost:5000/loja/itens`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    setItens(data.itens);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                console.error('Error fetching itens:', error);
                setError('An error occurred. Please try again.');
            }
        };

        checkUser();

        if (user && user.tipo === 'aluno') {
            fetchAlunoData();
        }

        fetchItens();
    }, [user]);

    if (isCheckingUser) {
        return <div>Verificando usuário...</div>;
    }

    const handleAddItem = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/loja/criar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, valor }),
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess('Item adicionado com sucesso!');
                setNome('');
                setValor('');
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error adding item:', error);
            setError('An error occurred. Please try again.');
        }
    };

    const handleBuyItem = async (id_item) => {
        try {
            const response = await fetch(`http://localhost:5000/loja/comprar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_item, matricula: user.matricula }),
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess(data.message);
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error buying item:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <Base>
            <LojaContainer>
                {error && <Message type="error">{error}</Message>}
                {success && <Message type="success">{success}</Message>}
                <Header>
                    <h1>Loja</h1>
                </Header>

                {aluno && (
                    <>
                        <h2>SALDO</h2>
                        <p>Seu saldo é de IbmecCoins {aluno.saldo}</p>
                    </>
                )}

                <CardContainer>
                    <h2>ITENS</h2>
                    {itens.map((item) => (
                        <Card key={item.id_item}>
                            <CardItem>
                                <strong>Nome:</strong> <Link to={`/loja/item/${item.id_item}`}>{item.nome}</Link>
                            </CardItem>
                            <CardItem>
                                <strong>Preço:</strong> {item.valor}
                            </CardItem>
                            {userType === 'aluno' && (
                                <CardButton onClick={() => handleBuyItem(item.id_item)}>Comprar</CardButton>
                            )}
                        </Card>
                    ))}
                </CardContainer>

                {userType === 'professor' && (
                    <Form onSubmit={handleAddItem}>
                        <h2>ADICIONAR ITEM</h2>
                        <label htmlFor="nome">Nome:</label>
                        <Input
                            type="text"
                            id="nome"
                            name="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                        <label htmlFor="valor">Valor:</label>
                        <Input
                            type="number"
                            id="valor"
                            name="valor"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                            required
                        />
                        <Button type="submit">Adicionar</Button>
                    </Form>
                )}
            </LojaContainer>
        </Base>
    );
};

export default LojaItens;
