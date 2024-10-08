import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import PesquisaClasse from './pages/pesquisa/classes/PesquisaClasse';
import Produto from './pages/produto/Produto';



function App() {

    return (
        <Router>
            <Routes>
                <Route path = "/" element = {<Home/>} />
                <Route path = "/item/:id" element = {<Produto/>} />
                <Route path = "/classe/:classe" element = {<PesquisaClasse/>} />
            </Routes>
        </Router>
    )
}

export default App
