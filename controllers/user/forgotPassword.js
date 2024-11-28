import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import nodemailer from 'nodemailer';
import User from '../../models/User.js'; // Mongoose User model
dotenv.config();

export const forgotPassword = async (req, res) => {
    try {
        const userEmail = req.body.gmail;

        // Generate a random verification token
        const token = Math.floor(10000 + Math.random() * 90000).toString();
        const expireToken = new Date(Date.now() + 600000);
        const hashedToken = await bcryptjs.hash(token, 11);

        // Check if the user exists
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({
                message: 'Không tìm thấy người dùng',
                success: false
            });
        }

        // Update user's reset token and expiration
        user.reset_token = hashedToken;
        user.reset_token_expire = expireToken;
        await user.save();

        // Send verification email
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: true,
            service: 'gmail',
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.MY_EMAIL,
            to: userEmail,
            subject: 'Mã xác thực đặt lại mật khẩu',
            text: `Mã xác thực của bạn là: ${token}. Mã này sẽ hết hạn trong 10 phút.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.json({
                    message: error.message,
                    success: false
                });
            }
            req.session.userEmail = userEmail;
            return res.json({
                message: 'Mã xác thực đã được gửi đến email của bạn!',
                success: true
            });
        });
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
};

export const forgotPasswordCheck = async (req, res) => {
    try {
        const userEmail = req.session.userEmail; // Retrieve email from session
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.json({
                message: "Không tìm thấy người dùng",
                success: false
            });
        }

        // Check token expiration
        const expireToken = new Date(user.reset_token_expire);
        if (new Date() > expireToken) {
            return res.json({ message: "Mã xác thực đã hết hạn", success: false });
        }

        // Compare tokens
        const isMatch = await bcryptjs.compare(req.body.token, user.reset_token);
        if (!isMatch) {
            return res.json({
                message: "Mã xác thực không đúng",
                success: false
            });
        }

        return res.json({
            message: "Mã xác thực chính xác",
            success: true
        });
    } catch (error) {
        return res.json({ message: error.message, success: false });
    }
};

export const forgotPasswordChangePassword = async (req, res) => {
    try {
        const newPassword = req.body.password;
        const reNewPassword = req.body.rePassword;
        
        if (newPassword !== reNewPassword) {
            return res.json({
                message: "nhập lại mật khẩu sai",
                success: false
            });
        }

        const userEmail = req.session.userEmail; // Retrieve email from session
        const hashedPassword = await bcryptjs.hash(newPassword, 11);

        const user = await User.findOneAndUpdate(
            { email: userEmail },
            { password: hashedPassword, reset_token: null, reset_token_expire: null },
            { new: true }
        );

        if (!user) {
            return res.json({
                message: "Không tìm thấy người dùng",
                success: false
            });
        }

        res.json({
            message: "Đổi mật khẩu thành công",
            success: true
        });
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
};