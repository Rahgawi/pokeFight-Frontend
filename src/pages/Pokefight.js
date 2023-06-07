import React, { useState, useEffect } from 'react';
import {
  Button,
  Typography,
  Grid,
  Container,
  Box,
  CssBaseline,
  Paper,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export default function Pokefight() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  useEffect(() => {
    console.log(isMobile);
  }, [isMobile]);

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
    const fetchUrl = `${process.env.REACT_APP_POKE_API}/pokemon/${id}`;
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
  const [winner, setWinner] = useState({});
  const [rounds, setRounds] = useState(0);
  const [isGameDone, setIsGameDone] = useState(false);

  useEffect(() => {
    startNewBattle();
  }, []);

  useEffect(() => {
    console.log('POKEMON 1: ', pokemon1);
  }, [pokemon1]);

  useEffect(() => {
    console.log('POKEMON 2: ', pokemon2);
  }, [pokemon2]);

  useEffect(() => {
    console.log('ROUNDS: ', rounds);
  }, [rounds]);

  useEffect(() => {
    console.log('isGameDone: ', isGameDone);
    if (isGameDone) {
      const saveGame = async () => {
        const saveUrl = `${process.env.REACT_APP_POKE_API}/game/save`;
        const data = {
          pokemon1: { id: pokemon1.id, name: pokemon1.name.english },
          pokemon2: { id: pokemon2.id, name: pokemon2.name.english },
          winner: { id: winner.id, name: winner.name.english },
          rounds: rounds,
        };

        console.log('data: ', data);

        try {
          const response = await fetch(saveUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          return response.json();
        } catch (error) {
          console.error(error);
        }
      };

      saveGame();
    }
  }, [isGameDone]);

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

    let rounds = 0;

    // Kampf-Schleife bis eines der Pokémon keine HP mehr hat
    while (firstAttacker.base.HP > 0 && secondAttacker.base.HP > 0) {
      rounds++;

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
      setWinner(firstAttacker);
    } else if (secondAttacker.base.HP > 0) {
      newBattleLog.push(secondAttacker.name.english + ' wins the fight!');
      setWinner(secondAttacker);
    } else {
      newBattleLog.push('It is a draw!');
      setWinner({ id: 0, name: { english: 'DRAW' } });
    }

    newBattleLog.push('Rounds: ' + rounds);
    setRounds(rounds);

    setBattleLog(newBattleLog);
    setIsGameDone(true);
  }

  // Funktion, um einen neuen Kampf zu starten
  async function startNewBattle() {
    setPokemon1(await getRandomPokemon());
    setPokemon2(await getRandomPokemon());
    setBattleLog(['Click START FIGHT!']);
    setIsGameDone(false);
  }

  // if (Object.keys(pokemon1).length === 0 || Object.keys(pokemon2).length === 0)
  //   return <div>Loading...</div>;

  return (
    <div>
      <CssBaseline />

      <Container
        maxWidth={false}
        sx={{
          backgroundColor: 'secondary.blue',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'fit-content',
          width: '100%',
          pt: 5,
        }}>
        <Box
          component="div"
          sx={{
            backgroundColor: 'secondary.blue',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pt: isMobile ? 5 : 0,
          }}>
          <Button
            onClick={simulateBattle}
            sx={{ marginRight: 2 }}
            color="primary"
            variant="contained">
            Start Fight
          </Button>
          <Button
            onClick={startNewBattle}
            sx={{ mr: 2, color: 'primary.main' }}
            variant="outlined">
            New Fight
          </Button>
          <Link to="../pokemon/leaderboard">
            <Button sx={{ color: 'secondary.main' }}>Leaderboard</Button>
          </Link>
        </Box>
      </Container>

      <Container
        maxWidth="x1"
        sx={{
          backgroundColor: 'secondary.blue',
          p: 0,
          display: 'flex',
          // width: '100%',
          // flexDirection: isMobile ? 'colu'
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Container
          maxWidth={false}
          sx={{
            display: 'flex',
            p: isMobile ? 2 : 5,
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'center',
            alignItems: isMobile ? 'center' : 'flex-start',
          }}>
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              ml: 0,
              mr: 0,
              width: 'auto',
            }}>
            <Typography
              variant="gameHeader"
              color="primary"
              pb={1}
              align="center">
              Your Pokémon
            </Typography>

            <Paper
              elevation={10}
              sx={{ backgroundColor: 'primary.dark', p: 1 }}>
              <Box
                component="div"
                np
                sx={{
                  ml: 5,
                  pl: 10,
                  p: 5,
                  width: 500,
                  display: 'flex',
                  height: 'fit-content',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'primary.dark',
                  boxSizing: 'border-box',
                }}>
                <Paper
                  elevation={0}
                  sx={{ backgroundColor: 'primary.dark', p: 1 }}>
                  <Grid
                    container
                    spacing={1}
                    justifyContent="center"
                    alignItems="center"
                    p={0}>
                    <Grid item xs={5}>
                      <Paper
                        elevation={3}
                        sx={{
                          backgroundColor: 'primary.dark',
                          pl: 1,
                          pr: 1,
                        }}>
                        <Typography variant="gameStatsWhite">Name: </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={7}>
                      <Paper
                        elevation={3}
                        sx={{
                          backgroundColor: 'secondary.main',
                          pl: 1,
                          pr: 1,
                        }}>
                        <Typography variant="gameStats">
                          {pokemon1.name?.english}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={5}>
                      <Paper
                        elevation={3}
                        sx={{
                          backgroundColor: 'primary.dark',
                          pl: 1,
                          pr: 1,
                        }}>
                        <Typography variant="gameStatsWhite">Type: </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={7}>
                      <Paper
                        elevation={3}
                        sx={{
                          backgroundColor: 'secondary.main',
                          pl: 1,
                          pr: 1,
                        }}>
                        <Typography variant="gameStats">
                          {pokemon1.type?.[0]}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={5}>
                      <Paper
                        elevation={3}
                        sx={{
                          backgroundColor: 'primary.dark',
                          pl: 1,
                          pr: 1,
                        }}>
                        <Typography variant="gameStatsWhite">Speed:</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={7}>
                      <Paper
                        elevation={3}
                        sx={{
                          backgroundColor: 'secondary.main',
                          pl: 1,
                          pr: 1,
                        }}>
                        <Typography variant="gameStats">
                          {pokemon1.base?.Speed}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={5}>
                      <Paper
                        elevation={3}
                        sx={{
                          backgroundColor: 'primary.dark',
                          pl: 1,
                          pr: 1,
                        }}>
                        <Typography variant="gameStatsWhite">HP:</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={7}>
                      <Paper
                        elevation={3}
                        sx={{
                          backgroundColor: 'secondary.main',
                          pl: 1,
                          pr: 1,
                        }}>
                        <Typography variant="gameStats">
                          {Math.max(0, pokemon1.base?.HP)}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={5}>
                      <Paper
                        elevation={3}
                        sx={{
                          backgroundColor: 'primary.dark',
                          pl: 1,
                          pr: 1,
                        }}>
                        <Typography variant="gameStatsWhite">
                          Attack:
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={7}>
                      <Paper
                        elevation={3}
                        sx={{
                          backgroundColor: 'secondary.main',
                          pl: 1,
                          pr: 1,
                        }}>
                        <Typography variant="gameStats">
                          {pokemon1.base?.Attack}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={5}>
                      <Paper
                        elevation={3}
                        sx={{
                          backgroundColor: 'primary.dark',
                          pl: 1,
                          pr: 1,
                        }}>
                        <Typography variant="gameStatsWhite">
                          Defense:
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={7}>
                      <Paper
                        elevation={3}
                        sx={{
                          backgroundColor: 'secondary.main',
                          pl: 1,
                          pr: 1,
                        }}>
                        <Typography variant="gameStats">
                          {pokemon1.base?.Defense}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={5}>
                      <Paper
                        elevation={3}
                        sx={{
                          backgroundColor: 'primary.dark',
                          pl: 1,
                          pr: 1,
                        }}>
                        <Typography variant="gameStatsWhite">
                          Speed Defense:
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={7}>
                      <Paper
                        elevation={3}
                        sx={{
                          backgroundColor: 'secondary.main',
                          pl: 1,
                          pr: 1,
                        }}>
                        <Typography variant="gameStats">
                          {pokemon1.base?.['Sp. Defense']}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={5}>
                      <Paper
                        elevation={3}
                        sx={{
                          backgroundColor: 'primary.dark',
                          pl: 1,
                          pr: 1,
                        }}>
                        <Typography variant="gameStatsWhite">
                          Speed Attack:
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={7}>
                      <Paper
                        elevation={3}
                        sx={{
                          backgroundColor: 'secondary.main',
                          pl: 1,
                          pr: 1,
                        }}>
                        <Typography variant="gameStats">
                          {pokemon1.base?.['Sp. Attack']}
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Paper>
                <Box
                  component="img"
                  justifyContent="center"
                  alignItems="center"
                  width={200}
                  // sx={{ pl: 10 }}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon1?.id}.png`}
                  alt={`${pokemon1.name?.english} Image`}
                />
              </Box>
            </Paper>
          </Container>
          <Container
            maxWidth={false}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              ml: 0,
              mr: 0,
              width: 'auto',
            }}>
            <Typography variant="gameHeader" color="whitesmoke" pb={1}>
              Fight
            </Typography>
            <Paper elevation={20} sx={{ backgroundColor: 'primary.dark' }}>
              <Box
                sx={{
                  width: 400,
                  height: 'fit-content',
                  backgroundColor: 'primary.dark',
                  p: 5,
                }}>
                <Grid
                  container
                  spacing={1}
                  sx={{
                    mb: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: 2,
                  }}>
                  {battleLog.map((log, index) => {
                    let bgColor = 'secondary.blue';
                    if (index == 0 || index == battleLog.length) {
                      bgColor = 'primary.main';
                    }
                    if (battleLog[0] !== 'Click START FIGHT!') {
                      return (
                        <Paper
                          elevation={10}
                          sx={{ backgroundColor: `${bgColor}` }}>
                          <Grid item xs={12} sx={{ m: 1 }}>
                            <Typography variant="gameStatsWhite" align="center">
                              <p key={index}>{log}</p>
                            </Typography>
                          </Grid>
                        </Paper>
                      );
                    } else
                      return (
                        <Button
                          onClick={simulateBattle}
                          color="primary"
                          variant="contained">
                          <Grid item xs={12} sx={{ m: 1 }}>
                            <Typography
                              variant="gameHeader"
                              color="secondary"
                              align="center">
                              START FIGHT!
                            </Typography>
                          </Grid>
                        </Button>
                      );
                  })}
                </Grid>
              </Box>
            </Paper>
          </Container>

          <Container
            maxWidth={false}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: 'auto',
              pt: isMobile ? 5 : 0,
              // flexGrow: '0',
              // flexShrink: '0',
            }}>
            <Typography variant="gameHeader" color="secondary" pb={1}>
              Their Pokémon
            </Typography>
            <Paper elevation={10} sx={{ backgroundColor: 'secondary.dark' }}>
              <Box
                component="div"
                sx={{
                  p: 5,
                  width: '70%',
                  display: 'flex',
                  height: 'fit-content',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'secondary.dark',
                }}>
                <Box
                  component="img"
                  justifyContent="center"
                  alignItems="center"
                  width={200}
                  sx={{ mr: 2 }}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon2?.id}.png`}
                  alt={`${pokemon2.name?.english} Image`}
                />
                <Grid
                  container
                  spacing={1}
                  justifyContent="center"
                  alignItems="center"
                  p={0}
                  sx={{ minWidth: 200 }}>
                  <Grid item xs={5}>
                    <Paper
                      elevation={3}
                      sx={{
                        backgroundColor: 'primary.dark',
                        pl: 1,
                        pr: 1,
                      }}>
                      <Typography variant="gameStatsWhite">Name: </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={7}>
                    <Paper
                      elevation={3}
                      sx={{
                        backgroundColor: 'secondary.main',
                        pl: 1,
                        pr: 1,
                      }}>
                      <Typography variant="gameStats">
                        {pokemon2.name?.english}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={5}>
                    <Paper
                      elevation={3}
                      sx={{
                        backgroundColor: 'primary.dark',
                        pl: 1,
                        pr: 1,
                      }}>
                      <Typography variant="gameStatsWhite">Type: </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={7}>
                    <Paper
                      elevation={3}
                      sx={{
                        backgroundColor: 'secondary.main',
                        pl: 1,
                        pr: 1,
                      }}>
                      <Typography variant="gameStats">
                        {pokemon2.type?.[0]}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={5}>
                    <Paper
                      elevation={3}
                      sx={{
                        backgroundColor: 'primary.dark',
                        pl: 1,
                        pr: 1,
                      }}>
                      <Typography variant="gameStatsWhite">Speed:</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={7}>
                    <Paper
                      elevation={3}
                      sx={{
                        backgroundColor: 'secondary.main',
                        pl: 1,
                        pr: 1,
                      }}>
                      <Typography variant="gameStats">
                        {pokemon2.base?.Speed}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={5}>
                    <Paper
                      elevation={3}
                      sx={{
                        backgroundColor: 'primary.dark',
                        pl: 1,
                        pr: 1,
                      }}>
                      <Typography variant="gameStatsWhite">HP:</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={7}>
                    <Paper
                      elevation={3}
                      sx={{
                        backgroundColor: 'secondary.main',
                        pl: 1,
                        pr: 1,
                      }}>
                      <Typography variant="gameStats">
                        {Math.max(0, pokemon2.base?.HP)}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={5}>
                    <Paper
                      elevation={3}
                      sx={{
                        backgroundColor: 'primary.dark',
                        pl: 1,
                        pr: 1,
                      }}>
                      <Typography variant="gameStatsWhite">Attack:</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={7}>
                    <Paper
                      elevation={3}
                      sx={{
                        backgroundColor: 'secondary.main',
                        pl: 1,
                        pr: 1,
                      }}>
                      <Typography variant="gameStats">
                        {pokemon2.base?.Attack}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={5}>
                    <Paper
                      elevation={3}
                      sx={{
                        backgroundColor: 'primary.dark',
                        pl: 1,
                        pr: 1,
                      }}>
                      <Typography variant="gameStatsWhite">Defense:</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={7}>
                    <Paper
                      elevation={3}
                      sx={{
                        backgroundColor: 'secondary.main',
                        pl: 1,
                        pr: 1,
                      }}>
                      <Typography variant="gameStats">
                        {pokemon2.base?.Defense}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={5}>
                    <Paper
                      elevation={3}
                      sx={{
                        backgroundColor: 'primary.dark',
                        pl: 1,
                        pr: 1,
                      }}>
                      <Typography variant="gameStatsWhite">
                        Speed Defense:
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={7}>
                    <Paper
                      elevation={3}
                      sx={{
                        backgroundColor: 'secondary.main',
                        pl: 1,
                        pr: 1,
                      }}>
                      <Typography variant="gameStats">
                        {pokemon2.base?.['Sp. Defense']}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={5}>
                    <Paper
                      elevation={3}
                      sx={{
                        backgroundColor: 'primary.dark',
                        pl: 1,
                        pr: 1,
                      }}>
                      <Typography variant="gameStatsWhite">
                        Speed Attack:
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={7}>
                    <Paper
                      elevation={3}
                      sx={{
                        backgroundColor: 'secondary.main',
                        pl: 1,
                        pr: 1,
                      }}>
                      <Typography variant="gameStats">
                        {pokemon2.base?.['Sp. Attack']}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Container>
        </Container>
      </Container>
    </div>
  );
}
