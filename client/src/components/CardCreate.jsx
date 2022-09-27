import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createActivity } from '../Redux/Actions'
//import { getCountries } from '../Redux/Actions';
import './CardCreate.css'

function CardCreate ({ countries}) {

    const [nameError, setNameError] = React.useState('Debes escribir un nombre')
    const [diffError, setDiffError] = React.useState('')
    const [durError, setDurError] = React.useState('')
    const [seasonError, setSeasonError] = React.useState('debes elegir una temporada')
    const [countError, setCountError] = React.useState('Debes elegir un país')
    const [error, setError] = React.useState('error')
    const [input, setInput] = React.useState({
        name: '', 
        difficulty: 0,
        duration: 0, 
        season: '', 
        countries: []
    })

    const c = useSelector(state => state.copyCountries)
    let dispatch = useDispatch()

    const onSubmit = (e) => {

        e.preventDefault()
        let activity = {...input}
        dispatch(createActivity(activity))
        for(let i = 0; i < countries.length; i++) {

            for(let j = 0; j < activity.countries.length; j++){

                //console.log(countries[i].id)
                //console.log(activity.countries[j])

                if(countries[i].id === activity.countries[j]){
                    countries[i].TouristActivities.push(activity)
                }

            }

        }
        console.log(countries)
        setInput({
            name: '', 
            difficulty: 0,
            duration: 0, 
            season: '', 
            countries: []
        })
        //dispatch(getCountries())
    }

    const handleOnChange = (e) => {

        if(e.target.name === 'name'){
            if(e.target.value.length === 0){
                setNameError('Debes escribir un nombre')
                setError('error')
            } else {
                setNameError('')
            }
        }
        if(e.target.name === 'difficulty'){
            if(e.target.value.length === 0){
                setDiffError('La dificultad no puede estar vacía')
                setError('error')
            } else if(isNaN(e.target.value)){
                setDiffError('la dificultad debe ser un número')
                setError('error')
            } else if(e.target.value > 5) {
                setDiffError('La dificultad no puede ser mayor a 5')
                setError('error')
            } else if(e.target.value < 0) {
                setDiffError('La dificultad no puede ser menor a 0')
                setError('error')
            } else {
                setDiffError('')
            }
        }
        if(e.target.name === 'duration'){
            if(e.target.value.length === 0){
                setDurError('La duración no puede estar vacía')
                setError('error')
            } else if(isNaN(e.target.value)){
                setDurError('La duración debe ser un número')
                setError('error')
            } else if(e.target.value < 0){
                setDurError('La duración no puede ser menor a 0')
                setError('error')
            } else setDurError('')
        }
        if(e.target.name === 'season'){
            if(e.target.value === 'default'){
                setSeasonError('Debes elegir una temporada')
                setError('error')
            } else setSeasonError('')
        }
        e.preventDefault()
        if(e.target.value !== 'default') {
            setInput((oldInput) => ({...oldInput, [e.target.name]:e.target.value}))
        }

    }

    const countriesChange = (e) => {

        if(e.target.checked){
            if(input.countries.length === 0){
                setInput((oldInput) => ({...oldInput, [e.target.name]:[e.target.id]}))
            } else {
                let aux = []
                aux = input.countries
                aux.push(e.target.id)
                setInput((oldInput) => ({...oldInput, [e.target.name]:aux}))
            }
        } else {
            let aux = input.countries
            let index = aux.indexOf(e.target.id)
            aux.splice(index,1)
            setInput((oldInput) => ({...oldInput, [e.target.name]:aux}))
        }
        
        if(input.countries.length === 0){
            if(!e.target.checked){
            setCountError('Debes elegir un país')
            setError('error')
            } else setCountError('')
        } 
    }

    useEffect(() => {

        if(nameError.length === 0) {
            if(diffError.length === 0) {
                if(durError.length === 0){
                    if(seasonError.length === 0){
                        if(countError.length === 0){
                            setError('')
                            console.log('setea el error')
                        }
                    }
                }
            }
        }
    
      },)

    

    return (
        <div>
            <h2> Crear una actividad turística </h2>
            <form onSubmit={onSubmit}>
                <div className='inputs'>
                    <input value={input.name} type='text' placeholder='Nombre' name='name' className={nameError && 'danger'} onChange={(e) => handleOnChange(e)}/>
                    {!nameError ? null : <p className='dangerMessage'>{nameError}</p>}
                    <h5 className='titles'> Dificultad </h5>
                    <input value={input.difficulty} type='number' min={0} max={5} name='difficulty' className={diffError && 'danger'} onChange={(e) => handleOnChange(e)}/>
                    {!diffError ? null : <p className='dangerMessage'>{diffError}</p>}
                    <h5 className='titles'> Duración (días)</h5>
                    <input value={input.duration} type='number' min={0} name='duration' className={durError && 'danger'} onChange={(e) => handleOnChange(e)}/>
                    {!durError ? null : <p className='dangerMessage'>{durError}</p>}
                    <h5 className='titles'> Temporada del año </h5>
                    <select name='season' id='temporada' className={seasonError && 'danger'} onChange={(e) => handleOnChange(e)}>
                        <option value='default'> Selecciona una opción </option>
                        <option value='Summer'>Summer</option>
                        <option value='Winter'>Winter</option>
                        <option value='Spring'>Spring</option>
                        <option value='Autumn'>Autumn</option>
                    </select>
                    {!seasonError ? null : <p className='dangerMessage'>{seasonError}</p>}
                    <h2 className='titles'> países </h2>
                    {c.map(el => {
                        return <label key={el.id} className='paises'><input type='checkbox' id={el.id} name='countries' onChange={(e) => countriesChange(e)}/>{el.name}</label>
                    })}
                    {!countError ? null : <p className='dangerMessage'>{countError}</p>}
                </div>
                <input type='submit' placeholder='Enviar' disabled={error && 'disabled'}/>
            </form>
        </div>
    )

}

export default CardCreate