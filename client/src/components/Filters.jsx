

function Filters ({countries, activities, filtrar}) {

    let aux = []

    if(countries !== 'Not Found') {

    countries.map(el => {

        let V = false

        for(var i = 0; i < aux.length; i++) {

            if(aux[i] === el.continent) V = true

        }

        if(V === false) aux.push(el.continent)

    })

    return(
        <div>
            <h3>Filtros</h3>
            <select name='continent' onChange={(e) => filtrar(e)}>
                <option value='default'>Selecciona un continente</option>
                {aux.map(el => {return(<option key={el} value={el}>{el}</option>)})}
            </select>
            <select name='activity' onChange={(e) => filtrar(e)}>
                <option value='default'>Selecciona una actividad</option>
                {activities.map(el => {return(<option key={el.name} value={el.name}>{el.name}</option>)})}
            </select>
        </div>
    )
    } else{
        return<p> Error </p>
    }
}

export default Filters