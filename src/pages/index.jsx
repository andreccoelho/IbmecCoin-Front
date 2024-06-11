import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Base from './Base';

const IndexStyle = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--primaria);
    font-family: 'Krub', sans-serif;
`;

const Title = styled(motion.h1)`
    font-size: 2.5em;
    margin-bottom: 1em;
`;

const Subtitle = styled(motion.p)`
    font-size: 1em;
    margin-bottom: 2em;
    text-align: center;
`;

const ButtonContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: 80%;
    max-width: 300px;
`;

const StyledLink = styled(Link)`
    padding: 0.8em 1em;
    text-align: center;
    border-radius: 5px;
    text-decoration: none;
    font-size: 1em;
    color: var(--background);
    transition: background 0.3s ease;

    &:nth-child(1) {
        background: var(--primaria);
    }

    &:nth-child(2) {
        background: var(--secundaria);
    }

    &:hover {
        filter: brightness(1.2);
    }
`;

const ImgContainer = styled(motion.div)`
    display: flex;
    justify-content: center;
    margin-bottom: 2em;
`;

const Img = styled.img`
    width: 100%;
    max-width: 300px;
`;

const Index = () => {
    const [userType, setUserType] = useState(null);
    const [isCheckingUser, setIsCheckingUser] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                setUserType(user.tipo);
                navigate('/perfil');
            } else {
                setIsCheckingUser(false);
            }
        };

        checkUser();
    }, [navigate]);

    if (isCheckingUser) {
        return <div>Verificando usuário...</div>;
    }

    return (
        <Base>
            <IndexStyle
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <ImgContainer
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Img src="imagens/ibmec.png" alt="decorative" />
                </ImgContainer>
                <Title
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    Ibmec Coin
                </Title>
                <Subtitle
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    Conectando esforço acadêmico a recompensas exclusivas.
                </Subtitle>
                <ButtonContainer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <StyledLink to="/auth/login">Login</StyledLink>
                    <StyledLink to="/auth/registro">Registrar</StyledLink>
                </ButtonContainer>
            </IndexStyle>
        </Base>
    );
};

export default Index;
