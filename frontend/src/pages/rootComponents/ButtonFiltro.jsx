import { useState } from "react"
import { configs } from "../../../../configs.mjs"


const port_backend = configs.server.port.backend
const host_backend = configs.server.host.backend
const http_backend = configs.server.http.backend


const formatCurrency = (value) => {
    const number = Number(value.replace(/[^\d]/g, '')) / 100;
    return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };
  
  const parseCurrency = (value) => {
    return value.replace(/[^\d]/g, '');
  };


function ButtonFiltro ({editArrayItens}) {

    const [ janela_aberta, setJanelaAberta ] = useState(false)
    const [minValue, setMinValue] = useState('');
    const [maxValue, setMaxValue] = useState('');
  
    const handleMinChange = (event) => {
        const rawValue = event.target.value;
        const formattedValue = formatCurrency(parseCurrency(rawValue));
        setMinValue(formattedValue);
    };
  
    const handleMaxChange = (event) => {
        const rawValue = event.target.value;
        const formattedValue = formatCurrency(parseCurrency(rawValue));
        setMaxValue(formattedValue);
    };

    return (
        <div className="container_button_filtro">
            <button onClick={
                () => setJanelaAberta(!janela_aberta)
            } className="button_filtro">Filtrar</button>

            {(janela_aberta) && (
                <div className="conteiner_janela_filtro">
                    <label style={{color : "white"}}>Valor</label>
                    <div>
                        <input 
                            className="input_filtro"
                            id="min-input" 
                            placeholder="de : "
                            value={minValue}
                            onChange={handleMinChange}
                        />
                        <input 
                            className="input_filtro" 
                            id="max-input"
                            placeholder="até : "
                            value={maxValue}
                            onChange={handleMaxChange}
                        />
                    </div>
                    <button onClick={() => filtrar(editArrayItens, setJanelaAberta)} className="button_filtro">Filtrar</button>
                </div>
            )}

        </div>
    )
}


async function filtrar (editArrayItens, setJanelaAberta) {

    setJanelaAberta(false)

    let min = document.getElementById("min-input").value.replace("R$", "").trim()
    let max = document.getElementById("max-input").value.replace("R$", "").trim()

    const link = window.location.href

    if ( min.trim() == "") {
        min = "0"
    }

    if ( max.trim() == "") {
        max = "99999999"
    }    

    if ( link.includes('classe') ) {
        const classe = link.replace(`${window.location.origin}/classe/`, '')         

        const filtros = `${classe}/${min}/${max}`  
            
        const response = await fetch(`${http_backend}://${host_backend}:${port_backend}/filtrar/${filtros}`)

        const data = await response.json()

        if ( typeof(data) != typeof([]) ) {
            return 
        }        

        editArrayItens(data)

        return 
    }    

    
}



export default ButtonFiltro