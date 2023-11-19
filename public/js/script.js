function alterarTema() {
    const tema = localStorage.getItem("tema")
    const body = document.querySelector("body")
    const button = document.querySelector(".tema-button")

    if (tema) {
        let novoTema

        if(tema === "light"){
            novoTema = "dark"
            button.innerHTML = `<img src="../img/solcerto.png" alt="Ícone do sol">`
            body.classList.remove("light")
            body.classList.add("dark")
        }  else {
            button.innerHTML `<img src="../img/lua1.png" alt="Ícone de lua">`
            novoTema = "light"
            body.classList.remove("dark")
            body.classList.add("light")
        }

        localStorage.setItem("tema", novoTema)
        return
    }

    localStorage.setItem("tema", "dark")
    body.classList.add("dark")
}

function verificarTema(){
    const tema = localStorage.getItem("tema")
    const body = document.querySelector("body")
    const button = document.querySelector(".tema-button")
    
    if (tema){
        if (tema == "dark"){
            body.classList.add("dark")
            button.innerHTML = `<img src="../img/solcerto.png" alt="Ícone do sol">`
        }  else {
            body.classList.add("light")
            button.innerHTML `<img src="../img/lua1.png" alt="Ícone de lua">`
        }
    }
}

verificarTema()
