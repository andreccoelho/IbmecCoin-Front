import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Base from './Base';
import QrcodeLeitor from './qrcode/leitor';

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

const Section = styled.div`
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
  margin: 0.5em 0;
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
            <QrcodeContainer>
                <Header>
                    <h1>QR Code</h1>
                </Header>

                {userType === 'aluno' ? (
                    <Section>
                        <QrcodeLeitor />
                    </Section>
                ) : (
                    <Section>
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
