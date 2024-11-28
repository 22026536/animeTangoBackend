import axios from "axios";
import Anime from "../../models/Anime.js";
import AnimeEpisode from "../../models/AnimeEpisode.js";
export const animeInfo = async (req, res) => {
    try {
        const { anime_id } = req.body; // Lấy anime_id từ request body

        if (!anime_id) {
            return res.status(400).json({ message: "anime_id is required" });
        }

        // Tìm anime theo Anime_id (số)
        const anime = await Anime.findOne({ Anime_id: anime_id });
        if (!anime) {
            return res.status(404).json({ message: "Anime not found" });
        }

        // Tìm danh sách các tập của anime
        const episodes = await AnimeEpisode.find({ Anime_id: anime_id }).sort({ Episode: 1 });

        // Trả về thông tin anime và danh sách tập
        return res.status(200).json({ anime, episodes });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const animeLastestEpisode = async (req, res) => {
    try {
        const response = await axios.post("https://animetangorecommendserver.onrender.com/lastestepisode", {
            n: req.body.n, // Số lượng gợi ý
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Lỗi khi lấy dữ liệu từ mô hình Python" });
    }
}

export const animeMostFavorites = async (req, res) => {
    try {
        const response = await axios.post("https://animetangorecommendserver.onrender.com/mostfavorites", {
            n: req.body.n, // Số lượng gợi ý
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Lỗi khi lấy dữ liệu từ mô hình Python" });
    }
}

export const animeSearch = async(req,res) =>{
    try {
        const response = await axios.post("https://animetangorecommendserver.onrender.com/search",req.body);

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Lỗi khi lấy dữ liệu từ mô hình Python" });
    }
}


export const animeUnfinished = async(req,res) =>{
    try {
        const response = await axios.post("https://animetangorecommendserver.onrender.com/unfinished",req.body);

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Lỗi khi lấy dữ liệu từ mô hình Python" });
    }
}