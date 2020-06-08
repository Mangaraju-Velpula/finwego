
import citiesRouter from './citiesController';
import trainsRouter from './trainsController';
import bookingRouter from './ticketBookingController';

const router = require('express').Router();

router.use('/cities/', citiesRouter);
router.use('/trains/', trainsRouter);
router.use('/booking/', bookingRouter);

export default router;
