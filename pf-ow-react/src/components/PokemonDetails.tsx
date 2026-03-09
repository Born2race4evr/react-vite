import './PokemonDetails.css'

function PokemonDetails(props: any) {
    const { pokemon } = props

    return (
        <section className="selected-pokemon" key={pokemon.id}>
            <div className="pokemon-details-card">
                <h2 className="details-name">{pokemon.name}</h2>
                <div className="img-container">
                    <img
                        src={pokemon.sprites.front_default}
                        alt="pokemon img"
                        className="details-img"
                    />
                </div>

                <div className="stats-container">
                    <div className="stat-row">
                        <span className="stat-label">HP</span>
                        <span className="stat-val">{pokemon.stats[0].base_stat}</span>
                    </div>
                    <div className="stat-row">
                        <span className="stat-label">ATK</span>
                        <span className="stat-val">{pokemon.stats[1].base_stat}</span>
                    </div>
                    <div className="stat-row">
                        <span className="stat-label">DEF</span>
                        <span className="stat-val">{pokemon.stats[2].base_stat}</span>
                    </div>
                    <div className="stat-row">
                        <span className="stat-label">Sp.A</span>
                        <span className="stat-val">{pokemon.stats[3].base_stat}</span>
                    </div>
                    <div className="stat-row">
                        <span className="stat-label">Sp.D</span>
                        <span className="stat-val">{pokemon.stats[4].base_stat}</span>
                    </div>
                    <div className="stat-row">
                        <span className="stat-label">SPD</span>
                        <span className="stat-val">{pokemon.stats[5].base_stat}</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PokemonDetails