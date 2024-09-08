import { useState } from "react";
import "./fotos_sugestoes.css";
import DotsIndex from "../../../rootComponents/DotsIndex";
import { configs } from "../../../../../../configs.mjs"


const port_backend = configs.server.port.backend
const host_backend = configs.server.host.backend
const http_backend = configs.server.http.backend


const tempo_passagem_imagem = 4000
let lista_itens = []
let timeout = false
let mudarQuantidade = false


function FotosSugestoes () {

    let [ quantidade, setQuantidade ] = useState(0)
    let [ index, setIndex ] = useState(0)

    mudarQuantidade = setQuantidade

    clearTimeout(timeout)

    timeout = setTimeout(()=>{        
        if ( index === quantidade -1) {
            setIndex(0)
        } else {
            const newIndex = index + 1
            setIndex(newIndex)
        }
    }, tempo_passagem_imagem)


    const imagem_url = lista_itens.length > 0 ? lista_itens[index].imagens[0] : "#"  
    const id = ( lista_itens[index] ) ? ( lista_itens[index].id ) : "none"
    
    console.log(`${window.location.origin}/item/${id}`)

    return (

        <div className="container-sugestoes-fotos">

            <ButtonLeft setIndex={setIndex} index={index} quantidade={quantidade}/>

            <img onClick={
                () => {
                    window.location.href = `${window.location.origin}/item/${id}`
                }
            } className="imagem-sugestoes-fotos" src={
                imagem_url
            }/>

            <DotsIndex quantidade={quantidade} index={index}/>

            <ButtonRight setIndex={setIndex} index={index} quantidade={quantidade}/>
            
        </div>

    )

}

function ButtonLeft ({setIndex, index, quantidade}) {

    return <button className={
        ` button-sugestoes-fotos 
          button-sugestoes-fotos-esquerda`
    }
    onClick={() => index === 0 ? setIndex(quantidade-1) : setIndex(index -1)}
    >{"<"}</button>

}

function ButtonRight ({setIndex, index, quantidade}) {

    return <button className={
        ` button-sugestoes-fotos 
          button-sugestoes-fotos-direita`
    }
    onClick={() => index === quantidade-1 ? setIndex(0) : setIndex(index+1)}
    >{">"}</button>

}


async function getFotos () {

    const response = await fetch(`${http_backend}://${host_backend}:${port_backend}/getFotosSugestao`)

    const data = await response.json()

    lista_itens = data    

    mudarQuantidade(lista_itens.length)
    
}

getFotos()

export default FotosSugestoes

