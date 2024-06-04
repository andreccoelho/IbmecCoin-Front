import React from 'react';
import useLogout from "../util/auth";


const Logout = () => {
    const logoutUser = useLogout();

    return (
        <>
            <button onClick={logoutUser}>Deslogar</button>
        </>
    );
};

export default Logout;
