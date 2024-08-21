import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Pag2006.css';

function mostraTudo(dados) {
  const tabela = document.querySelector("#tabela");
  const capa = document.querySelector("#capa");

  tabela.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados
  let totalVisualizacoes = 0;
  let linhaAtual = null;
  let contagem = 0;

  dados.forEach(item => {
    item.top_musicas.forEach(musica => {
      if (contagem % 6 === 0) {
        linhaAtual = document.createElement('div');
        linhaAtual.className = 'linha';
        tabela.appendChild(linhaAtual);
      }

      const card = document.createElement('div');
      card.className = 'didi';
      card.style.background = degrade(); // Aplica degradê aleatório
      card.innerHTML = `
        <section class="sec">
          <img src="${musica.capa}" alt="${musica.titulo}" />
          <p class="texto">${musica.titulo}</p>
          <p class="texto">${musica.artista}</p>
          <p class="texto">${musica.visualizacoes}</p>
        </section>
      `;
      linhaAtual.appendChild(card);

      totalVisualizacoes += Number(musica.visualizacoes);
      contagem++;
    });
  });

  capa.innerHTML = `Total de Favoritos = 0`; // Atualize conforme necessário
}

function coraleatoria() {
  // Gera uma cor hexadecimal aleatória mais viva
  const letras = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letras[Math.floor(Math.random() * 16)];
  }
  return color;
}

function degrade() {
  // Gera um degradê onde a cor vai para ela mesma, porém mais escura
  const cor1 = coraleatoria();
  const cor2 = darkenColor(cor1, 20); // Ajuste o valor para tornar a cor mais escura
  return `linear-gradient(to bottom, ${cor1}, ${cor2})`;
}

function darkenColor(color, percent) {
  // Função para escurecer uma cor hexadecimal em percentagem
  const num = parseInt(color.slice(1), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = (num >> 8 & 0x00FF) - amt;
  const B = (num & 0x0000FF) - amt;
  return `#${(0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1)}`;
}

function Pag2006() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    fetch('public/2006a2010.json')
      .then(res => res.json())
      .then(data => {
        // Ordena os dados em ordem alfabética pelo ano
        data.musicas_virais.sort((a, b) => a.ano - b.ano);
        setDados(data.musicas_virais);
        mostraTudo(data.musicas_virais);
      });
  }, []);

  return (
    <>
      <div id="box">
        <div className="inside-box1">
          <svg className='home' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
          </svg>
          <Link className='txts' to="/"> <span className='busca'>Início</span> <br /></Link>
          <svg className='home' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
          <span className='busca1'> Busca</span>
        </div>
        <div className="inside-box2">
          <section>
            <div className='divs'>
              <img src="src/assets/imgs/2000.png" alt="2000 - 2005" />
              <Link className='txts' to="/2000-2005">2000 - 2005</Link>
            </div>
            <div className='divs'>
              <img src="src/assets/imgs/2006.png" alt="2006 - 2010" />
              <Link className='txts' to="/2006-2010">2006 - 2010</Link>
            </div>
            <div className='divs'>
              <img src="src/assets/imgs/2011.png" alt="2011 - 2015" />
              <Link className='txts' to="/2011-2015">2011 - 2015</Link>
            </div>
          </section>
        </div>
        <div className="inside-box3">
          <span className='topm'>As músicas mais tocadas nos anos 2000</span>
          <p className='escute'>Escute os sons mais reproduzidos nos anos 2000 a 2015</p>
          <div id="tabela"></div>
        </div>
      </div>
    </>
  );
}

export default Pag2006;
