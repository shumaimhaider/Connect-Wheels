import controller from "../controller/auth_controller";
import { loginValidator, registerValidator } from "../auth-middleware/auth_validator";

const router = require('express').Router();

//public routes
router.post('/register', registerValidator, controller.registerUser);
router.post('/login', loginValidator, controller.loginUser);


export default router;