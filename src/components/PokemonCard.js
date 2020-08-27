import React, {useContext} from 'react'
import {wildPokemon}from './PokemonApiFetcher'
import './styleSheet.css'

function PokemonCard() {
    const pokemon = useContext(wildPokemon)
    return (
        <div className="pokemonCard">
            <h2 className="pokemonClass">{pokemon.name} {pokemon.id}</h2>
            <div className="pokemonImg">
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}/>
                <div className="ellipse"/>
            </div>
        </div>
    )
}

export default PokemonCard
