import "./topo.css"
import lupa from "/public/icons/lupa.png"


function Topo () {
    return (
        <div className='container_topo'>

            <div onClick={()=>window.location.href = `${window.location.origin}`} className="logo">
                <img src="../../../../../public/icons/logo.png" className="imagem-logo-header" />
            </div>

            <div className='container_input_topo' >

                <label onClick={() => {selecionarInput()}} className='label_input_pesquisa' htmlFor="">Pesquisa</label>

                <input onFocus={() => {focado = true; focarLabel()}} onBlur={() => {focado = false; desfocarLabel()}} className='input_input_pesquisa' type="text" />

                <button className='button_input_pesquisa' >
                    <img style={{
                        width: 16, 
                        display:"flex", 
                        justifyContent:"center",
                        alignItems:"center"
                    }} src={lupa} alt="" />
                </button>
            </div>
        </div>
    )
}

let focado = false

function selecionarInput () {

    const input = document.querySelector(".input_input_pesquisa")

    if ( focado ) {
        input.blur()
    } else {
        input.focus()
    }

    focarLabel()
    
}

function focarLabel () {

    const label = document.querySelector(".label_input_pesquisa")
    label.style.cssText += `
        top:-12px;
        left:20px;
        transition:0.3s;
    `

    const input = document.querySelector(".input_input_pesquisa")
    input.style.cssText += `
    color: var(--cor-clara);
    transition:0.3s;
`
}

function desfocarLabel () {

    const label = document.querySelector(".label_input_pesquisa")
    label.style.cssText += `
        top:calc(50% - 10px);
        left:30px;
        transition:0.3s;
    `

    const input = document.querySelector(".input_input_pesquisa")
    input.style.cssText += `
    color: black;
    transition:0.3s;
`

}



export default Topo