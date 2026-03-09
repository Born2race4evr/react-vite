import { useState } from "react"
import { usePokemonStore } from "../store/pokemonStore"
import "./GetForm.css"

function GetForm() {
    const [from, setFrom] = useState(1)
    const [to, setTo] = useState(10)

    // Get function directly from store instead of props
    const setFetchRange = usePokemonStore((state) => state.setFetchRange)

    const handleFromInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFrom(Number(e.target.value))
    }

    const handleToInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTo(Number(e.target.value))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setFetchRange(from, to)
    }

    return (
        <form className="pokemon-form" onSubmit={handleSubmit}>
            <fieldset>
                <label htmlFor="from-pokemon">From</label>
                <input
                    type="number"
                    id="from-pokemon"
                    min="1"
                    onChange={handleFromInput} />
            </fieldset>
            <fieldset>
                <label htmlFor="to-pokemon">To</label>
                <input
                    type="number"
                    id="to-pokemon"
                    onChange={handleToInput} />
            </fieldset>
            <button className="submit-btn" type="submit">Submit</button>
        </form>
    )
}

export default GetForm