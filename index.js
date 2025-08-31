const express = require("express")
const app = express()
const port = 3000
const path = require("path")

const sequelize = require('./server/config/config_db');

const router = require("./server/router/router")

app.use(express.json())

app.use(express.static(path.join(__dirname, "public")))  // especificando a pasta public como onde terar o front dados do front-end (onde ficam os arquivos estaticos: html, css, js, imagens, etc)
app.use('/src', express.static(path.join(__dirname, 'public/src')));  // especificando a pasta src dentro de public como estatica (onde ficam os arquivos estaticos: css, js, imagens, etc)


app.use("/node_modules", express.static("node_modules"))
app.use(router)

// app.use(router) depois que criarem o arquivo de rotas

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})