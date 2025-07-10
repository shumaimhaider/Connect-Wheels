import controller from "../controller/user-contoller";
import { deleteUserValidator } from "../validators/user-validator";

const router = require('express').Router();

router.delete('/delete-user', deleteUserValidator, controller.deleteUserByID);

export default router;