import React from 'react'
import './styleSheet.css'
import Button from '@material-ui/core/Button';
import PokemonCard from './PokemonCard';
import Pokedex from './Pokedex'

function PokemonInformation() {

    

    return (
        <div>
            <div className="encounterArea">
                <h1>Encounter</h1>
                <PokemonCard/>
                <Button variant="contained" className="button">Catch</Button>
            </div>

            <div className="pokedexArea">
                <Pokedex/>

            </div>
        </div>
    )
}

export default PokemonInformation
