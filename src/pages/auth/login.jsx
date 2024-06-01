import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthLogin = () => {
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/auth/loginTeste', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ matricula, senha }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data.user));
                if (data.user.tipo === 'aluno') {
                    navigate('/aluno');
                } else if (data.user.tipo === 'professor') {
                    navigate('/professor');
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
        <div>
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
        </div>
    );
};

export default AuthLogin;
