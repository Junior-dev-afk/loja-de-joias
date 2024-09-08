import { useParams } from "react-router-dom"
import "./produto.css"
import { useState } from "react"
import Topo from "../home/components/topo/Topo"
import { configs } from "../../../../configs.mjs"


const port_backend = configs.server.port.backend
const host_backend = configs.server.host.backend
const http_backend = configs.server.http.backend



function Produto () {

    let [ produto, setProduto ] = useState(false)
    let [ index, setIndex ] = useState(0)

    getAndSetProductFromID(produto ,setProduto)  

    return (
        <div className="container_pagina_item">
            <Topo/>

            {( produto !== false ) && (
                <div className="conteiner_fotos_pagina_item">
                    <div className="fotos_pagina_item">

                        {produto.imagens.map((imagem, i) => {
                            console.log(produto.imagens);
                            
                            return <div 
                            onClick={() => setIndex(i)}
                            className="foto_pagina_item">
                                <img src={imagem} className="fotos_indexes" />
                            </div>
                        })}

                    </div>
                    <div className="foto_principal_pagina_item">
                        <img src={produto.imagens[index]} alt="" className="conteudo_foto_principal" />
                    </div>
                </div>
            )}

            <Infos produto={produto}/>
            <ButtonCarrinho/>
            <ButtonComprar/>
        </div>
    )

}

function Infos ({produto}) {

    return (
        <div className="container_infos_produto_from_id">
            <label className="label_infos_produto_from_id" >{produto.nome}</label>
            <label className="label_infos_produto_from_id">{produto.descricao}</label>
            <label className="label_infos_produto_from_id">R$ {produto.valor}</label>
        </div>
    )

}

function ButtonCarrinho () {
    return(
        <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
            <button
                style={{
                    width:"150px",
                    height:"35px",
                    marginBlock:"20px",
                    border:"none",
                    borderRadius:"10px",
                    backgroundColor:"rgb(50, 50, 200)",
                    color:"white"
                }}
            >Carrinho</button>
        </div>
    )
}

function ButtonComprar () {
    return(
        <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
            <button
                style={{
                    width:"150px",
                    height:"35px",
                    marginBlock:"20px",
                    border:"none",
                    borderRadius:"10px",
                    backgroundColor:"rgb(50, 200, 50)",
                    color:"white"
                }}
            >Comprar</button>
        </div>
    )
}

async function getAndSetProductFromID (produto, setProduto) {

    const { id } = useParams()

    const respose = await fetch(`${http_backend}://${host_backend}:${port_backend}/getItemFromId/${id}`)
    
    const data = await respose.json()

    if ( data.error ) {
        return
    }

    if ( produto === false ) {

        setProduto(data)

    }    
    
}


export default Produto

