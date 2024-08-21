import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [dados, setDados] = useState([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);  //veio pra abalar pra dar a mensagem que algo ta dando errado na pesquisa


  useEffect(() => {
    fetch('public/clima.json') // fetch serve pra acessar a api, pode ser com link tb !!!!!!!!!!
      .then(res => res.json())
      .then(data => setDados(data.previsao_tempo)) // Atualiza o estado com os dados da API
      .catch(error => console.error('Erro ao buscar os dados:', error)); //o apocalipse (mensagem de erro) 🕊️
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query) {
      const filteredResults = dados.filter(item =>
        item.cidade.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  };

  return (
    <>
      <section className='pesq'>  
      <input className='inputzinhe' type="text" value={query} // O valor do input é controlado pelo estado `query`
  onChange={handleInputChange} // A função `handleInputChange` é chamada toda vez que o valor do input muda
  placeholder="Digite o nome da cidade" // Texto exibido quando o input está vazio, orientando o usuário sobre o que digitar
/>

<button className='pesquisar' onClick={handleSearch}>  {/* Define a função 'handleSearch' como manipulador do evento de clique */}
  Pesquisar 
</button>
      </section>

      <div>  {/* Essa div vai mostrar os resultados da pesquisa */}

      {results.length > 0 ? (    
      <ul>  {/* Mapeia os resultados e cria um item de lista para cada resultado */}

            {results.map((climas, index) => (
           
              <li key={index}>
            <img src={climas.icone}/>               {/* Aqui mostra a imagem  */}

            {climas.cidade} - {climas.temperatura_atual}°C</li> // Ajuste conforme a estrutura do item (MOSTRA CIDADE E TEMPERATURA)
            ))}
          </ul>
        ) : (
          <p>Nenhum resultado encontrado</p>  //Mensagem pra caso  a cidade nao for encontrada 
        )}
      </div>

      <div id="tabela">
        {dados.map((climar, index) => (
          <div key={index} className="didi">
            <section className="sec">
              <img src={climar.icone} alt={climar.cidade} />
              <p className="texto">{climar.cidade}, {climar.estado}</p>
              <p className="texto">{climar.temperatura_atual}°C</p>
              <p className="texto">{climar.condicao}</p>
            </section>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
