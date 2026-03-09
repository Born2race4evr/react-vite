import { useEffect, useState } from "react"
import './MemeList.css'
import axios from "axios"

function MemeList() {
    const [memes, setMemes] = useState([])

    const HTMLMemes = memes.map((meme) => {
        return (
            <li key={meme.id}>
                <h2>{meme.name}</h2>
                <img src={meme.url} alt={meme.name} className="meme-image" />
            </li>
        )
    })

    // useEffect(() => {
    //     fetch("https://api.imgflip.com/get_memes")
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log(data.data.memes)
    //             setMemes(data.data.memes)
    //         })
    // }, [])

    useEffect(() => {
        axios.get("https://api.imgflip.com/get_memes")
            .then((res) => {
                console.log(res.data.data.memes)
                setMemes(res.data.data.memes)
            })
    }, [])

    return (
        <ul className="meme-list">
            {HTMLMemes}
        </ul>
    )
}

export default MemeList