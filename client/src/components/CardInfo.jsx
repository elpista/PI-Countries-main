import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { infoCountry } from "../Redux/Actions";
import './CardInfo.css'


function CardInfo () {

    let {id} = useParams()
    let dispatch = useDispatch()
    const [country, setCountry] = useState([])

    useEffect(() => {

        dispatch(infoCountry(id))

    }, [])

    const c = useSelector(state => state.country)

    useEffect(() => {

        setCountry(c)

    })

    if(country.name !== undefined) {
        if(country.TouristActivities.length === 0) {
            return(
            <div>
                <h3>{country.name}</h3>
                <img src={country.flag}/>
                <p> ID: {country.id}</p>
                <p>Continente: {country.continent}</p>
                <p>Capital: {country.capital}</p>
                <p>subregión: {country.subregion}</p>
                <p>Area: {country.area}km²</p>
                <p>Población: {country.population} Habitantes</p>
                <p>Numero: {country.numero}</p>
            </div>
        )
        } else {
            return(
                <div>
                    <h3>{country.name}</h3>
                    <img src={country.flag}/>
                    <p> ID: {country.id}</p>
                    <p>Continente: {country.continent}</p>
                    <p>Capital: {country.capital}</p>
                    <p>subregión: {country.subregion}</p>
                    <p>Area: {country.area}km²</p>
                    <p>Población: {country.population} Habitantes</p>
                    <p>Numero: {country.numero}</p>
                    <h2>Actividades turísticas</h2>
                    {country.TouristActivities.map(el => {
                        return (
                        <div className="actividades">
                            <h3>{el.name}</h3>
                            <p>Dificultad: {el.difficulty}</p>
                            <p>Duración: {el.duration} días</p>
                            <p>Temporada: {el.season}</p>
                        </div>
                        )
                    })}
                </div>
            )
        }
        
    } else {return (<h2> Cargando... </h2>)}

}

export default CardInfo;