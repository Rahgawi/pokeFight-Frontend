import React, { useState, useEffect } from 'react';

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
    return await fetchPokemon(fetchID);
  };
  // Komponente für den Pokémon-Kampf
  const [pokemon1, setPokemon1] = useState({});
  const [pokemon2, setPokemon2] = useState({});
  const [battleLog, setBattleLog] = useState([]);

  useEffect(() => {
    setPokemon1(getRandomPokemon());
    setPokemon2(getRandomPokemon());
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
    return damage * (attack / defense);
  }

  // Funktion, um den Kampf zu simulieren
  function simulateBattle() {
    const newBattleLog = [];

    // Pokémon mit höherer Geschwindigkeit greift zuerst an
    let firstAttacker, secondAttacker;
    if (pokemon1.speed > pokemon2.speed) {
      firstAttacker = pokemon1;
      secondAttacker = pokemon2;
    } else {
      firstAttacker = pokemon2;
      secondAttacker = pokemon1;
    }

    newBattleLog.push(
      'Kampf zwischen ' + firstAttacker.name + ' und ' + secondAttacker.name
    );

    // Kampf-Schleife bis eines der Pokémon keine KP mehr hat
    while (pokemon1.hp > 0 && pokemon2.hp > 0) {
      // Angriff des ersten Angreifers
      const damage1 = calculateDamage(
        firstAttacker.attack,
        secondAttacker.defense
      );
      pokemon2.hp -= damage1;

      newBattleLog.push(
        firstAttacker.name + ' greift an und fügt ' + damage1 + ' Schaden zu.'
      );
      newBattleLog.push(
        secondAttacker.name + ' hat noch ' + pokemon2.hp + ' KP.'
      );

      // Überprüfe, ob das zweite Pokémon noch lebt
      if (pokemon2.hp <= 0) {
        break;
      }

      // Angriff des zweiten Angreifers
      const damage2 = calculateDamage(
        secondAttacker.attack,
        firstAttacker.defense
      );
      pokemon1.hp -= damage2;

      newBattleLog.push(
        secondAttacker.name + ' greift an und fügt ' + damage2 + ' Schaden zu.'
      );
      newBattleLog.push(
        firstAttacker.name + ' hat noch ' + pokemon1.hp + ' KP.'
      );
    }

    // Überprüfe, welches Pokémon gewonnen hat
    if (pokemon1.hp > 0) {
      newBattleLog.push(pokemon1.name + ' hat den Kampf gewonnen!');
    } else if (pokemon2.hp > 0) {
      newBattleLog.push(pokemon2.name + ' hat den Kampf gewonnen!');
    } else {
      newBattleLog.push('Es ist ein Unentschieden!');
    }

    setBattleLog(newBattleLog);
  }

  // Funktion, um einen neuen Kampf zu starten
  async function startNewBattle() {
    setPokemon1(getRandomPokemon());
    setPokemon2(getRandomPokemon());
    // setBattleLog([]);
  }

  if (Object.keys(pokemon1).length === 0 && Object.keys(pokemon2).length === 0)
    return <div>Loading...</div>;

  return (
    <div>
      <button onClick={simulateBattle}>Kampf starten</button>
      <button onClick={startNewBattle}>Neuer Kampf</button>

      {battleLog.map((log, index) => (
        <p key={index}>{log}</p>
      ))}

      <h2>Pokémon 1</h2>
      <p>Name: {pokemon1.name.english}</p>
      <p>Type: {pokemon1.type[0]}</p>
      <p>Speed: {pokemon1.base.Speed}</p>
      <p>HP: {pokemon1.base.HP}</p>
      <p>Attack: {pokemon1.base.Attack}</p>
      <p>Defense: {pokemon1.base.Defense}</p>
      <p>Speed Defense: {pokemon1.base['Sp. Defense']}</p>
      <p>Speed Attack: {pokemon1.base['Sp. Attack']}</p>

      <h2>Pokémon 2</h2>
      <p>Name: {pokemon2.name.english}</p>
      <p>Type: {pokemon2.type[0]}</p>
      <p>Speed: {pokemon2.Speed}</p>
      <p>HP: {pokemon2.hp}</p>
      <p>Attack: {pokemon2.base.Attack}</p>
      <p>Defense: {pokemon2.base.Defense}</p>
      <p>Speed Defense: {pokemon2.base['Sp. Defense']}</p>
      <p>Speed Attack: {pokemon2.base['Sp. Attack']}</p>
    </div>
  );
}
