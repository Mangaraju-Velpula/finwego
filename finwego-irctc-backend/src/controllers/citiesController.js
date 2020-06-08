
import citiesService from '../services/CitiesService';
import * as _ from 'lodash';
const router = require('express').Router();
import { HTTP_STATUS, HTTP_RESPONSE } from '../common/rest';
import Response from '../common/Response';

const createCity = (req, res) => {
    if(!req.body) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(new Response(HTTP_RESPONSE.FAILED, "Name of city is mandatory"));
    }
    citiesService.createCity(req.body)
    .then((succuess)=> {
        res.status(HTTP_STATUS.OK).json(new Response(HTTP_RESPONSE.SUCCESS, req.body));
    }, error => {
        res.status(HTTP_STATUS.BAD_REQUEST).json(new Response(HTTP_RESPONSE.FAILED, error));
    })
};

const getCities = (req, res) => {
    citiesService.getCitites()
    .then((succuess)=> {
        console.log("success ", succuess);
        let cities = _.get(succuess,'hits.hits', []);
        console.log("fetchedCities ", cities);
        cities = _.map(cities, (city) => city._source);
        console.log("fetchedCities ", cities);
        res.status(HTTP_STATUS.OK).json(new Response(HTTP_RESPONSE.SUCCESS, cities));
    }, error => {
        res.status(HTTP_STATUS.BAD_REQUEST).json(new Response(HTTP_RESPONSE.FAILED, error));
    })
};

router.post('/', createCity);
router.get('/', getCities);

export default router;