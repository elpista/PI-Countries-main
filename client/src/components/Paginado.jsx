import './Paginado.css'

function Paginado ({page, prevHandler, nextHandler}) {

    return(
    <div>
        <h3 className='pagina'> Pagina: {page}</h3>
        <button onClick={prevHandler}>Prev page</button>
        <button onClick={nextHandler}>Next page</button>
    </div>
    )

}

export default Paginado