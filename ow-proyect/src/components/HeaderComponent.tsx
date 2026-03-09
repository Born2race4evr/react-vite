import './HeaderComponent.css'

function HeaderComponent(props) {
    const { greetings, links } = props

    return (
        <>
            <header className='header-container'>
                <h1 className='header-title'>{greetings}</h1>
                <nav>
                    <ul className='header-list'>
                        <li><a className='header-link' href="">{links.home}</a></li>
                        <li><a className='header-link' href="">{links.about}</a></li>
                        <li><a className='header-link' href="">{links.contact}</a></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default HeaderComponent