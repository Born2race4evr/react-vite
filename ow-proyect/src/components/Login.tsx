function Login(props) {
    const user = {
        name: "",
        email: ""
    }

    const setUserName = (e) => {
        user.name = e.target.value
    }

    const setEmail = (e) => {
        user.email = e.target.value
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(user)
        props.handleLogin(user)
    }

    return (
        <section>
            <h2>Pag Login</h2>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor="userName">Username</label>
                    <input type="text" id="userName" onChange={setUserName} />
                </fieldset>
                <fieldset>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" onChange={setEmail} />
                </fieldset>
                <button>Login</button>
            </form>
        </section>
    )
}

export default Login