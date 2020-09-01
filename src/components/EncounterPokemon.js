import React, { useState, useEffect, useRef } from 'react';
import WildPokemonCard from './WildPokemonCard'
import './styleSheet.css'





function EncounterPokemon({ pokeDex, setPokeDex, count, loaded }) {

    const [wildPokemon, setWildPokemon] = useState({})
    const [equation, setequation] = useState({})
    

    const inputRef = useRef(null)

    useEffect(() => {
        if (loaded){
            EncounterNewPokemon()
        }
        
    }, [loaded])

    useEffect(() => {
        const timer = setTimeout(() => {
            catchPokemon()
        }, 3000 +(count*100));
        return () => clearTimeout(timer);
    }, [wildPokemon,count]);


    

    function EncounterNewPokemon() {
        getMathFunction()
        var randomNum = (Math.floor(Math.random() * 151) + 1)
        var encountered = pokeDex.find(pokemonList => pokemonList.id === randomNum)

        while (encountered.isCaught){
            console.log(encountered)
            console.log("The encountered Pokemon has already been caught, reroll.")
            randomNum = (Math.floor(Math.random() * 151) + 1)
            encountered = pokeDex.find(pokemonList => pokemonList.id === randomNum)
        }
       
        setWildPokemon(encountered)
        
    }

  
    

    //Get Math function to solve
    const getMathFunction = () => {
        resetFieldFocusInput()
        
        const val1 = Math.floor(Math.random() * 2) + count
        const val2 = Math.floor(Math.random() * 2) + count
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
        if (document.getElementById('textfield').value == equation.summary) {
            
            pokeDex.find(pokemonList => pokemonList.id === wildPokemon.id).isCaught = true
            setPokeDex([...pokeDex])
            console.log("Catched Pokemon!")

        }
        
        EncounterNewPokemon()
       

    }


    return (
        <div className="main">
            
            <WildPokemonCard pokemon={wildPokemon} equation={equation.string}  />
            

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
