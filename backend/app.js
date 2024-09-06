import express from "express"
import path from "path"
import cors from "cors"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { configs } from "../configs.mjs";


const port = configs.server.port.backend
const host = configs.server.host.backend
const http = configs.server.http.backend

const port_frontend = configs.server.port.frontend
const host_frontend = configs.server.host.frontend
const http_frontend = configs.server.http.frontend


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express()

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(cors());
 
app.use(cors({ 
    origin: `${http_frontend}://${host_frontend}:${port_frontend}`,
}));


app.listen(port, host, ()=>{
    console.log(`server rodando em ${http}://${host}:${port}` )
})

export default app
