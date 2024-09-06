import app from "../app.js"
import item from "../models/itens.js"
import { configs } from "../../configs.mjs"


const host = configs.server.host.backend
const http = configs.server.http.backend
const port = configs.server.port.backend

 
class FetchPost {

    constructor () {
        this.init()
    }
 
    init () { 

        app.post("/getItensFromClass", async (req, res) => {

            try {

                const { classe } = req.body

                const itens = await item.getAllProducts()                

                if ( !(classe in itens) ) {
                    res.status(404).json({error : true}) 
                    return
                }                
       
                const filtro = itens[classe]

                filtro.map(item => item.imagens[0] = `${http}://${host}:${port}/public/images/${item.imagens[0]}`)
                         
                res.status(200).json(filtro)

            } catch (error) {

                console.error("Erro ao buscar itens:", error);

                res.status(500).json({ message: "Erro interno do servidor" });

            }

        })

    }

}

const post = new FetchPost() 

export default post
