import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Base from './Base';
import Professor from './professor';
import Aluno from './aluno';

const PerfilContainer = styled.div`
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
            <PerfilContainer>
                <Header>
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
