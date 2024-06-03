import React, { useState } from 'react';
import styled from 'styled-components';
import Base from '../Base';
import { useNavigate } from "react-router-dom";

const QrcodeContainer = styled.div`
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

const QrcodeCriar = () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [valor, setValor] = useState('');
    const [qtdUsos, setQtdUsos] = useState('');
    const [validadeData, setValidadeData] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();

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
                    matricula: user['matricula'],
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess('QR Code criado com sucesso!');
                setValor('');
                setQtdUsos('');
                setValidadeData('');
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
            <QrcodeContainer>
                <Header>
                    <h1>QRCODE CRIAR</h1>
                </Header>
                {error && <Message type="error">{error}</Message>}
                {success && <Message type="success">{success}</Message>}
                <Form onSubmit={handleCreateQrcode}>
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
                    <Button type="submit">Criar</Button>
                </Form>
            </QrcodeContainer>
        </Base>
    );
};

export default QrcodeCriar;
