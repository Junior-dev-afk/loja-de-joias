import { promises as fs } from "fs"
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { configs } from "../../configs.mjs";


const port = configs.server.port.backend
const host = configs.server.host.backend
const http = configs.server.http.backend


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const file_data = join(__dirname, "../itens/itens.json") 
const file_tipo_itens = join(__dirname, "../itens/tipos.json")
const file_produtos = join(__dirname, "../itens/produtos.json")


class Itens {

    constructor () {}


    async getItens() {

        const data = await this.getAllProducts()

        const itens_aleatorios = []

        Object.keys(data).forEach((key) => {
            if ( key != "itens_home" ) {
                const num_aleatorio = Math.floor(Math.random() * data[key].length)

                itens_aleatorios.push(data[key][num_aleatorio])
            }
        })             

        return itens_aleatorios;

    }

    async getTiposItens () {

        const data = await fs.readFile(file_tipo_itens, 'utf8');

        const jsonData = JSON.parse(data);

        return jsonData;

    }

    async getAllProducts () {

        const data = await fs.readFile(file_produtos, 'utf8');

        const jsonData = JSON.parse(data);

        return jsonData;

    }

    filtrarItensPorValor (array_todos_itens, min, max) {

        const itens_filtrados = []

        const min_int = this.#convertStringBRLFromInt(min)
        const max_int = this.#convertStringBRLFromInt(max)

        array_todos_itens.forEach((item) => {

            const valor = this.#convertStringBRLFromInt(item.valor)

            if ( valor >= min_int && valor <= max_int ) {

                item.imagens = item.imagens.map((imagem) => {
                    return `${http}://${host}:${port}/public/images/${imagem}`
                })

                itens_filtrados.push(item)

            }

        })

        return itens_filtrados

    }

    #convertStringBRLFromInt (string) {

        let resultado = string.replace(/[.,]/g, '');

        resultado = parseInt(resultado)

        return resultado

    }

}

const item = new Itens()

export default item