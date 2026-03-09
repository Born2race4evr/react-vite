import { usePokemonStore } from './store/pokemonStore'
import './App.css'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails'

function App() {
  const selectedPokemon = usePokemonStore((state) => state.selectedPokemon)

  return (
    <>
      {/* Team Rocket Logo - Outside the main Pokedex container on the left */}
      <div className="rocket-logo-left">R</div>

      <div className="app-container">
        <h1 className="app-title">Pokédex</h1>

        <div className="pokedex-layout">
          <div className="left-panel">
            {selectedPokemon ? (
              <PokemonDetails pokemon={selectedPokemon}></PokemonDetails>
            ) : (
              <div className="placeholder-details">
                <h2>Select a<br />Pokémon</h2>
                <div className="pokeball-spinner"></div>
              </div>
            )}
          </div>

          <div className="right-panel">
            <h2 className="section-title">Pokémon List</h2>
            <PokemonList></PokemonList>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
