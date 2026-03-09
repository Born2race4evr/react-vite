import { useQuery } from '@tanstack/react-query'
import { usePokemonStore } from "../store/pokemonStore"
import PokemonCard from "./PokemonCard"
import './PokemonList.css'
import GetForm from "./GetForm"

// Helper function to fetch a single pokemon
const fetchPokemon = async (index: number) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
    if (!response.ok) {
        throw new Error('Failed to fetch Pokémon data')
    }
    const data = await response.json()
    return data
}

function PokemonList() {
    // Get state directly from the Zustand store
    const fetchRange = usePokemonStore((state) => state.fetchRange)

    // TanStack Query to manage the fetching and caching
    const { data: pokemons, isLoading, isError, error } = useQuery({
        queryKey: ['pokemons', fetchRange.from, fetchRange.to],
        queryFn: async () => {
            const pkmnArr = []
            for (let i = fetchRange.from; i <= fetchRange.to; i++) {
                const pokemon = await fetchPokemon(i)
                pkmnArr.push(pokemon)
            }
            return pkmnArr
        }
    })

    const PokemonCards = pokemons?.map((pokemon: any) => {
        return <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
        ></PokemonCard>
    })

    return (
        <div>
            <GetForm></GetForm>

            {isLoading && <p style={{ color: 'white', textAlign: 'center' }}>Loading Pokémon data...</p>}
            {isError && <p style={{ color: 'var(--pokedex-red)', textAlign: 'center' }}>Error: {error?.message}</p>}

            {!isLoading && !isError && (
                <ul className="pokemon-list">
                    {PokemonCards}
                </ul>
            )}
        </div>
    )
}

export default PokemonList