import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import PokemonInformation from './PokemonInformation'
import Pokedex from './Pokedex'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MathInfo from './MathInfo';

export const wildPokemon = React.createContext()
export const pokeDexInfo = React.createContext()

function PokemonApiFetcher() {

    
    
const [pokeDex, setPokeDex] = useState([])


    const fetchPokeDex = () => {
        const addPokedex = (newObj) => setPokeDex(pokeDex => [...pokeDex, newObj])
        let id = 0;
        axios   
            .get('https://pokeapi.co/api/v2/pokemon?limit=151')
            .then(response => {
                response.data.results.map((pokemon)=> {
                    id ++;
                    const newObj = {id: id, name: pokemon.name, isCaught: false}
                   
                   
                    return addPokedex(newObj)
                   
                   
                })
            })
            
    }
  
    
    const [equation, setequation] = useState({})
    const [guess, setGuess] = useState(false)
    const [pokemon, setPokemon] = useState({})
    const [trainer, setTrainer] = useState({})
   
    const inputRef = useRef(null)

    useEffect(() => {

     encounterPokemon()
     getMathFunction()
     
    
    }, [])

    useEffect(() => {

        fetchPokeDex()
       
       },[] )
   
    useEffect(() => {
        const timer = setTimeout(() => {
            encounterPokemon()
            getMathFunction()
            console.log("Pokemon Fled!")
        }, 5000);
        return () => clearTimeout(timer);
    }, [pokemon]);
     

    const randomPokemon = () => {
        return Math.floor(Math.random() * 151) + 1
    }

    const encounterPokemon = () => {
      
        axios
            .get('https://pokeapi.co/api/v2/pokemon/' + randomPokemon())
            .then(response => {
                setPokemon(response.data)
            })
           
    }
   
    
    const listItems = pokeDex.map((pokemon) => 
        
        <div className="pokedexCard">
            <div className={pokemon.isCaught.toString()}>
                <h3>{pokemon.name} </h3> 
                
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}/>
            </div>
             
    </div>);  

const catchPokemon = () => {
    
    inputRef.current.focus()
    
    console.log(document.getElementById("textfield").value)
    console.log(equation.summary)

    if (document.getElementById("textfield").value == equation.summary){
    let targetedPokemon = pokeDex.find(p=> p.id == pokemon.id);
    targetedPokemon.isCaught = true;
    pokeDex.splice(pokemon.id,0)
    

    }
        
        encounterPokemon()
        getMathFunction()
        
    

    
    
    
}

const countPokemons = () => {
    var count = 0;
    for (var i = 0; i < pokeDex.length; i++){
        if(pokeDex[i].isCaught.toString() == "true"){
            count++
        }
    }
    return count
}
const getMathFunction = () => {
    document.getElementById( 'textfield').value = null;
    const val1 = Math.floor(Math.random() * 10) + 1
    const val2 = Math.floor(Math.random() * 10) + 1
    const summary = val1 * val2;
    setequation({string: val1 +"*"+ val2, summary: summary})
    
    
}


   
    return (
        <div>
            <wildPokemon.Provider value={pokemon}>
                <PokemonInformation/>
                <div class="equationField">
                    <h2> {equation.string + "= "} <input ref={inputRef} class="texfield" id="textfield"></input> </h2>
                </div>        
                <Button variant="contained" className="button" onClick={catchPokemon}>Catch</Button>
            </wildPokemon.Provider>
            <div>
                 {countPokemons() + "/ 152"}
                 
            </div>
           <div className="pokedex">{listItems}</div>
           
            
            
        </div>
    )
}

export default PokemonApiFetcher
