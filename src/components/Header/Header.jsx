import { Link } from "react-router-dom";
import {NavBarContainer, Tab} from "./Style";
import { FaStore, FaInfoCircle, FaQrcode, FaUser } from 'react-icons/fa';
import React, {useState} from "react";

const Header = () => {
    let pagina_atual = window.location.href;
    const [activeTab, setActiveTab] = useState(pagina_atual);

    return (
        <NavBarContainer>
            <Tab isActive={activeTab === 'home'} onClick={() => setActiveTab('home')}>
                <Link to="/loja/loja"><FaStore /></Link>
            </Tab>
            <Tab isActive={activeTab === 'grid'} onClick={() => setActiveTab('grid')}>
                <Link to="/"><FaInfoCircle /></Link>
            </Tab>
            <Tab isActive={activeTab === 'send'} onClick={() => setActiveTab('send')}>
                <Link to="/qrcode/leitor"><FaQrcode /></Link>
            </Tab>
            <Tab isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')}>
                { localStorage.getItem('user')
                    ? <Link to="/aluno"><FaUser /></Link>
                    : <Link to="/auth/login"><FaUser /></Link>
                }
            </Tab>
        </NavBarContainer>
    )
}

export default Header;
