import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import WildPokemonCard from './WildPokemonCard'
import './styleSheet.css'





function EncounterPokemon({ pokeDex, setPokeDex, count }) {

    const [wildPokemon, setWildPokemon] = useState({})
    const [equation, setequation] = useState({})
    

    const inputRef = useRef(null)

    useEffect(() => {

        encounterWildPokemon()

    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            catchPokemon()
        }, 5000 +(count*100));
        return () => clearTimeout(timer);
    }, [wildPokemon,count]);


    // API call to Encounter random wild Pokemon---
    function encounterWildPokemon() {


        getMathFunction()
        axios
            .get('https://pokeapi.co/api/v2/pokemon/' + (Math.floor(Math.random() * 151) + 1))
            .then(response => {
               
                setWildPokemon(response.data)
                
               
            })
            
    }


    

    //Get Math function to solve
    const getMathFunction = () => {
        resetFieldFocusInput()
        
        const val1 = Math.floor(Math.random() * (5)) + count
        const val2 = Math.floor(Math.random() * 5) + count
        const summary = val1 + val2;
        setequation({ string: val1 + "+" + val2, summary: summary })

    }


    //Reset field and focus input
    const resetFieldFocusInput = () => {
        document.getElementById('textfield').value = null;
        inputRef.current.focus()
    }

    // on Catch functionality
    const catchPokemon = () => {
        if (document.getElementById("textfield").value.toString() === equation.summary.toString()) {
          
            
            pokeDex.find(pokemonList => pokemonList.id === wildPokemon.id).isCaught = true
            setPokeDex([...pokeDex])
           

        }
        
        encounterWildPokemon()
        getMathFunction()

    }


    return (
        <div className="main">
            
            <WildPokemonCard pokemon={wildPokemon} equation={equation.string} />
            

            <div className="equationField">
                <h2>
                    <input autoComplete="off" ref={inputRef} className="texfield" id="textfield" />
                </h2>
            </div>
            <button className="button" onClick={catchPokemon}>CATCH</button>

        </div>
    )
}

export default EncounterPokemon
