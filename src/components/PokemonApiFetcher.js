import React, {useState, useEffect} from 'react'
import axios from 'axios'
import PokemonInformation from './PokemonInformation'

export const UserContext = React.createContext()

function PokemonApiFetcher() {

    const [pokeDex, setPokeDex] = useState([{}])
    let id = 0;

    const fetchPokedex = () => {
        
        axios   
            .get('https://pokeapi.co/api/v2/pokemon?limit=151')
            .then(response => {
                response.data.results.map((pokemon)=> {
                    id = id + 1;
                   
                    return setPokeDex([...pokeDex, {id: id, name: pokemon.name, isCaught: false}])
                   
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

        fetchPokedex()
        console.log(pokeDex)
       }, [])
   
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
   

    
    return (
        <div>
            <UserContext.Provider value={pokemon}>
                <PokemonInformation/>
                
            </UserContext.Provider>
        </div>
    )
}

export default PokemonApiFetcher
