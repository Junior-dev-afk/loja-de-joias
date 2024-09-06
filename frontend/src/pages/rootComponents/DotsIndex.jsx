import "./style.css"


function DotsIndex ({quantidade, index}) {

    const itens = []    

    for ( let i = 0; i <= quantidade-1; i++ ) {

        if ( i === index ) {
            itens.push(<DotSelected/>)
        } else {
            itens.push(<DotComum/>)
        }

    }    

    return (
        <div className="container-dots-index">
            {itens}
        </div>
    )

}

function DotComum () {

    return  <div className="dots-comum-dots-index" ></div>

}

function DotSelected () {

    return  <div className="dots-selected-dots-index" ></div>

}


export default DotsIndex