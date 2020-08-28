import React from 'react'
import './styleSheet.css'

import PokemonCard from './PokemonCard';


function PokemonInformation() {



    return (
        <div>
            <div className="encounterArea">
                <h1>Encounter</h1>
                <PokemonCard />

            </div>

            <div className="pokedexArea">


            </div>
        </div>
    )
}

export default PokemonInformation
