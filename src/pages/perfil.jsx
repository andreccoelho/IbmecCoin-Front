import Base from "./Base";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Professor from "./professor";
import Aluno from "./aluno";

const Perfil = () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    return (
        <Base>
            {user.tipo === 'professor' ? (
                <Professor/>
            ) : (
                <Aluno/>
            )}
        </Base>
    );
}

export default Perfil;