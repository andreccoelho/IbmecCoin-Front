import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Base from './Base';
import QrcodeLeitor from './qrcode/leitor';

const QrcodeContainer = styled(motion.div)`
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

const SectionTitle = styled.h2`
    margin: 0;
    padding-bottom: 0.5em;
    border-bottom: 1px solid #ccc;
`;

const StyledLink = styled(Link)`
    display: inline-block;
    text-align: center;
    padding: 0.8em 1em;
    margin: 0.5em;
    border-radius: 5px;
    background-color: var(--primaria);
    color: white;
    font-size: 1em;
    text-decoration: none;
    transition: background 0.3s ease;

    &:hover {
        background-color: #3700b3;
    }
`;

const Qrcode = () => {
    const [userType, setUserType] = useState(null);
    const [isCheckingUser, setIsCheckingUser] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {
                setUserType(user.tipo);
                setIsCheckingUser(false);
            } else {
                setIsCheckingUser(true);
                navigate('/');
            }
        };

        checkUser();
    }, [navigate]);

    if (isCheckingUser) {
        return <div>Verificando usuário...</div>;
    }

    return (
        <Base>
            <QrcodeContainer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Header
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h1>QR Code</h1>
                </Header>

                {userType === 'aluno' ? (
                    <QrcodeLeitor
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    />
                ) : (
                    <Section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <SectionTitle>QRCODE</SectionTitle>
                        <StyledLink to="/qrcode/criar">Gerar QR Code</StyledLink>
                        <StyledLink to="/qrcode/foto/last">Ver último QR Code gerado</StyledLink>
                    </Section>
                )}
            </QrcodeContainer>
        </Base>
    );
};

export default Qrcode;
