import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pokemon from './Pokemon';
import '@fontsource/luckiest-guy';
import '@fontsource/kanit';
import './Leaderboard.css';

export default function Leaderboard() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const URI = `http://localhost:8080/game/leaderboard`;

      try {
        const res = await axios.get(URI);
        console.log(res.data);

        setGames(res.data);
      } catch (error) {
        console.error(error);
      }
      console.log('fetch');
    };
    fetchGames();
  }, []);

  return (
    <div className="leaderboard">
      <h1 className="title">Leaderboard</h1>

      <div className="data-container">
        {games.map((game) => {
          return (
            <>
              <div className="pokemon-fight">
                <div className="pokemon-container">{game.pokemon1.name}</div>

                <h1 className="game">VS</h1>

                <div className="pokemon-container">{game.pokemon2.name}</div>

                <div className="winner-container">
                  <h3>The Winner is</h3>
                  <h4>{game.winner.name}</h4>

                  <div>
                    <h3> with {game.rounds} rounds </h3>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
