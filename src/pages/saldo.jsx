import Base from "./Base";
import React from "react";
import {Link} from "react-router-dom";

const Saldo = () => {
    return (
        <Base>
            <h1>Saldo</h1>

            <div className="professor-pontuar">
                <h2>PONTUAR</h2>
                <Link to="/professor/beneficiar">Beneficiar aluno</Link>
            </div>
            <div className="professor-historico">
                <h2>HISTÓRICO</h2>
                <Link to="/professor/transacoes">Ver transacoes</Link>
            </div>

            <div className="aluno-historico">
                <h2>HISTÓRICO</h2>
                <Link to="/aluno/historico">Ver histórico</Link>
            </div>

        </Base>
    )
}

export default Saldo;