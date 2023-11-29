const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql2")

const app = express()

app.engine('handlebars', exphbs.engine())
app.set("view engine", "handlebars")

app.use(express.static("public"))

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

//rotas
app.post('/excluir', (requisicao,resposta) => {
    const id = requisicao.body.id

    const sql = `
        DELETE FROM tarefas
        WHERE id = ${id}
    `

    conecao.query(sql, (erro) => {
        id (erro) 
            return console.log (erro)
        

        resposta.redirect('/')
    })
})

app.post('/completar', (requisicao, resposta) => {
    const id = requisicao.body.id

    const sql = `
    
    UPDATE tarefas
    SET completa = '1'
    WHERE id = ${id}
    `

    conecao.query(sql, (erro) => {
        if (erro){
            return console.log(erro)
        }

        resposta.redirect('/')
    } )
})

app.post ('/descompletar', (requisicao, resposta) => {
    const id = requisicao.body.id 

    const sql = `
    UPDATE tarefas
    SET completa = '0'
    WHERE id = ${id}
    `

    conecao.query(sql, (erro) => {
        if (erro) {
            return console.log(erro)
        }

        resposta.redirect('/')
    })

})

app.post('/criar', (requisicao, resposta) => {
    const tarefascol1 = requisicao.body.tarefascol1

    const tarefascol3 = 0

    const sql = `
    INSERT INTO tarefas(descricao, completa)
    VALUES('${tarefascol1}', '${tarefascol3}' ) `

    conecao.query(sql, (erro) => {
        if (erro){
            return console.log(erro)
        }

        resposta.redirect('/')
    })

})

app.get('/completas', (requisicao, resposta) => {
    const sql = `
    SELECT * FROM tarefas
    WHERE completa = '1'
    `
    conecao.query(sql, (erro, dados) => {
        if (erro){
            return console.log(erro)
        }
        const tarefas = dados.map((dado) => {
            return {
                id: dado.id,
                descricao: dado.descricao,
                completa: true
            }
        })
        const quantidadeTarefas = tarefas.length

        resposta.render('completas', {tarefas, quantidadeTarefas})
    })
})



app.get('/ativas', (requisicao, resposta) =>{
    const sql = `
    SELECT * FROM tarefas
    WHERE completas = '0'
    `

    conecao.query(sql, (erro, dados) => {
        if (erro) {
            return console.log(erro)
        }

        const tarefas = dados.map((dado) => {
            return {
                id: dado.id,
                descricao: dado.descricao,
                completa: false
            }
        })

        const quantidadeTarefas = tarefas.length

        resposta.render('ativas', { tarefas, quantidadeTarefas})
    })
})

app.get('/' , (requisicao, resposta) => {
    const sql = 'SELECT * FROM tarefas'

    conecao.query(sql, (erro, dados) => {
        if (erro) {
            return console.log(erro)
        }

        const tarefas = dados.map((dado) => {
            return {
                id: dado.id,
                descricao: dado.descricao,
                completa: dado.completa === 0 ? false : true
            }
        })

        const tarefasAtivas = tarefas.filter((tarefa) => {
            return tarefa.tarefasacol3 === false && tarefa
        })

        const quantidadeTarefasAtivas = tarefasAtivas.length


        resposta.render('home' , { tarefas, quantidadeTarefasAtivas })
    })


})

const conecao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "todooapp",
    port: 3306
})

conecao.connect((erro) => {
    if(erro) {
        return console.log(erro)
    }

    console.log("estou conectado ao mysql")

    app.listen( 3000, () => {
        console.log("servidor rodando na porta 3000")
    })
})