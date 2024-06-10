import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Base from '../Base';

const SwapContainer = styled(motion.div)`
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

const Section = styled(motion.div)`
    background-color: #f7f7f7;
    padding: 1em;
    border-radius: 10px;
    margin-bottom: 1em;
`;

const CardItem = styled.p`
    margin: 0.5em 0;
    font-size: 1em;
`;

const CardInput = styled.input`
    padding: 0.5em;
    border-radius: 10px;
    border: 1px solid #ddd;
    font-family: 'Krub', sans-serif;
    font-size: 1em;
    color: #333;
    width: 95%;
`;

const CardButton = styled.button`
    padding: 0.5em 1em;
    border-radius: 10px;
    border: none;
    background-color: var(--primaria);
    color: white;
    font-family: 'Krub', sans-serif;
    font-size: 1em;
    cursor: pointer;
    margin-top: 1em;
`;

const StyledSelect = styled.select`
    padding: 0.5em;
    border-radius: 10px;
    border: 1px solid #ddd;
    font-family: 'Krub', sans-serif;
    font-size: 1em;
    color: #333;
    width: 100%;
`;

const Swap = () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [aluno, setAluno] = useState(null);
    const [turmas, setTurmas] = useState([]);
    const [selectedTurma, setSelectedTurma] = useState('');
    const [saldoTurma, setSaldoTurma] = useState(0);
    const [swapAmount, setSwapAmount] = useState('');
    const [icAmount, setIcAmount] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlunoData = async () => {
            try {
                const response = await fetch('http://localhost:5000/aluno/informacao', {
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

        if (user) {
            fetchAlunoData();
        }
    }, [user]);

    const handleTurmaChange = (event) => {
        const selectedId = event.target.value;
        setSelectedTurma(selectedId);
        const turma = turmas.find(turma => turma.id_turma === selectedId);
        if (turma) {
            const alunoTurma = turma.alunos.find(aluno => aluno.aluno.matricula === user.matricula);
            if (alunoTurma) {
                setSaldoTurma(alunoTurma.saldo_turma);
            }
        }
    };

    const handleSwapInputChange = (event) => {
        const amount = event.target.value;
        setSwapAmount(amount);
        if (selectedTurma) {
            const turma = turmas.find(turma => turma.id_turma === selectedTurma);
            if (turma) {
                const alunoTurma = turma.alunos.find(aluno => aluno.aluno.matricula === user.matricula);
                if (alunoTurma) {
                    const icValue = (amount * alunoTurma.saldo_turma) / alunoTurma.saldo_turma; // Apenas exemplo de cálculo
                    setIcAmount(icValue);
                }
            }
        }
    };

    const handleSwapConfirm = () => {
        // Lógica para confirmar o swap
        alert(`Swap confirmado: ${swapAmount} de moeda da turma para ${icAmount} IC`);
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
            <SwapContainer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {error && <Message type="error">{error}</Message>}
                <Header
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h1>Swap de Moedas</h1>
                </Header>

                <Section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2>Moeda Global (IC)</h2>
                    <CardItem><strong>Saldo:</strong> {aluno ? aluno.saldo : 0} IC</CardItem>
                    <CardItem><strong>IC a ganhar:</strong></CardItem>
                    <CardInput type="text" value={icAmount} readOnly />
                </Section>

                <Section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <CardButton onClick={handleSwapConfirm}>Confirmar Swap</CardButton>
                </Section>

                <Section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <h2>Selecionar Turma</h2>
                    <StyledSelect value={selectedTurma} onChange={handleTurmaChange}>
                        <option value="">Selecione uma turma</option>
                        {turmas.map(turma => (
                            <option key={turma.id_turma} value={turma.id_turma}>{turma.nome}</option>
                        ))}
                    </StyledSelect>
                    {selectedTurma && (
                        <div>
                            <CardItem><strong>Saldo da Turma:</strong> {saldoTurma} IC</CardItem>
                            <CardInput
                                type="number"
                                value={swapAmount}
                                onChange={handleSwapInputChange}
                                placeholder="Quantidade para trocar"
                            />
                        </div>
                    )}
                </Section>
            </SwapContainer>
        </Base>
    );
};

export default Swap;
