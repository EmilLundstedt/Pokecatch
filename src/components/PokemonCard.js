import React, {useContext} from 'react'
import {UserContext}from './PokemonApiFetcher'
import './styleSheet.css'

function PokemonCard() {
    const pokemon = useContext(UserContext)
    return (
        <div className="pokemonCard">
            <h2 className="pokemonClass">{pokemon.name}</h2>
            <div className="pokemonImg">
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}/>
                <div className="ellipse"/>
            </div>
        </div>
    )
}

export default PokemonCard
