import { usePokemonStore } from "../store/pokemonStore"
import "./PokemonCard.css"

interface PokemonCardProps {
    pokemon: any;
}

function PokemonCard(props: PokemonCardProps) {
    const { pokemon } = props
    const setSelectedPokemon = usePokemonStore((state) => state.setSelectedPokemon)

    return (
        pokemon.id ? (
            <li className="pokemon-card" onClick={() => setSelectedPokemon(pokemon)}>
                <h2 className="pokemon-name">{pokemon.name}</h2>
                <img
                    src={pokemon.sprites?.front_default}
                    alt={pokemon.name}
                    className="pokemon-img"
                />
                <h3 className="text">HP: {pokemon.stats?.[0]?.base_stat}</h3>
            </li>
        ) : (
            <p className="loading">Loading...</p>
        )
    )
}

export default PokemonCard