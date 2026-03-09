function AnimalList() {
    const animals = [
        {
            id: 1,
            name: "dog",
            age: 2
        },
        {
            id: 2,
            name: "cat",
            age: 3
        },
        {
            id: 3,
            name: "bird",
            age: 4
        }
    ]

    const HTMLAnimals = animals.map((animal) => {
        return (<li key={animal.id}>
            <h3>{animal.name}</h3>
            <p>{animal.age}</p>
        </li>)
    })

    return (
        <section>
            <h2>Animal List</h2>
            <ul>
                {HTMLAnimals}
            </ul>
        </section>
    )
}

export default AnimalList