const LojaItem = ({ item }) => {
    return (
        <div>
        <h1>{item.nome}</h1>
        <p>{item.descricao}</p>
        <p>{item.preco}</p>
        </div>
    );
}

export default LojaItem;