import { useNavigate } from 'react-router-dom';

const useLogout = () => {
    const navigate = useNavigate();

    const logoutUser = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return logoutUser;
};

export default useLogout;
