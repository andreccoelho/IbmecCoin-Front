import { Link } from "react-router-dom";
import {NavBarContainer, Tab} from "./Style";
import { FaStore, FaInfoCircle, FaQrcode, FaUser } from 'react-icons/fa';
import React, {useState} from "react";
import {get_page} from "../../util/generic";

const Header = () => {
    let pagina_atual = get_page(window.location.href);
    const [activeTab, setActiveTab] = useState(pagina_atual);

    return (
        <NavBarContainer>
            <Tab isActive={activeTab === 'loja'}>
                <Link to="/loja"><FaStore /></Link>
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
                    : <Link to="/"><FaUser /></Link>
                }
            </Tab>
        </NavBarContainer>
    )
}

export default Header;
