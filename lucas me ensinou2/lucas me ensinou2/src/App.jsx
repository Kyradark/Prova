import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [imagem, setImagem] = useState([])
  const [cor, setCor] = useState ()

  async function PegaImgGato(){
    const resposta = await fetch("./nome.json")
    const dados = await resposta.json()

    setImagem(dados)
    setCor(corAtual =>{
      if(corAtual== "yellow"){
        return "blue"
      }else{
        return "yellow"
      }
    })
  }
  useEffect(() => {
    PegaImgGato()
    imagem.map(teste=>{
      teste.nome,
      teste.cachorro
    })
  }, [])
// const [nome, setNome] = useState("lucas")

// function MudaNome(){
//   setNome("Leticia")
 //}
 return (
  <>
  <h1 style={{
    backgroundColor: cor
  }}>
    Gatinhos
  </h1>
  <hr/>
  <main>
    <img src={imagem}/>

  <button onClick={PegaImgGato}> muda texto</button>
  </main>

  {/* <p>{nome}</p> */}
    
  </>
)
}

export default App
