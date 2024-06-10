import React from 'react';
import userLogout from "../util/auth";


const Logout = () => {
    const logoutUser = userLogout();

    return (
        <>
            <button onClick={logoutUser}>Deslogar</button>
        </>
    );
};

export default Logout;
