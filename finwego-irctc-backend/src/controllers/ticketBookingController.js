const router = require('express').Router();
import * as _ from 'lodash';
import { HTTP_STATUS, HTTP_RESPONSE } from '../common/rest';
import Response from '../common/Response';
import bookingService from '../services/ticketBookingService';

const bookTicket = (req, res) => {
    if(!req.body) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(new Response(HTTP_RESPONSE.FAILED, "Request body is empty"));
    }
    bookingService.bookTicket(req.body)
    .then((success)=> {
        res.status(HTTP_STATUS.OK).json(new Response(HTTP_RESPONSE.SUCCESS, req.body));
    }, error => {
        res.status(HTTP_STATUS.BAD_REQUEST).json(new Response(HTTP_RESPONSE.FAILED, error));
    })
};

const cancelTicket = (req, res) => {
    if(!req.body) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(new Response(HTTP_RESPONSE.FAILED, "Request body is empty"));
    }
    bookingService.cancelTicket(req.body)
    .then((success)=> {
        res.status(HTTP_STATUS.OK).json(new Response(HTTP_RESPONSE.SUCCESS, "Ticket cancellation successfull "));
    }, error => {
        res.status(HTTP_STATUS.BAD_REQUEST).json(new Response(HTTP_RESPONSE.FAILED, error));
    })
};
const getBookingByUser = (req, res) => {
    bookingService.userBookingHistory(req.params.userId)
    .then((success)=> {
        const bookingHistory = _.get(success, 'hits.hits', {});
        const response = bookingHistory.map((booking)=>{
            return booking._source;
        })
        res.status(HTTP_STATUS.OK).json(new Response(HTTP_RESPONSE.SUCCESS, response));
    }, error => {
        res.status(HTTP_STATUS.BAD_REQUEST).json(new Response(HTTP_RESPONSE.FAILED, error));
    })
};

router.post('/', bookTicket);
router.post('/cancel', cancelTicket);
router.get('/history/user/:userId', getBookingByUser);

export default router;