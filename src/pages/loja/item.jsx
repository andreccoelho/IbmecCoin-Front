import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners';
import Base from '../Base';
import { useParams } from 'react-router-dom';

const ItemContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
  background-color: #fff;
  font-family: 'Krub', sans-serif;
  color: #333;
`;

const Title = styled(motion.h1)`
  font-size: 2em;
  margin-bottom: 1em;
`;

const Price = styled.p`
  font-size: 1.2em;
  margin-bottom: 1em;
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

const ItemDetalhe = () => {
    const { id_item } = useParams();
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [item, setItem] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

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
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <Base>
            <ItemContainer
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
                {item ? (
                    <>
                        <Title
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            ITEM: {item.nome}
                        </Title>
                        <Price>Preço: {item.valor}</Price>
                        <Button
                            onClick={handleBuyItem}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            disabled={loading}
                        >
                            {loading ? <ClipLoader color="#fff" size={20} /> : 'Comprar'}
                        </Button>
                    </>
                ) : (
                    <Message
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Carregando...
                    </Message>
                )}
            </ItemContainer>
        </Base>
    );
};

export default ItemDetalhe;
