import FotosSugestoes from "./components/fotos_sugestoes/FotosSugestoes"
import Topo from "./components/topo/Topo"
import TiposItens from "./components/tipos_itens/TipoItens"
import Sugestoes from "./components/sugestoes_itens/Sugestoes"

function Home () {
    return (
        <>
            <Topo/>
            <FotosSugestoes/>
            <TiposItens/>
            <Sugestoes/>
        </>
    )
}

export default Home