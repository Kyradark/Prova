import React, { useState, useEffect } from 'react';
import './App.css'; // Certifique-se de importar o CSS

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const choices = ['Pedra', 'Papel', 'Tesoura'];

  // Função para o computador escolher uma jogada aleatória
  useEffect(() => {
    if (playerChoice) {
      const randomChoice = choices[Math.floor(Math.random() * choices.length)];
      setComputerChoice(randomChoice);
    }
  }, [playerChoice]);

  // Determina o resultado do jogo e atualiza o placar
  useEffect(() => {
    if (playerChoice && computerChoice) {
      if (playerChoice === computerChoice) {
        setResult('Empate!');
      } else if (
        (playerChoice === 'Pedra' && computerChoice === 'Tesoura') ||
        (playerChoice === 'Tesoura' && computerChoice === 'Papel') ||
        (playerChoice === 'Papel' && computerChoice === 'Pedra')
      ) {
        setResult('Você ganhou!');
        setPlayerScore(playerScore + 1);
      } else {
        setResult('Você perdeu!');
        setComputerScore(computerScore + 1);
      }
    }
  }, [computerChoice]);

  // Função para encerrar a partida
  const endGame = () => {
    setGameOver(true);
  };

  // Função para reiniciar o jogo
  const playAgain = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('');
    setGameOver(false);
  };

  return (
    <div className="container">
      <h1>Pedra, Papel ou Tesoura</h1>

      <div className="scoreboard">
        <div>Jogador: {playerScore}</div>
        <div>Computador: {computerScore}</div>
      </div>

      {!gameOver ? (
        <>
          <div className="choice-buttons">
            <button onClick={() => setPlayerChoice('Pedra')}>
              <p>✊Pedra</p>
            </button>
            <button onClick={() => setPlayerChoice('Papel')}>
              <p>🤚Papel</p>
            </button>
            <button onClick={() => setPlayerChoice('Tesoura')}>
              <p>✌Tesoura</p>
            </button>
          </div>

          <div>
            {playerChoice && <h2>Você escolheu: {playerChoice}</h2>}
            {computerChoice && <h2>Computador escolheu: {computerChoice}</h2>}
          </div>

          {result && <h2 className={`result ${result === 'Você ganhou!' ? 'Venceu' : result === 'Você perdeu!' ? 'Perdeu' : 'Empate'}`}>Resultado: {result}</h2>}

          {playerChoice && !gameOver && (
            <button className="end-game-button" onClick={endGame}>
              Encerrar Partida
            </button>
          )}
        </>
      ) : (
        <div className="game-over">
          <h2>Resultado Final</h2>
          <p>Jogador: {playerScore}</p>
          <p>Computador: {computerScore}</p>
          <button className="play-again-button" onClick={playAgain}>
            Jogar Novamente
          </button>
        </div>
      )}
    </div>
  );
};

export default RockPaperScissors;
