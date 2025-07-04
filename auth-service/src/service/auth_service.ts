import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import speakeasy from "speakeasy";
import QRCode from "qrcode";

import { AppDataSource } from "../data_source";
import { User } from "../entity/User";


const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret';

const registerUser = async (username: string, password: string) => {
    try {
        const userModel = AppDataSource.getRepository(User);
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await userModel.save({
            username,
            passwordHash,
            role: 'user'
        });
        return { message: "Registered Successfully", userId: user?.id };
    } catch (error) {
        console.error(error);
        return { message: "error registering user", error: error };
    }
};


// Login a user and check if user is registered for TOPT if not then issue jwt token
 const loginUser = async (username: string, password: string, otp: string) => {
    try {
        const userRepository = AppDataSource.getRepository(User);

        // Cheroleck if the user exists
        const user = await userRepository.findOne({ where: { username } });
        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user?.passwordHash);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        // Check for TOPT registered
        if (user.totpSecret) {
            if (!otp) {
                throw new Error('OTP is required');
            }

            // Verify the OTP
            const isValidOTP = await verifyOTP(otp, user.totpSecret);
            if (!isValidOTP) {
                throw new Error('Invalid OTP');
            }
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        return { message: 'Login successful', token };
    } catch (error) {
        console.log(error)
        return { message: false, error: error }
    }
};


// Setup TOTP for a user (Generate secret & QR Code)
 const setupTOTP = async (userID: string) => {
    try {
        const userModel = AppDataSource.getRepository(User);
        const user = await userModel.findOne({ where: { id: userID } });
        if (!user) {
            throw new Error('User not found')
        }

        // Generate TOTP secret for the user
        const secret = speakeasy.generateSecret({ length: 20 });
        user.setTOTP(secret.base32)
        await userModel.save(user);

        // Generate QR code URL
        const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url!);

        return {
            secret: secret.base32,
            qrCode: qrCodeUrl,
        };
    } catch (error) {
        console.error('TOTP setup error:', error)
        return { message: 'TOTP setup error', error: error };
    }
};

// Verify OTP for a user
 const verifyOTPForTOTP = async (userID: string, token: string) => {
    try {
        const userModel = AppDataSource.getRepository(User);
        const user = await userModel.findOne({ where: { id: userID } });
        if (!user || !user.totpSecret) {
            throw new Error('TOTP is not set up');

        }
        const isValidOTP = await verifyOTP(token, user.totpSecret);

        if (!isValidOTP) {
            throw new Error('Invalid OTP');
        }

        return { message: 'OTP verified successfully' };
    } catch (error) {
        console.error('OTP verification error:', error);
        return { message: 'error otp  verification', error: error };
    }
};

const verifyOTP = async (otp: string, secret: string): Promise<boolean> => {
    try {
        return speakeasy.totp.verify({
            secret,
            encoding: 'base32',
            token: otp,
            window: 1
        });
    } catch (error) {
        console.error('OTP verification error:', error);
        return false;
    }
};



const authService = {
    registerUser,
    loginUser,
    verifyOTPForTOTP,
    setupTOTP
};


export default authService;
