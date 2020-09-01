import React from 'react'
import './styleSheet.css'

function WildPokemonCard({ pokemon, equation }) {
    if(pokemon.id === undefined){
        return "Loading pokemons..."
    }
    return (
        <div className="encounterArea">
            <h1>Encounter</h1>
            <div className="pokemonCard">
                <h2 className="pokemonClass">{pokemon.name} {pokemon.id}</h2>
                <div className="pokemonImg">
                    <img alt="sprite" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} />
                    <div className="ellipse" />
                    <div className="speak">
                        <div className="box sb4">
                            {equation}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default WildPokemonCard
