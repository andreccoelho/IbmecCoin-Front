import { Link } from "react-router-dom";
import {NavBarContainer, Tab} from "./Style";
import { FaStore, FaInfoCircle, FaQrcode, FaUser } from 'react-icons/fa';
import React, {useState} from "react";

const Header = () => {
    let pagina_atual = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    const [activeTab, setActiveTab] = useState(pagina_atual);

    return (
        <NavBarContainer>
            <Tab isActive={activeTab === 'loja'}>
                <Link to="/loja/loja"><FaStore /></Link>
            </Tab>
            <Tab isActive={activeTab === 'saldo'}>
                <Link to="/saldo"><FaInfoCircle /></Link>
            </Tab>
            <Tab isActive={activeTab === 'qrcode'}>
                <Link to="/qrcode"><FaQrcode /></Link>
            </Tab>
            <Tab isActive={activeTab === 'perfil'}>
                { localStorage.getItem('user')
                    ? <Link to="/perfil"><FaUser /></Link>
                    : <Link to="/auth/login"><FaUser /></Link>
                }
            </Tab>
        </NavBarContainer>
    )
}

export default Header;
