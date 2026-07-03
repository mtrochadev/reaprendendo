import './Home.css'

function Home() {

  return (
    <>
      <div className='container'>
        <div className='usuario-input-container'>
          <p>Nome do usuario (Sem nome meme)</p>
          <input className='usuario-input' type="text" />
        </div>
        <button className='btn'>Iniciar perguntas</button>
      </div>
    </>
  )
}

export default Home
