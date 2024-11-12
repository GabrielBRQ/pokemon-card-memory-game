import React, { useState, useEffect } from 'react';

const Content = ({score, setScore, bestScore, setBestScore}) => {
  const [pokemons, setPokemons] = useState([]);
  const [clickedPokemons, setClickedPokemons] = useState([]);

  const addScore = () => {
    setScore(score + 1);
  };

  const resetScore = () => {
    setScore(0);
  }

  useEffect(() => {
    if (clickedPokemons.length > 0) {
      setScore(clickedPokemons.length);
      if (clickedPokemons.length > bestScore) {
        setBestScore(clickedPokemons.length);
      }
    }
  }, [clickedPokemons, bestScore, setScore, setBestScore]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        // Requisição para obter a lista dos primeiros 10 Pokémon
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
        const data = await response.json();

        const pokemonData = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const pokeDetails = await res.json();
            return {
              name: pokeDetails.name,
              image: pokeDetails.sprites.front_default,
              id: pokeDetails.id,
            };
          })
        );

        setPokemons(shuffleArray(pokemonData));
      } catch (error) {
        console.error('Erro ao buscar Pokémon:', error);
      }
    };

    fetchPokemons();
  }, []);

  // Função para embaralhar o array de Pokémon
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handlePokemonClick = (id) => {
    setClickedPokemons((prevClicked) => {
      if (!prevClicked.includes(id)) {
        return [...prevClicked, id];
      } else {
        resetScore();
        return [];
      }
    });
  
    setPokemons((prevPokemons) => shuffleArray([...prevPokemons]));
  };
  
  return (
    <div>
      <div className="pokemons-div">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            style={{ margin: '10px', textAlign: 'center', cursor: 'pointer' }}
            onClick={() => handlePokemonClick(pokemon.id)}
          >
            <img src={pokemon.image} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Content;