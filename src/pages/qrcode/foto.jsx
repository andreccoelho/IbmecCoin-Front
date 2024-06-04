import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Base from '../Base';
import { useParams } from 'react-router-dom';

const QrcodeFotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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
  width: 100%;
`;

const ImageContainer = styled.div`
  margin-top: 1em;
  text-align: center;
  img {
    max-width: 100%;
    height: auto;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
`;

const TokenContainer = styled.div`
  margin-top: 1em;
  font-size: 1.2em;
  font-weight: bold;
`;

const Message = styled.p`
  color: ${props => (props.type === 'error' ? 'red' : 'green')};
  margin: 0.5em 0;
`;

const QrcodeFoto = () => {
    const { token } = useParams();

    const [img, setImg] = useState('');
    const [qrcode_token, setQrcode_token] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQrcodeFoto = async () => {
            try {
                const response = await fetch('http://localhost:5000/qrcode/foto', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                });

                const data = await response.json();
                if (response.ok) {
                    setImg(data.img);
                    setQrcode_token(data.token);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                console.error('Error fetching QR code foto:', error);
                setError('An error occurred. Please try again.');
            }
        };

        fetchQrcodeFoto();
    }, [token]);

    return (
        <Base>
            <QrcodeFotoContainer>
                {error && <Message type="error">{error}</Message>}
                <Header>
                    <h1>QR Code Foto</h1>
                </Header>
                {img && (
                    <ImageContainer>
                        <div>FOTO:</div>
                        <img src={img} alt="QR Code" />
                    </ImageContainer>
                )}
                {qrcode_token && <TokenContainer>TOKEN: {qrcode_token}</TokenContainer>}
            </QrcodeFotoContainer>
        </Base>
    );
};

export default QrcodeFoto;
