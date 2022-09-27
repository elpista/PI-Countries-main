import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getCountries } from './Redux/Actions';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import CardInfo from './components/CardInfo'
import SearchBar from './components/SearchBar'
import Cards from './components/Cards'
import CardCreate from './components/CardCreate'
import Order from './components/Order'
import Filters from './components/Filters'

function App() {

  const [countries, setCountries] = useState([])
  const [page, setPage] = useState(1)
  const [order, setOrder] = useState('asc')
  const [filter, setFilter] = useState({continent: '', activity: ''})

  let dispatch = useDispatch()

  useEffect(() => {

    dispatch(getCountries())
    dispatch(getCountries())

  }, [])

  const c = useSelector(state => state.countries)
  let activities = useSelector(state => state.activities)

    useEffect(() => {
  
      setCountries(c)
  
    },)



  function ordenar (e) {

    if(e.target.value === 'asc'){
      if(order !== 'asc') setOrder('asc')
    }
    if(e.target.value === 'desc'){
      if(order !== 'desc') setOrder('desc')
    }
    if(e.target.value === 'popular'){
      if(order !== 'popular') setOrder('popular')
    }
    if(e.target.value === 'unpopular'){
      if(order !== 'unpopular') setOrder('unpopular')
    }
  }

  function filtrar (e) {

    setFilter((oldInput) => ({...oldInput, [e.target.name]: e.target.value}))
    setPage(1)

  }

  return (
    <div className="App">
      <Router>
        <Route exact path='/'>
          <Link to='/Home' className='homeLinking'> <h3> Ir a Home </h3></Link>
        </Route>
        <Route path='/CardInfo/:id' component={CardInfo}/>
        <Route exact path='/Home/CreateActivity'> <CardCreate countries={countries} setCountries={setCountries}/> </Route>
        <Route exact path='/Home'>
          <SearchBar setCountries={setCountries} setPage={setPage}/>
          <Link to='/Home/CreateActivity'> <h2> Crear actividad turística </h2> </Link>
          <Cards countries={countries} page={page} setPage={setPage} order={order} filter={filter}/>
          <div className='sortFilter'>
          <Order ordenar={ordenar}/>
          <Filters countries={countries} activities={activities} filtrar={filtrar}/>
          </div>
        </Route>
      </Router>
    </div>
  );
}

export default App;
