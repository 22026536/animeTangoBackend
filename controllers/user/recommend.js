import axios from "axios";

export const recommendKNN = async (req, res) => {
    const anime_id = req.body.anime_id;
    const n = req.body.n;
    try {
        const response = await axios.post("https://animetangorecommendknn.onrender.com/", {
            anime_id: anime_id,
            n: n, // Số lượng gợi ý
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Lỗi khi lấy dữ liệu từ mô hình Python" });
    }
};

export const recommendDecisionTree = async (req, res) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.json({
            message: "Người dùng chưa đăng nhập",
            success: false
        })
    }

    if (isTokenExpired(token)) {
        res.json({
            message: "Người dùng hết phiên đăng nhập",
            success: false
        })
    }

    const decoded = verifyToken(token);

    const user_id = decoded.id


    const n = req.body.n;
    try {
        const response = await axios.post("https://animetangorecommenddecisiontree.onrender.com/", {
            user_id: user_id,
            n: n, // Số lượng gợi ý
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Lỗi khi lấy dữ liệu từ mô hình Python" });
    }
}

export const recommendNaiveBayes = async (req, res) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.json({
            message: "Người dùng chưa đăng nhập",
            success: false
        })
    }

    if (isTokenExpired(token)) {
        res.json({
            message: "Người dùng hết phiên đăng nhập",
            success: false
        })
    }

    const decoded = verifyToken(token);

    const user_id = decoded.id

    const n = req.body.n;
    try {
        const response = await axios.post("https://animetangorecommendnaivebayes.onrender.com/", {
            user_id: user_id,
            n: n, // Số lượng gợi ý
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Lỗi khi lấy dữ liệu từ mô hình Python" });
    }
}

export const recommendLastestEpisode = async (req, res) => {
    try {
        const response = await axios.post("https://animetangorecommend.onrender.com/lastestepisode", {
            user_id: user_id,
            n: n, // Số lượng gợi ý
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Lỗi khi lấy dữ liệu từ mô hình Python" });
    }
}