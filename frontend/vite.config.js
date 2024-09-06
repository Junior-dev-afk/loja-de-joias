import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configs } from '../configs.mjs'


const port = configs.server.port.frontend
const host = configs.server.host.frontend


export default defineConfig({
  plugins: [react()],
  server : {
      host : host,
      port : port
  }
})
