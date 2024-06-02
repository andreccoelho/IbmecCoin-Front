import React, { useEffect, useState } from 'react';
import Base from '../Base';
import {useParams} from "react-router-dom";

const QrcodeFoto = () => {
    const { token } = useParams();

    const [img, setImg] = useState('');
    const [qrcode_token, setQrcode_token] = useState(qrcode_token);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQrcodeFoto = async () => {
            try {
                const response = await fetch(`http://localhost:5000/qrcode/foto`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token: token})
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
    }, []);

    return (
        <Base>
            {error && <p>{error}</p>}
            <div className="qrcode-foto">
                <h1>QRCODE FOTO</h1>
                {img && <div>FOTO: <img src={img} alt="QR Code" /></div>}
                {qrcode_token && <div>TOKEN: {qrcode_token}</div>}
            </div>
        </Base>
    );
};

export default QrcodeFoto;
