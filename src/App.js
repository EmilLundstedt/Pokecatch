import React from 'react';
import logo from './logo.svg';
import './App.css';
import PokemonApiFetcher from './components/PokemonApiFetcher';

function App() {
  return (
    <div className="App">
      <PokemonApiFetcher/>
    </div>
  );
}

export default App;
