import { useParams } from 'react-router-dom';
import Topo from '../../home/components/topo/Topo';
import { useState } from 'react';
import { configs } from '../../../../../configs.mjs';
import Erro from '../../rootComponents/Erro';
import Produto from './components/Produto';
import "./pesquisaClasse.css"
import ButtonFiltro from '../../rootComponents/ButtonFiltro';


const port_backend = configs.server.port.backend
const host_backend = configs.server.host.backend
const http_backend = configs.server.http.backend


let tipo_classe = false
let setTiposItens = false
let setarItensPesquisados = false


function UserProfile() {
  
    const { classe } = useParams()
    let [ itens, setItens ] = useState([])
    let [ itens_pesquisado, setItemPesquisado ] = useState(false)
    

    tipo_classe = classe
    setTiposItens = setItens  
    setarItensPesquisados = setItemPesquisado  

    return (
        <>
            <Topo/>
            <ButtonFiltro editArrayItens={setItens}/>
            <div className="container_itens_pesquisa">
            {
                ( itens.length === 0 && itens_pesquisado == true ) ? (
                    <Erro mensagem={"Nenhum item encontrado"}/>
                ) : (
                    itens.map((item) => (
                        <Produto item={item}/>
                    ))
                )
            }
            </div>
        </>
    )
}


let interval_ = setInterval(()=>{
    if ( tipo_classe !== false ) {
        clearInterval(interval_)

        getAndSetItensOfClass(tipo_classe)
    }
}, 1000)

async function getAndSetItensOfClass (classe) {

    const response = await fetch(`${http_backend}://${host_backend}:${port_backend}/getItensFromClass`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({classe : classe})
    })

    const data = await response.json()

    setarItensPesquisados(true)

    if (data.error) {
        return setTiposItens([])
    }

    setTiposItens(data)    
   
}


export default UserProfile;
