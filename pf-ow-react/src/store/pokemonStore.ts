import { create } from 'zustand'

interface FetchRange {
    from: number
    to: number
}

interface PokemonStore {
    fetchRange: FetchRange
    selectedPokemon: any | null
    setFetchRange: (from: number, to: number) => void
    setSelectedPokemon: (pokemon: any) => void
}

export const usePokemonStore = create<PokemonStore>((set) => ({
    fetchRange: { from: 1, to: 9 }, // Default range
    selectedPokemon: null,
    setFetchRange: (from, to) => set({ fetchRange: { from, to } }),
    setSelectedPokemon: (pokemon) => set({ selectedPokemon: pokemon }),
}))
