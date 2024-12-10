import axios from 'axios';
import { isTokenExpired, verifyToken } from '../../middlewares/JWT.js';

export const recommendDecisionTreeUser = async (req, res) => {
    try {
        // Lấy token từ body
        const token = req.body.jwt;
        if (!token) {
            return res.json({
                message: "Người dùng chưa đăng nhập",
                success: false
            });
        }

        // Kiểm tra xem token có hết hạn không
        if (isTokenExpired(token)) {
            return res.json({
                message: "Người dùng hết phiên đăng nhập",
                success: false
            });
        }

        // Giải mã token để lấy thông tin người dùng
        const decoded = verifyToken(token);
        const user_id = decoded.id;

        // Gửi yêu cầu POST đến API bên ngoài để nhận thông tin người dùng
        const response = await axios.post('https://animetangorecommenddecisiontree.com/', { user_id: user_id });

            return res.json({
                message: "Lấy thông tin người dùng thành công",
                success: true,
                data: response.data
            });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
