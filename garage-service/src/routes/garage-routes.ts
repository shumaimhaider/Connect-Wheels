import controller from "../controller/garage-controller";
import { createGarageValidator } from '../validator/garage-validator';

const router = require('express').Router();


//Protected routes
router.post('/create-garage', [createGarageValidator], controller.createGarage);


export default router;