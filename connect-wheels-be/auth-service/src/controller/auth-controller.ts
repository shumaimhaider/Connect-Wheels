import { Request, Response } from "express";
import { validationResult } from "express-validator";

import authService from "../service/auth_service";
import {
  handleGoogleCallback as processGoogleCallback,
  getGoogleAuthUrl as generateGoogleAuthUrl,
} from "../service/google-oauth";

const registerUser = async (req: Request, res: Response) => {
  // Validation request inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, password } = req.body;

  try {
    const result = await authService.registerUser(username, password);
    return res
      .status(201)
      .json({ message: result.message, userId: result.userId });
  } catch (error) {
    console.error("register user", error);
    return res
      .status(500)
      .json({ message: "error registering user", error: error });
  }
};

const loginUser = async (req: Request, res: Response) => {
  // Validation request inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, password, otp } = req.body;

  try {
    const result = await authService.loginUser(username, password, otp);
    return res
      .status(200)
      .json({ message: result.message, token: result.token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "error login user", error: error });
  }
};

// Google OAuth - Get authorization URL
const getGoogleAuthUrl = async (req: Request, res: Response) => {
  try {
    const authUrl = generateGoogleAuthUrl();
    res.json({ authUrl });
  } catch (error) {
    console.error("Google auth URL error:", error);
    res.status(500).json({ error: "Failed to generate Google auth URL" });
  }
};

// Google OAuth - Handle callback
const handleGoogleCallback = async (req: Request, res: Response) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({ error: "Authorization code is required" });
    }

    const result = await processGoogleCallback(code as string);
    const jwt = authService.generateJWT(result.user);

    // Redirect to frontend with token and user data
    res.redirect(
      `http://localhost:5173/?token=${jwt}&userId=${result.user.id}&email=${result.user.email}`
    );
  } catch (error) {
    console.error('Google callback error:', error);
    res.redirect(
      `http://localhost:5173/?message=${encodeURIComponent('Google authentication failed')}`
    );
  }
};

const Authcontroller = {
  registerUser,
  loginUser,
  getGoogleAuthUrl,
  handleGoogleCallback
};

export default Authcontroller;
