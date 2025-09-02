import controller from "../controller/garage-controller";
import { createGarageValidator } from '../validator/garage-validator';
import {authenticateJWT} from '../../../common/auth-middleware/auth_middleware'

const router = require('express').Router();


//Protected routes
router.post('/create-garage', [authenticateJWT, createGarageValidator], controller.createGarage);


export default router;