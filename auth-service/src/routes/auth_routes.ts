import middleware from "../auth-middleware/auth_middleware";
import controller from "../controller/auth_controller";
import { loginValidator, registerValidator, twoFASetupValidator, twoFAVarifyValidator } from "../auth-middleware/auth_validator";

const router = require('express').Router();

//public routes
router.post('/register', registerValidator, controller.registerUser);
router.post('/login', loginValidator, controller.loginUser);

//Protected routes
router.post('/2fa/setup', [middleware.authenticateJWT, twoFASetupValidator], controller.setupTOTP);
router.post('/2fa/verify', [middleware.authenticateJWT, twoFAVarifyValidator], controller.verifyOTPForTOTP);


export default router;