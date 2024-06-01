import { Link } from "react-router-dom";
import { Top } from "./Style";

const Header = () => (
  <Top>
    <Link to="/loja/loja">Loja</Link>
    <Link to="/">Menu</Link>
    <Link to="/qrcode/leitor">Qrcode</Link>
    
    { window.sessionStorage.getItem('accessToken')
    ? <Link to="/aluno">Conta</Link>
    : <Link to="/auth/login">Login</Link>
    }
    
  </Top>
)

export default Header;