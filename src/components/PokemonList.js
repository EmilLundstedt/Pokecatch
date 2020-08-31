import React, { useState, useEffect } from 'react'
import axios from 'axios';
import EncounterPokemon from './EncounterPokemon'
import './styleSheet.css'
import PokeDex from './Pokedex'

function PokemonList() {
    const [pokeDex, setPokeDex] = useState([])
    const [count, setCount] = useState(0)
    const [display, setDisplay] = useState(true);

    useEffect(() => {

        createPokeDex()

    }, [])

    useEffect(() => {

        for (var i = 0; i < pokeDex.length; i++) {
            if (pokeDex[i].isCaught.toString() === "true") {
                setCount(count + 1)
            }
        }

    }, [pokeDex])

    // API call to fetch the pokemons---
    const createPokeDex = () => {
        
        const addToPokeDex = (newObj) => setPokeDex(pokeDex => [...pokeDex, newObj])
        let id = 0;
        axios
            .get('https://pokeapi.co/api/v2/pokemon?limit=151')
            .then(response => {
                response.data.results.map((pokemon) => {
                    id++;
                    const newObj = { id: id, name: pokemon.name, isCaught: false }
                    return addToPokeDex(newObj)
                })
            })
    }

    //Map through PokeDex and list them as items.
    const listPokemons = () => {
        const listItems = pokeDex.map((pokemon) => (
            <div className="pokedexCard" key={pokemon.id}>
                <div className={pokemon.isCaught.toString()}>
                    <h3>{pokemon.name} </h3>
                    <img alt="sprite" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} />
                </div>
            </div>
        ));
        return listItems
    }


    return (
        <div>
            <EncounterPokemon pokeDex={pokeDex} setPokeDex={setPokeDex} count={count} />
        
            <div className="container">
            <h1> {count} / 152 </h1>
                <div>
                    <button className="button" onClick={() => setDisplay(!display)}> Toggle PokeDex</button>
                    
                </div>
                 {display? <PokeDex list={listPokemons()}/> : ""}
            </div>
           
            
        </div>
    )
}

export default PokemonList
