import app from "../app.js"
import item from "../models/itens.js"
import { configs } from "../../configs.mjs"


const host = configs.server.host.backend
const http = configs.server.http.backend
const port = configs.server.port.backend


class FetchGet {

    constructor () {
        this.init()
    }
 
    init () { 

        app.get("/getFotosSugestao" , async (req, res) => {

            try {

                const itens = await item.getItens()

                let new_itens = []


                itens.forEach(item => {

                    item.imagens = item.imagens.map((img, i) => {
                        if ( i == 0 ) {
                            return http+"://"+host+":"+port+"/public/images/"+img
                        }
                    })

                    new_itens.push(item)

                })                

                res.status(200).json(new_itens)

            } catch (error) {

                console.error("Erro ao buscar itens:", error);

                res.status(500).json({ message: "Erro interno do servidor" });

            }

        })

        app.get("/getTiposItens", async (req, res) => {

            try {

                const itens = await item.getTiposItens()

                itens.map((item) => item.foto = http+"://"+host+":"+port+"/public/tipos/"+item.foto)
                                
                res.status(200).json(itens)

            } catch (error) {

                console.error("Erro ao buscar itens:", error);

                res.status(500).json({ message: "Erro interno do servidor" });

            }

        })

        app.get("/getItensHome", async (req, res) => {

            try {

                const itens = await item.getAllProducts()

                const itens_home = itens.itens_home

                itens_home.map(item => item.imagens[0] = `${http}://${host}:${port}/public/images/${item.imagens[0]}`)
                
                                
                res.status(200).json(itens_home)

            } catch (error) {

                console.error("Erro ao buscar itens:", error);

                res.status(500).json({ message: "Erro interno do servidor" });

            }

        })

        app.get("/filtrar/:classe/:min/:max", async (req, res) => {

            const { classe, min, max } = req.params

            const itens = await item.getAllProducts()

            if ( !(classe in itens) ) {
                return res.status(404).json([])
            }

            const class_itens = itens[classe]

            const itens_filtrado = item.filtrarItensPorValor(class_itens, min, max)
            
            res.status(200).json(itens_filtrado)
              
        })

        app.get("/getItemFromId/:id", async (req, res) => {

            const { id } = req.params

            let item_id = await item.getItemFromID(id)     
            
            if ( item_id == false ) {
                return res.status(404).json({error : true})
            }

            res.status(200).json(item_id)
              
        })

    }

}

const get = new FetchGet() 

export default get
