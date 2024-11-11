import React, { useState, useEffect } from 'react';

const Content = () => {
  const [pokemons, setPokemons] = useState([]);

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
            };
          })
        );
        setPokemons(pokemonData);
      } catch (error) {
        console.error('Erro ao buscar Pokémon:', error);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <div>
      <h1>Lista de Pokémon</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {pokemons.map((pokemon, index) => (
          <div key={index} style={{ margin: '10px', textAlign: 'center' }}>
            <img src={pokemon.image} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;