import { useNavigate } from 'react-router-dom';

// useLogout: função que remove o usuário do localStorage e redireciona para a página inicial
const userLogout = () => {
    const navigate = useNavigate();

    const logoutUser = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return logoutUser;
};

export default userLogout;
