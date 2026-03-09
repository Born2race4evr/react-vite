import { useEffect, useState } from 'react'
import './App.css'
import ButtonComponent from './components/ButtonComponent'
import HeaderComponent from './components/HeaderComponent'
import Login from './components/Login'
import MovieList from './components/MovieList'
import AnimalList from './components/AnimalList'
import MemeList from './components/MemeList'

function App() {

  // let number = 0
  const [number, setNumber] = useState(0)
  const [myValue, setMyValue] = useState("")
  let myPlaceHolder = "Escribe algo"

  const [greetings, setGreetings] = useState("Holiii")
  const links = {
    home: "Home",
    about: "About",
    contact: "Contact"
  }

  const condition = true

  const [user, setUser] = useState({})

  // useEffect(() => {
  //   console.log("Componente montado")
  // }, [])

  useEffect(() => {
    console.log("Ejecución con cada cambio de user")
  }, [user])

  const [showMovies, setShowMovies] = useState(true)

  const login = (userInfo) => {
    console.log(userInfo)
    setUser(userInfo)
  }

  const addOne = () => {
    // number++
    setNumber(number + 1)
    console.log(number)
  }

  const sayHello = () => {
    alert('Hello')
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
  }
  return (
    <>
      <HeaderComponent greetings={greetings} links={links}></HeaderComponent>

      <main className='main-container'>
        <h2 onClick={addOne}>Number: {number}</h2>

        <MovieList></MovieList>

        <AnimalList></AnimalList>

        <MemeList></MemeList>

        {user.name && <p onClick={sayHello}>Hola {user.name}</p>}

        <Login handleLogin={login}></Login>

        <button onClick={() => setShowMovies(!showMovies)}>Toggle Movies</button>

        {showMovies && <MovieList></MovieList>}

        {showMovies && <p>Condicion Cumplida</p>}
        {!showMovies && <p>Condicion Incumplida</p>}

        {showMovies ? (<p>Condicion Cumplida</p>) : (<p>Condicion Incumplida</p>)}

        <input value={myValue} placeholder={myPlaceHolder} type="text" onChange={handleInputChange} />

        <br /><br />

        <ButtonComponent></ButtonComponent>
      </main>
    </>
  )
}

export default App
