import Base from "../Base";
import React from "react";
import {Link} from "react-router-dom";

const Qrcode = () => {
    return (
        <Base>
            <h1>QR Code</h1>

            <div className="professor-qrcode">
                <h2>QRCODE</h2>
                <Link to="/qrcode/criar">Gerar qr code</Link>
                <Link to="/qrcode/foto/last">Ver último qr code gerado</Link>
            </div>

            <div className="aluno-qrcode">
                <h2>QRCODE</h2>
                <Link to="/qrcode/leitor">Leitor de qrcode</Link>
            </div>
        </Base>
    )
}

export default Qrcode;