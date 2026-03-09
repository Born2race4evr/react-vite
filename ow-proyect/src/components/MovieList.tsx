import { useEffect } from "react"

function MovieList() {
    const movies = ["Movie 1", "Movie 2", "Movie 3"]

    const HTMLMovies = movies.map((movie, index) => {
        return <li key={movie}>{index + 1} - {movie}</li>
    })

    useEffect(() => {
        console.log("MovieList Mounted")
    }, [])

    useEffect(() => {
        return () => {
            console.log("MovieList Unmounted")
        }
    }, [])

    return (
        <section>
            <h2>Movie List</h2>
            <ul>
                {HTMLMovies}
            </ul>
        </section>
    )
}

export default MovieList