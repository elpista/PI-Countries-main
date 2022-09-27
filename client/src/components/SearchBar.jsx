import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { searchCountry } from "../Redux/Actions"


function SearchBar ({setCountries, setPage}) {

    const [input, setInput] = useState('')
    let dispatch = useDispatch()

    const handleChange = (e) => {

        setInput(e.target.value)

    }

    let c = useSelector(state => state.countries)

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            setPage(1)
            dispatch(searchCountry(input))
            setCountries(c)
        }}>
        <input
            key='buscador'
            type='text'
            placeholder="Buscar país"
            onChange={handleChange}
            value={input}
        />
        <input
            type='submit'
            value='buscar'
        />
        </form>
    )

}

export default SearchBar