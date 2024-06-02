import Base from "../Base";

const LojaItem = ({ item }) => {
    return (
        <Base>
        <h1>{item.nome}</h1>
        <p>{item.descricao}</p>
        <p>{item.preco}</p>
        </Base>
    );
}

export default LojaItem;