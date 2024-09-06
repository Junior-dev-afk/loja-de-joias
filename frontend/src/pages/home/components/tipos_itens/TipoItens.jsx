import { useState } from "react"
import "./tipo_itens.css"
import { configs } from "../../../../../../configs.mjs"


const port_backend = configs.server.port.backend
const host_backend = configs.server.host.backend
const http_backend = configs.server.http.backend


let setTipos = false


function TiposItens () {

    let [ tipoItens, setTipoItens ] = useState([])

    setTipos = setTipoItens

    return (
        <div className="container-tipos-itens">

            {
                
                tipoItens.map((item) => (                 
                    <div onClick={()=> window.location.href = `${window.location.origin}/classe/${item.classe}`} className="iten-tipos-item">
                        <img src={item.foto} className="imagem-tipos-item" />
                        <label className="label-tipos-item">{item.nome}</label>
                    </div>
                ))
            }     
            
        </div>
    )
}

async function getTipos () {

    const response = await fetch(`${http_backend}://${host_backend}:${port_backend}/getTiposItens`)

    const data = await response.json()

    setTipos(data)    

}

getTipos()


export default TiposItens