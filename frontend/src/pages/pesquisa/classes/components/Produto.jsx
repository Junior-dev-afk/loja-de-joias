import "./produto.css"


function Produto ({item}) {

    return (
        <div className="container_produto">
            <img src={item.imagens[0]} className="imagem_produto"/>
            <div className="container_infos_produto">
                <label >{item.nome}</label>
                <label >R${item.valor}</label>
            </div>
        </div>
    )

}


export default Produto