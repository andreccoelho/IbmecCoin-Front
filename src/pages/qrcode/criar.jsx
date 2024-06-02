import React, { useState } from 'react';
import Base from '../Base';

const QrcodeCriar = () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [valor, setValor] = useState('');
    const [qtdUsos, setQtdUsos] = useState('');
    const [validadeData, setValidadeData] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleCreateQrcode = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/qrcode/criar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ valor, qtd_usos: qtdUsos, validade_data: validadeData, matricula: user['matricula'] }),
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess('QR Code criado com sucesso!');
                setValor('');
                setQtdUsos('');
                setValidadeData('');
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
                <p>User not found in localStorage.</p>
            </Base>
        );
    }

    return (
        <Base>
            <h1>QRCODE CRIAR</h1>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
            <form onSubmit={handleCreateQrcode}>
                <label htmlFor="valor">Valor:</label>
                <input
                    type="number"
                    name="valor"
                    id="valor"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="qtd_usos">Quantidade de usos:</label>
                <input
                    type="number"
                    name="qtd_usos"
                    id="qtd_usos"
                    value={qtdUsos}
                    onChange={(e) => setQtdUsos(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="validade_data">Validade data:</label>
                <input
                    type="date"
                    name="validade_data"
                    id="validade_data"
                    value={validadeData}
                    onChange={(e) => setValidadeData(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Criar</button>
            </form>
        </Base>
    );
};

export default QrcodeCriar;
