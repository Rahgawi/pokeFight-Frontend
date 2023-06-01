import React from 'react';
import { useState, useEffect } from 'react';
import './RandomPokemon.css';
import { Link } from 'react-router-dom';

let pokemonIds = [];

export default function RandomPokemon() {
  const [pokeData, setPokeData] = useState([]);

  const generateIDs = (idCount) => {
    let pokeIDs = [];
    const times = idCount;
    for (let count = 0; count < times; count++) {
      let randomNum = Math.random() * 800; //Random num between 1 and 8000
      randomNum = Math.ceil(randomNum);
      pokeIDs.push(randomNum);
    }
    return pokeIDs;
  };

  useEffect(() => {
    setPokeData([]);
    const fetchPokemon = async (id) => {
      console.log('Fetching ID: ', id);
      const fetchUrl = `http://localhost:8080/pokemon/${id}`;
      try {
        const response = await fetch(fetchUrl);
        const data = await response.json();

        // Check if pokemon does not exist yet in array
        if (pokeData.includes({ id: { id } })) {
          return;
        }
        setPokeData((prev) => [...prev, data]);
      } catch (error) {
        console.error(error);
      }
    };

    if (pokemonIds.length === 0) {
      pokemonIds = generateIDs(4);
    }

    //const idsToFetch = generateIDs(4);

    console.log('IDs to fetch: ', pokemonIds);
    pokemonIds.map((id) => {
      fetchPokemon(id);
    });
  }, []);

  useEffect(() => {
    console.log('POKEDATA: ', pokeData);
  }, [pokeData]);

  if (pokeData == []) return <div>Loading...</div>;
  return (
    <>
      <div className="random-Wrapper">
        <div className="h3">
          <h3>See also...</h3>
        </div>
        {pokeData.map((pokemon) => {
          const name = pokemon.name.english;
          return (
            <Link to={`/pokemon/${pokemon.id}`}>
              <div className="random-pokePreview">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                  alt={`${name} Image`}
                />
                <p>{name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
