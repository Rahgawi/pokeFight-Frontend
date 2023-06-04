import React from 'react';
import RandomPokemon from '../components/RandomPokemon/RandomPokemon';
import './Pokemon.css';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Pokemon() {
  const { id } = useParams();
  const [singlePokemon, setSinglePokemon] = useState({});

  useEffect(() => {
    const fetchPokemon = async () => {
      const URI = `http://localhost:8080/pokemon/${id}`;

      try {
        const res = await axios.get(URI);
        console.log(res.data);

        setSinglePokemon(res.data);
      } catch (error) {
        console.error(error);
      }
      console.log('fetch');
    };
    fetchPokemon();
  }, [id]);
  if (Object.keys(singlePokemon).length === 0) {
    return (
      <>
        <h1>isLoading</h1>
      </>
    );
  }
  return (
    <div className="pokemon">
      <div className="profile">
        <div className="attribute-list">
          <div className="pokeImg">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              alt={singlePokemon.name}
            />
          </div>
          <table>
            <tbody>
              <tr>
                <td>Name:</td>
                <td>{singlePokemon.name.english}</td>
              </tr>
              <tr>
                <td>Type:</td>
                <td>{singlePokemon.type[0]}</td>
              </tr>
              <h3>Base</h3>
              <tr>
                <td>HP:</td>
                <td>{singlePokemon.base.HP}</td>
              </tr>
              <tr>
                <td>Attack:</td>
                <td>{singlePokemon.base.Attack}</td>
              </tr>
              <tr>
                <td>Defense:</td>
                <td>{singlePokemon.base.Defense}</td>
              </tr>
              <tr>
                <td>Sp. Attack:</td>
                <td>{singlePokemon.base['Sp. Attack']}</td>
              </tr>
              <tr>
                <td>Sp. Defense:</td>
                <td>{singlePokemon.base['Sp. Defense']}</td>
              </tr>
              <tr>
                <td>Speed:</td>
                <td>{singlePokemon.base.Speed}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <RandomPokemon />
      </div>
    </div>
  );
}
