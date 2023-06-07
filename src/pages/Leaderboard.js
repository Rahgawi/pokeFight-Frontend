import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pokemon from './Pokemon';
import { Link } from 'react-router-dom';
import '@fontsource/luckiest-guy';
import '@fontsource/kanit';
import './Leaderboard.css';

export default function Leaderboard() {
  const [games, setGames] = useState([]);

  const compareByRounds = (fight1, fight2) => {
    if (fight1.rounds < fight2.rounds) {
      return -1;
    }
    if (fight1.rounds > fight2.rounds) {
      return 1;
    }
    return 0;
  };

  useEffect(() => {
    const fetchGames = async () => {
      const URI = `${process.env.REACT_APP_POKE_API}/game/leaderboard`;

      try {
        const res = await axios.get(URI);
        console.log(res.data);
        const sortedGames = res.data.sort(compareByRounds);

        setGames(sortedGames);
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
      <div className="leaderboard-center">
        <div className="data-container">
          {games.map((game) => {
            return (
              <>
                <div className="pokemon-fight">
                  <div className="fighting-pokes">
                    <div className="pokemon-container ">
                      <Link to={`../pokemon/${game.pokemon1.id}`}>
                        <p>{game.pokemon1.name}</p>
                      </Link>
                    </div>

                    <h1 className="game">VS</h1>

                    <div className="pokemon-container">
                      <Link to={`../pokemon/${game.pokemon2.id}`}>
                        <p>{game.pokemon2.name}</p>
                      </Link>
                    </div>
                  </div>

                  <div className="winner-container">
                    <h3>The Winner is</h3>
                    <h4>{game.winner.name}</h4>

                    <div>
                      <h3> with {game.rounds} rounds </h3>
                    </div>
                  </div>
                </div>
                <br />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
