import React, {useState, useEffect} from 'react'
import axios from 'axios'
import PokemonInformation from './PokemonInformation'
import Pokedex from './Pokedex'

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
  
    
    
    const [catched, setCatched] = useState([])
    const [pokemon, setPokemon] = useState({})
    const [trainer, setTrainer] = useState({})
    
    useEffect(() => {

     encounterPokemon()
        
    }, [])

    useEffect(() => {

        fetchPokeDex()
       
       },[] )
   

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
            <div>
                <h3>{pokemon.name} </h3> 
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}/>
            </div>
             
    </div>);  


    return (
        <div>
            <wildPokemon.Provider value={pokemon}>
                <PokemonInformation/>
            </wildPokemon.Provider>
            <div className="pokedex">{listItems}</div>
            <pokeDexInfo.Provider value={[pokeDex]}>
                <Pokedex />
            </pokeDexInfo.Provider>
            
        </div>
    )
}

export default PokemonApiFetcher
