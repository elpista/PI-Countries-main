const { Router } = require('express');
const { Country, TouristActivity} = require('../db.js')
const axios = require('axios');
//const { extensions } = require('sequelize/types/utils/validator-extras.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/countries', async (req, res) => {

    let {name} = req.query

    let aux = []
    aux = await Country.findAll({include: TouristActivity})

    if(aux.length === 0) {
        let paises = []
        paises = await axios.get('https://restcountries.com/v3/all')
        let paisesOrd = []
        paises.data.map(e => {
            let numero = Math.floor(Math.random()*100)
            let object = {
                id: e.cca3,
                name: e.name.common,
                flag: e.flags[1],
                continent: e.continents[0],
                subregion: e.subregion,
                area: e.area,
                population: e.population,
                numero: numero
            }
            if(e.capital) {
                object['capital'] = e.capital[0]
            }
            // agregar las activities
            paisesOrd.push(object)
        })
        const countryDB = await Country.bulkCreate(paisesOrd)
        res.json(countryDB)
    } else {

        if(name) {
            try{
            let busqueda = await axios.get(`https://restcountries.com/v3/name/${name}`)
            let paisesOrd = []
            busqueda.data.map(e => {
                let object = {
                    id: e.cca3,
                    name: e.name.common,
                    flag: e.flags[1],
                    continent: e.continents[0],
                    subregion: e.subregion,
                    area: e.area,
                    population: e.population
                }
                if(e.capital) {
                    object['capital'] = e.capital[0]
                }
                // agregar las activities
                paisesOrd.push(object)
            })
            for(let i = 0; i < paisesOrd.length; i++) {
                let busquedaDb = await Country.findOne({where: {name: paisesOrd[i].name}, include: TouristActivity})
                console.log(busquedaDb.dataValues.TouristActivities)
                paisesOrd[i]['TouristActivities'] = busquedaDb.dataValues.TouristActivities
            }
            res.status(200).json(paisesOrd)
        } catch(error){
            res.status(404).json('Not Found')
        }
        } else {

        res.status(200).json(aux)

        }
    }
})

router.get('/countries/:idCountry', async (req,res) => {

    let {idCountry} = req.params
    if(idCountry) {

        let busquedaDb = await Country.findOne({where: {id: idCountry}, include: TouristActivity})

        if(busquedaDb.dataValues) {

            res.status(200).json(busquedaDb.dataValues)

        } else{

            res.status(404).send('tenes que colocar un ID valido')
            
        }

    } else{
        res.status(404).send('tenes que colocar un ID')
    }
    
})

router.post('/activities', async (req, res) => {

    let {name, difficulty, duration, season, countries} = req.body
    //countries debe ser un array

    try{

        let newActivity = await TouristActivity.create({name, difficulty, duration, season})
        await newActivity.addCountry(countries)
        activityCountries = await TouristActivity.findAll({where: {name: newActivity.name}, include: Country})
        res.status(200).json(activityCountries)

    } catch(e) {

        console.log('error')
        res.status(404).send(e)

    }
})

module.exports = router;
