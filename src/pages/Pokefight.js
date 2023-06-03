import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid } from '@mui/material';

export default function Pokefight() {
  // Funktion, generiert ein zufälliges ID
  const generateIDs = () => {
    let pokeID = 0;
    let randomNum = Math.random() * 800; //Random num between 1 and 800
    randomNum = Math.ceil(randomNum);
    pokeID = randomNum;
    return pokeID;
  };
  const fetchPokemon = async (id) => {
    console.log('Fetching ID: ', id);
    const fetchUrl = `http://localhost:8080/pokemon/${id}`;
    try {
      const response = await fetch(fetchUrl);
      const data = await response.json();
      // console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  //fetched unser JSON
  const getRandomPokemon = async () => {
    const fetchID = generateIDs();
    const pokemon = await fetchPokemon(fetchID);
    return pokemon;
  };
  // Komponente für den Pokémon-Kampf
  const [pokemon1, setPokemon1] = useState({});
  const [pokemon2, setPokemon2] = useState({});
  const [battleLog, setBattleLog] = useState([]);

  useEffect(() => {
    startNewBattle();
  }, []);

  useEffect(() => {
    console.log('POKEMON 1: ', pokemon1);
  }, [pokemon1]);

  useEffect(() => {
    console.log('POKEMON 2: ', pokemon2);
  }, [pokemon2]);

  // Funktion, um den Schaden zu berechnen
  function calculateDamage(attack, defense) {
    const damage = Math.floor(Math.random() * 10) + 1; // Zufälliger Schaden zwischen 1 und 10
    const calculatedDamage = Math.floor(damage * (attack / defense));
    return Math.max(0, calculatedDamage);
  }

  // Funktion, um den Kampf zu simulieren
  function simulateBattle() {
    const newBattleLog = [];

    // Pokémon mit höherer Geschwindigkeit greift zuerst an
    let firstAttacker, secondAttacker;
    if (pokemon1.base.Speed > pokemon2.base.Speed) {
      firstAttacker = pokemon1;
      secondAttacker = pokemon2;
    } else {
      firstAttacker = pokemon2;
      secondAttacker = pokemon1;
    }

    newBattleLog.push(
      'Fight between ' +
        firstAttacker.name.english +
        ' and ' +
        secondAttacker.name.english
    );

    // Kampf-Schleife bis eines der Pokémon keine HP mehr hat
    while (firstAttacker.base.HP > 0 && secondAttacker.base.HP > 0) {
      // Angriff des ersten Angreifers
      const damage1 = calculateDamage(
        firstAttacker.base.Attack,
        secondAttacker.base.Defense
      );
      secondAttacker.base.HP -= damage1;

      newBattleLog.push(
        firstAttacker.name.english +
          ' attacks and deals ' +
          damage1 +
          ' damage.'
      );
      if (Math.max(0, secondAttacker.base.HP) === 0) {
        newBattleLog.push(
          secondAttacker.name.english +
            ' was killed by ' +
            firstAttacker.name.english
        );
      } else {
        newBattleLog.push(
          secondAttacker.name.english +
            ' remains with ' +
            Math.max(0, secondAttacker.base.HP) +
            ' HP.'
        );
      }

      // Überprüfe, ob das zweite Pokémon noch lebt
      if (secondAttacker.base.HP <= 0) {
        break;
      }

      // Angriff des zweiten Angreifers
      const damage2 = calculateDamage(
        secondAttacker.base.Attack,
        firstAttacker.base.Defense
      );
      firstAttacker.base.HP -= damage2;

      newBattleLog.push(
        secondAttacker.name.english +
          ' attacks and deals ' +
          damage2 +
          ' damage.'
      );

      if (Math.max(0, firstAttacker.base.HP) === 0) {
        newBattleLog.push(
          firstAttacker.name.english +
            ' was killed by ' +
            secondAttacker.name.english
        );
      } else {
        newBattleLog.push(
          firstAttacker.name.english +
            ' remains with ' +
            Math.max(0, firstAttacker.base.HP) +
            ' HP.'
        );
      }
    }

    // Überprüfe, welches Pokémon gewonnen hat
    if (firstAttacker.base.HP > 0) {
      newBattleLog.push(firstAttacker.name.english + ' wins the fight!');
    } else if (secondAttacker.base.HP > 0) {
      newBattleLog.push(secondAttacker.name.english + ' wins the fight!');
    } else {
      newBattleLog.push('It is a draw!');
    }

    setBattleLog(newBattleLog);
  }

  // Funktion, um einen neuen Kampf zu starten
  async function startNewBattle() {
    setPokemon1(await getRandomPokemon());
    setPokemon2(await getRandomPokemon());
    setBattleLog([]);
  }

  // if (Object.keys(pokemon1).length === 0 || Object.keys(pokemon2).length === 0)
  //   return <div>Loading...</div>;

  return (
    <div>
      <div className="pokefight-buttons">
        <Button
          onClick={simulateBattle}
          sx={{ marginRight: 2 }}
          color="primary"
          variant="contained">
          Start Fight
        </Button>
        <Button
          onClick={startNewBattle}
          sx={{ color: 'primary.dark' }}
          variant="outlined">
          New Fight
        </Button>
        {/* <button onClick={simulateBattle}>Start Fight</button>
        <button onClick={startNewBattle}>New Fight</button> */}
      </div>

      <div className="yourPoke">
        <Typography variant="gameHeader" color="primary" m={2} p={2}>
          Your Pokémon
        </Typography>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon1?.id}.png`}
          alt={`${pokemon1.name?.english} Image`}
        />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="gameStats">Name: </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="gameStats">
              {pokemon1.name?.english}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="gameStats">Type: </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="gameStats">{pokemon1.type?.[0]}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="gameStats">Speed:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="gameStats">{pokemon1.base?.Speed}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="gameStats">HP:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="gameStats">{pokemon1.base?.HP}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="gameStats">Attack:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="gameStats">{pokemon1.base?.Attack}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="gameStats">Defense:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="gameStats">
              {pokemon1.base?.Defense}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="gameStats">Speed Defense:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="gameStats">
              {pokemon1.base?.['Sp. Defense']}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="gameStats">Speed Attack:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="gameStats">
              {pokemon1.base?.['Sp. Attack']}
            </Typography>
          </Grid>
        </Grid>
      </div>
      <hr />
      <div className="battleLog">
        {battleLog.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
      <hr />

      <div className="theirPoke">
        <Typography variant="gameHeader" color="secondary" p={2} m={2}>
          Opponent Pokémon
        </Typography>
        <h2>Opponent Pokémon</h2>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon2?.id}.png`}
          alt={`${pokemon2.name?.english} Image`}
        />
        <p>Name: {pokemon2.name?.english}</p>
        <p>Type: {pokemon2.type?.[0]}</p>
        <p>Speed: {pokemon2.base?.Speed}</p>
        <p>HP: {pokemon2.base?.HP}</p>
        <p>Attack: {pokemon2.base?.Attack}</p>
        <p>Defense: {pokemon2.base?.Defense}</p>
        <p>Speed Defense: {pokemon2.base?.['Sp. Defense']}</p>
        <p>Speed Attack: {pokemon2.base?.['Sp. Attack']}</p>
      </div>
    </div>
  );
}
