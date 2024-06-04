import React, { useState } from 'react';
import styled from 'styled-components';
import Base from '../Base';
import {CardContainer} from "../loja/loja";

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
  color: ${props => props.type === 'error' ? 'red' : 'green'};
  margin: 0.5em 0;
`;

const QrcodeLeitor = () => {
    const [token, setToken] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleValidateQR = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/qrcode/leitor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_form: 'validate_qr',
                    token: token,
                    matricula: user.matricula
                })
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess(`QR Code validado com sucesso! Token: ${data.token}`);
                setToken('');
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error validating QR code:', error);
            setError('An error occurred. Please try again.');
        }
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            setError('Por favor, selecione um arquivo.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64File = reader.result.split(',')[1];
            console.log('base64:', base64File);

            try {
                const response = await fetch(`http://localhost:5000/qrcode/leitor`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id_form: 'upload_file',
                        matricula: user.matricula,
                        file: base64File
                    }),
                });

                const data = await response.json();
                if (response.ok) {
                    setSuccess(`Arquivo enviado com sucesso! Token: ${data.token}`);
                    setFile(null);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                setError('An error occurred. Please try again.');
            }
        };

        reader.readAsDataURL(file);
    };

    return (
        <CardContainer>
            {error && <Message type="error">{error}</Message>}
            {success && <Message type="success">{success}</Message>}
            <h1>Leitor de QRCode</h1>
            <p>Insira o código do QRCode ou scannear o QRCode</p>
            <Form onSubmit={handleValidateQR}>
                <Input
                    type="text"
                    name="token"
                    placeholder="Código do QRCode"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    required
                />
                <Button type="submit">Validar</Button>
            </Form>

            <Form onSubmit={handleFileUpload}>
                <Input type="file" onChange={handleFileChange} />
                <Button type="submit">Upload File</Button>
            </Form>
        </CardContainer>
    );
};

export default QrcodeLeitor;
