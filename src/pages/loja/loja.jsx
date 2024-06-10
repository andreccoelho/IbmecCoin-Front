import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners';
import Base from '../Base';
import { Link, useNavigate } from 'react-router-dom';

const LojaContainer = styled(motion.div)`
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

export {Header};

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
    background-color: #f7f7f7;
    padding: 1em;
    border-radius: 10px;
    margin-bottom: 1em;
`;

export { CardContainer };

const Card = styled(motion.div)`
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

const CardButton = styled(motion.button)`
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

const LojaItens = () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const [userType, setUserType] = useState(null);
    const [aluno, setAluno] = useState(null);
    const [turmas, setTurmas] = useState([]);
    const [isCheckingUser, setIsCheckingUser] = useState(true);
    const [itens, setItens] = useState([]);
    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState({});
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
                    setTurmas(data.turmas);
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
    }, [itens]);

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

    const handleBuyItem = async (id_item, id_turma) => {
        setLoading(prev => ({ ...prev, [id_item]: true }));
        try {
            const response = await fetch(`http://localhost:5000/loja/comprar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_item, matricula: user.matricula, id_turma: id_turma }),
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
        } finally {
            setLoading(prev => ({ ...prev, [id_item]: false }));
        }
    };

    return (
        <Base>
            <LojaContainer
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
                    <h1>Loja</h1>
                </Header>

                <CardContainer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <h2>Global</h2>

                    {aluno && (
                            <p>Saldo: {aluno.saldo} IC</p>
                    )}

                    {itens.filter(item => item.id_turma === null).map((item) => (
                        <Card
                            key={item.id_item}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 + item.id_item * 0.1 }}
                        >
                            <CardItem>
                                <strong>Nome:</strong> <Link to={`/loja/item/${item.id_item}`}>{item.nome}</Link>
                            </CardItem>
                            <CardItem>
                                <strong>Preço:</strong> {item.valor}
                            </CardItem>
                            {userType === 'aluno' && (
                                <CardButton
                                    onClick={() => handleBuyItem(item.id_item, 0)}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                    disabled={loading[item.id_item]}
                                >
                                    {loading[item.id_item] ? <ClipLoader color="#fff" size={20} /> : 'Comprar'}
                                </CardButton>
                            )}
                        </Card>
                    ))}
                </CardContainer>

                {turmas.map((turma) => (
                    <CardContainer
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <h2>{
                            turma.nome
                        }
                        </h2>

                        <p>
                            Saldo: {
                                turma.alunos.find(aluno => aluno.aluno.matricula === user.matricula).saldo_turma
                            }
                        </p>

                        {turma.itens.length === 0 && (
                            <h3>Não há itens</h3>
                        )}

                        {turma.itens.filter(item => item.id_turma === turma.id_turma).map((item) => (
                            <Card
                                key={item.id_item}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.6 + item.id_item * 0.1 }}
                            >
                                <CardItem>
                                    <strong>Nome:</strong> <Link to={`/loja/item/${item.id_item}`}>{item.nome}</Link>
                                </CardItem>
                                <CardItem>
                                    <strong>Preço:</strong> {item.valor}
                                </CardItem>
                                {userType === 'aluno' && (
                                    <CardButton
                                        onClick={() => handleBuyItem(item.id_item, item.id_turma)}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.8 }}
                                        disabled={loading[item.id_item]}
                                    >
                                        {loading[item.id_item] ? <ClipLoader color="#fff" size={20} /> : 'Comprar'}
                                    </CardButton>
                                )}
                            </Card>
                        ))}
                    </CardContainer>
                ))}

                {userType === 'professor' && (
                    <Form
                        onSubmit={handleAddItem}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
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
                        <Button
                            type="submit"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            Adicionar
                        </Button>
                    </Form>
                )}
            </LojaContainer>
        </Base>
    );
};

export default LojaItens;
