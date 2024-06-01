import Base from "./exemplos/Base";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const Index = () => {
    const [userType, setUserType] = useState(null);
    const [isCheckingUser, setIsCheckingUser] = useState(true);


    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await fetch('http://localhost:5000/user', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (!response.ok) {
                        // Este é o ponto onde estamos lidando com o erro localmente
                        console.error('Erro ao verificar usuário', response.statusText);
                        setIsCheckingUser(false);
                        return;
                    }

                    const data = await response.json();
                    const user = data.user;
                    if (user) {
                        setUserType(user.tipo);
                    }
                } catch (error) {
                    console.error("Erro ao verificar o usuário", error);
                }
            }
            setIsCheckingUser(false);
        };

        (async () => {
            await checkUser();
        })();

    }, []);

    if (isCheckingUser) {
        return <div>Verificando usuário...</div>;
    }

    if (userType === 'aluno'){
        return <Link to={'/aluno'}>Acessar</Link>
    }

    if (userType === 'professor'){
        return <Link to={'/professor'}>Acessar</Link>
    }

    return (
        <Base>
            <h1>Bem vindo ao IbmecCoin!</h1>

            <div>
                <Link to={'/login'}>Login</Link>
                <Link to={'/registro'}>Registrar</Link>
            </div>
        </Base>
    )
}

export default Index;