import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Base from './Base';
import Professor from './professor';
import Aluno from './aluno';

const PerfilContainer = styled(motion.div)`
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

const Perfil = () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    if (!user) {
        return null; // Adicione um retorno condicional para evitar o render do componente antes do redirecionamento
    }

    return (
        <Base>
            <PerfilContainer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Header
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h1>Perfil</h1>
                </Header>

                {user.tipo === 'professor' ? (
                    <Professor />
                ) : (
                    <Aluno />
                )}
            </PerfilContainer>
        </Base>
    );
}

export default Perfil;
