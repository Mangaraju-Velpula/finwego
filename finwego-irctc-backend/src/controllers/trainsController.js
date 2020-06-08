const router = require('express').Router();
import { HTTP_STATUS, HTTP_RESPONSE } from '../common/rest';
import Response from '../common/Response';
import trainsService from '../services/trainsService';
import * as _ from 'lodash';

const createTrain = (req, res) => {
    if(!req.body) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(new Response(HTTP_RESPONSE.FAILED, "Name of city is mandatory"));
    }
    trainsService.createTrain(req.body)
    .then((success)=> {
        res.status(HTTP_STATUS.OK).json(new Response(HTTP_RESPONSE.SUCCESS, req.body));
    }, error => {
        res.status(HTTP_STATUS.BAD_REQUEST).json(new Response(HTTP_RESPONSE.FAILED, error));
    })
};

const updateTrain = (req, res) => {
    if(!req.body) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(new Response(HTTP_RESPONSE.FAILED, "Name of city is mandatory"));
    }
    trainsService.updateTrain(req.params.id, req.body)
    .then((success)=> {
        res.status(HTTP_STATUS.OK).json(new Response(HTTP_RESPONSE.SUCCESS, req.body));
    }, error => {
        res.status(HTTP_STATUS.BAD_REQUEST).json(new Response(HTTP_RESPONSE.FAILED, error));
    })
}

const deleteTrain = (req, res) => {
    if(!req.body) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(new Response(HTTP_RESPONSE.FAILED, "Name of city is mandatory"));
    }
    trainsService.deleteTrain(req.params.id)
    .then((success)=> {
        res.status(HTTP_STATUS.OK).json(new Response(HTTP_RESPONSE.SUCCESS, "Train details deleted successfully"));
    }, error => {
        res.status(HTTP_STATUS.BAD_REQUEST).json(new Response(HTTP_RESPONSE.FAILED, error));
    })
}

const getTrain = (req, res) => {
    if(!req.body) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(new Response(HTTP_RESPONSE.FAILED, "Name of city is mandatory"));
    }
    trainsService.getTrain(req.params.id)
    .then((success)=> {
        const trainInfo = _.get(success, 'hits.hits[0]._source', {});//success.hits.hits[0];
        if(trainInfo) {
            res.status(HTTP_STATUS.OK).json(new Response(HTTP_RESPONSE.SUCCESS, trainInfo));
        } else {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new Response(HTTP_RESPONSE.FAILED, error));
        }
    }, error => {
        res.status(HTTP_STATUS.BAD_REQUEST).json(new Response(HTTP_RESPONSE.FAILED, error));
    })
}

const getTrains = (req, res) => {
    if(!req.body) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(new Response(HTTP_RESPONSE.FAILED, "Name of city is mandatory"));
    }
    trainsService.getTrains(req.body)
    .then((success)=> {
        let trainInfo = _.get(success, 'hits.hits', []);//success.hits.hits[0];
        trainInfo = _.map(trainInfo, train => train._source);
        if(trainInfo) {
            res.status(HTTP_STATUS.OK).json(new Response(HTTP_RESPONSE.SUCCESS, trainInfo));
        } else {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new Response(HTTP_RESPONSE.FAILED, error));
        }
    }, error => {
        res.status(HTTP_STATUS.BAD_REQUEST).json(new Response(HTTP_RESPONSE.FAILED, error));
    })
};

const getAllTrains = (req, res) => {
    trainsService.getAllTrains(req.body)
    .then((success)=> {
        let trainInfo = _.get(success, 'hits.hits', []);//success.hits.hits[0];
        trainInfo = _.map(trainInfo, train => train._source);
        console.log("Train Info ", trainInfo);
        if(trainInfo) {
            res.status(HTTP_STATUS.OK).json(new Response(HTTP_RESPONSE.SUCCESS, trainInfo));
        } else {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new Response(HTTP_RESPONSE.FAILED, error));
        }
    }, error => {
        res.status(HTTP_STATUS.BAD_REQUEST).json(new Response(HTTP_RESPONSE.FAILED, error));
    })
};


router.post('/', createTrain);
router.put('/:id', updateTrain);
router.delete('/:id', deleteTrain);
router.get('/:id', getTrain);
router.post('/between', getTrains)
router.get('/', getAllTrains);

export default router;