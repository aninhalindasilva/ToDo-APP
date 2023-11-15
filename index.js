const express = require("express")
const exphbs = require("express-handlebars")

const app = express()

app.engine("handlebars", exphbs.engine())
app.set("view egnore", "handlebars")

app.get('/', (requisicao, resposta) => {
    resposta.send("Olá, mundo")
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 300!")
})


