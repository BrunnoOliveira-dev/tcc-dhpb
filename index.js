const express = require("express")
const app = express()
const port = 3000

const sequelize = require('./server/config/config_db');

const router = require("./server/router/router")

app.use(express.json())
app.use(express.static("client/src"))
app.use("/node_modules", express.static("node_modules"))
app.use(router)

// app.use(router) depois que criarem o arquivo de rotas

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})