import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Base from '../Base';
import { useNavigate } from "react-router-dom";

const QrcodeContainer = styled(motion.div)`
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

const Select = styled.select`
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

const QrcodeCriar = () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [valor, setValor] = useState('');
    const [qtdUsos, setQtdUsos] = useState('');
    const [validadeData, setValidadeData] = useState('');
    const [idTurma, setIdTurma] = useState(''); // Novo estado para o id da turma
    const [turmas, setTurmas] = useState([]); // Novo estado para armazenar as turmas
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTurmas = async () => {
            try {
                const response = await fetch('http://localhost:5000/turma/turmas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ matricula: user['matricula'] }),
                });
                const data = await response.json();
                if (response.ok) {
                    setTurmas(data.turmas);
                } else {
                    setError('Erro ao buscar turmas.');
                }
            } catch (error) {
                console.error('Error fetching turmas:', error);
                setError('An error occurred. Please try again.');
            }
        };

        if (user) {
            fetchTurmas();
        }
    }, [user]);

    const handleCreateQrcode = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/qrcode/criar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    valor,
                    qtd_usos: qtdUsos,
                    validade_data: validadeData,
                    id_turma: idTurma, // Adicionando id da turma no corpo da requisição
                    matricula: user['matricula'],
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess('QR Code criado com sucesso!');
                setValor('');
                setQtdUsos('');
                setValidadeData('');
                setIdTurma(''); // Resetar o campo id da turma
                navigate('/qrcode');
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error creating QR code:', error);
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
            <QrcodeContainer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Header
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h1>QRCODE CRIAR</h1>
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
                    onSubmit={handleCreateQrcode}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <label htmlFor="valor">Valor:</label>
                    <Input
                        type="number"
                        name="valor"
                        id="valor"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        required
                    />
                    <label htmlFor="qtd_usos">Quantidade de usos:</label>
                    <Input
                        type="number"
                        name="qtd_usos"
                        id="qtd_usos"
                        value={qtdUsos}
                        onChange={(e) => setQtdUsos(e.target.value)}
                        required
                    />
                    <label htmlFor="validade_data">Validade data:</label>
                    <Input
                        type="date"
                        name="validade_data"
                        id="validade_data"
                        value={validadeData}
                        onChange={(e) => setValidadeData(e.target.value)}
                        required
                    />
                    <label htmlFor="id_turma">Turma:</label> {/* Novo campo select */}
                    <Select
                        name="id_turma"
                        id="id_turma"
                        value={idTurma}
                        onChange={(e) => setIdTurma(e.target.value)}
                        required
                    >
                        <option value="">Selecione uma turma</option>
                        {turmas.map(turma => (
                            <option key={turma.id} value={turma.id}>
                                {turma.nome}
                            </option>
                        ))}
                    </Select>
                    <Button type="submit"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                    >
                        Criar
                    </Button>
                </Form>
            </QrcodeContainer>
        </Base>
    );
};

export default QrcodeCriar;
