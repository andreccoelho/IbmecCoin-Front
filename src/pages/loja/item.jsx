import React, { useEffect, useState } from 'react';
import Base from '../Base';
import { useParams } from 'react-router-dom';

const ItemDetalhe = () => {
    const { id_item } = useParams();
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [item, setItem] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`http://localhost:5000/loja/item/${id_item}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();
                if (response.ok) {
                    setItem(data.item);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                console.error('Error fetching item:', error);
                setError('An error occurred. Please try again.');
            }
        };

        fetchItem();
    }, [id_item]);

    const handleBuyItem = async () => {
        try {
            const response = await fetch(`http://localhost:5000/loja/comprar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_item, matricula: user.matricula })
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
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
            {item ? (
                <>
                    <h1>ITEM: {item.nome}</h1>
                    <p>Preço: {item.valor}</p>
                    <button onClick={handleBuyItem}>Comprar</button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </Base>
    );
};

export default ItemDetalhe;
