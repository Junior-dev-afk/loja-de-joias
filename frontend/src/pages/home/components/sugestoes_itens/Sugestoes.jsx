import { useState } from "react"
import "./sugestoes.css"
import { configs } from "../../../../../../configs.mjs"


const port_backend = configs.server.port.backend
const host_backend = configs.server.host.backend
const http_backend = configs.server.http.backend


let mudarQuantidadeItens = false
let setarItens = false


function Sugestoes () {

    let [ quantidadeItens, setQuantidadeItens ] = useState(0)
    let [ itens, setItens ] = useState([])
    let [ index, setIndex] = useState(0)

    mudarQuantidadeItens = setQuantidadeItens
    setarItens = setItens


    return (
        <div className="container_itens_destaque_home">

            {
                ( index > 0  ) ? (
                    <div onClick={
                        () => setIndex(index -1)
                    } className="seta_mudar_item">
                        <label>{"<"}</label>
                    </div>
                ) : (
                    <div className="seta_mudar_item">

                    </div>
                )
            }
            

            {
                itens.map((item, i) => {
                    if ( i >= index && i < index+quantidadeItens ) {
                        return (                
                            <div id={item.id} className="iten_destaque_home">
                                <img src={item.imagens[0]} className="imagem_item_destaque_home" />
                            </div>
                        )
                    }
                    
                })
            }

            {
                ( index + quantidadeItens < itens.length ) ? ( 

                    <div onClick={
                        () => setIndex(index +1)
                    } className="seta_mudar_item">
                        <label>{">"}</label>
                    </div>

                ) : (
                    <div className="seta_mudar_item">
                        
                    </div> 
                )
            }
            
        </div>
    )
}


async function getAndSetItens () {

    const response = await fetch(`${http_backend}://${host_backend}:${port_backend}/getItensHome`)

    const data = await response.json()

    setarItens(data)

}

function setQuantidadePeloWidth () {

    const width = window.innerWidth

    const quantidade = Math.floor((width - 200 ) / 110  ) + 1    

    mudarQuantidadeItens(quantidade)

}

let interval_mudar_quantidade = setInterval(()=>{

    if ( mudarQuantidadeItens !== false ) {

        clearInterval(interval_mudar_quantidade)

        setQuantidadePeloWidth()

        getAndSetItens()

    }

}, 500)


window.onresize = () => {
    setQuantidadePeloWidth()
}


export default Sugestoes