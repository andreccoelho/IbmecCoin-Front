import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Base from "../Base";

const AuthLogin = () => {
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ matricula: matricula, senha: senha }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data.user));
                if (data.user) {
                    navigate('/perfil');
                }
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <Base>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Matricula: </label>
                    <input type="text" name="username" value={matricula} onChange={(e) => setMatricula(e.target.value)} />
                </div>
                <div>
                    <label>Senha: </label>
                    <input type="password" name="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </Base>
    );
};

export default AuthLogin;
