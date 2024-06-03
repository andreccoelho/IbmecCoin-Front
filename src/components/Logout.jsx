import React from 'react';
import useLogout from "../util/auth";


const ProfessorLogin = () => {
    const logoutUser = useLogout();

    return (
        <div className="professor-login">
            <button onClick={logoutUser}>DESLOGAR</button>
        </div>
    );
};

export default ProfessorLogin;
