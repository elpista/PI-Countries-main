import {BrowserRouter as Router, NavLink} from 'react-router-dom'
import './Card.css'

function Card ({name, flag, continent, id, numero}) {

    return (
        <div className='card'>
            <Router>
                <NavLink to={`/CardInfo/${id}`}><img src={flag}/></NavLink>
                <NavLink to={`/CardInfo/${id}`} className='nombreJuego'><h3>{name}</h3></NavLink>
                <p className='continente'>{continent}</p>
                <p>Numero: {numero}</p>
            </Router>
        </div>
    )

}

export default Card