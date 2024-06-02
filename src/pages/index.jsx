import Base from "./Base";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Index = () => {
    const [userType, setUserType] = useState(null);
    const [isCheckingUser, setIsCheckingUser] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {
                setUserType(user.tipo);
                if (user.tipo === 'aluno') {
                    navigate('/aluno');
                } else if (user.tipo === 'professor') {
                    navigate('/professor');
                }
            } else {
                setIsCheckingUser(false);
            }
        };

        checkUser();
    }, [navigate]);

    if (isCheckingUser) {
        return <div>Verificando usuário...</div>;
    }

    return (
        <Base>
            <h1>Bem vindo ao IbmecCoin!</h1>

            <div>
                <Link to={'/auth/login'}>Login</Link>
                <Link to={'/auth/registro'}>Registrar</Link>
            </div>
        </Base>
    );
}

export default Index;
