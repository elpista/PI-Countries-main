import Card from './Card'
import Paginado from './Paginado'
import './Cards.css'

function Cards ({countries, page, setPage, order, filter}) {

    let shownCountries = [] //si no funciona, hacer un estado local
    let ordCountries = []
    let filtCountries = []

    if(countries !== 'Not Found') {

    if(filter.continent.length !== 0){
        if(filter.continent !== 'default') {

            countries.map(el => {
                if(el.continent === filter.continent) filtCountries.push(el)
            })

        } else filtCountries = countries
    } else filtCountries = countries

    let filtCountries2 = []
    
    if(filter.activity.length !== 0){
        if(filter.activity !== 'default') {

            filtCountries.map(el => {

                let verif = false

                for(let i = 0; i < el.TouristActivities.length; i++) {

                    if(el.TouristActivities[i].name === filter.activity) {
                        verif = true
                    }

                }

                if(verif === true)filtCountries2.push(el)
            })
        } else filtCountries2 = filtCountries
    } else filtCountries2 = filtCountries

    if(order === 'asc') {
        ordCountries = filtCountries2.sort(function (a,b) {
            if(a.name > b.name) {
                return 1
            }
            if(a.name < b.name){
                return -1
            }
            return 0
        })
    } 
    if(order === 'desc'){
        ordCountries = filtCountries2.sort(function (a,b) {
            if(a.name > b.name) {
                return -1
            }
            if(a.name < b.name){
                return 1
            }
            return 0
        })
    } 
    if(order === 'popular') {
        ordCountries = filtCountries2.sort(function (a,b) {
            if(a.population > b.population) {
                return -1
            }
            if(a.population < b.population){
                return 1
            }
            return 0
        })
    }
    if(order === 'unpopular'){
        ordCountries = filtCountries2.sort(function (a,b) {
            if(a.population > b.population) {
                return 1
            }
            if(a.population < b.population){
                return -1
            }
            return 0
        })
    }

    if(page === 1) {

        for(let i = 0; i < 9 ; i++) {
    
            if(ordCountries[i]) shownCountries.push(ordCountries[i])
            
        }

    } else {

        for(let i = 10*page-10-1; i < 10*page-1 ; i++) {
    
            if(ordCountries[i]) shownCountries.push(ordCountries[i])
            
        }

    }

    //probar de setear countries con los filtrados y ordenados
    //setCountries(shownCountries)

    function prevHandler () {

        let verif = false
    
        if(ordCountries[page-2] === undefined) verif = true

      console.log(verif)
        if(verif === false) {
          let aux = page-1
          setPage(aux)
        } 
      }
    
      function nextHandler () {

        let verif = false
    
        if(ordCountries[page*10] === undefined) verif = true

        console.log(verif)
        if(verif === false){
          let aux = page+1
          setPage(aux)
        } 
      }
        return (
            <div>
            <div className='cards'>
                {shownCountries.map(el => {

                    return (<Card
                    key={el.name}
                    name={el.name}
                    flag={el.flag}
                    continent={el.continent}
                    id={el.id}
                    numero={el.numero}
                    />)
                    
                })}
            </div>
            <div>
                <Paginado page={page} prevHandler={prevHandler} nextHandler={nextHandler}/>
            </div>
            </div>
        )
    } else {
        return (<h2> No se ha encontrado ningun resultado </h2>)
    }
}

export default Cards