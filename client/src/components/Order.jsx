

function Order ({ordenar}) {



    return(
        <div>
            <h3>Orden</h3>
            <select onChange={(e) => ordenar(e)}>
                <option value='asc'>Orden: A - Z</option>
                <option value='desc'>Orden: Z - A</option>
                <option value='popular'>Mayor población</option>
                <option value='unpopular'>Menor población</option>
            </select>
        </div>
    )

}

export default Order