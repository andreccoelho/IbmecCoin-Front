import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Base from './Base';

const IndexStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--primaria);
    font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
    font-size: 2.5em;
    margin-bottom: 1em;
`;

const Subtitle = styled.p`
    font-size: 1em;
    margin-bottom: 2em;
    text-align: center;
`;

const ButtonContainer = styled.div`
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

const ImgContainer = styled.div`
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
            <IndexStyle>
                <ImgContainer>
                    <Img src="/imagens/ibmec.png" alt="decorative" />
                </ImgContainer>
                <Title>Ibmec Coin</Title>
                <Subtitle>Simplificando suas transações educacionais na faculdade.</Subtitle>
                <ButtonContainer>
                    <StyledLink to="/auth/login">Login</StyledLink>
                    <StyledLink to="/auth/registro">Registrar</StyledLink>
                </ButtonContainer>
            </IndexStyle>
        </Base>
    );
};

export default Index;
