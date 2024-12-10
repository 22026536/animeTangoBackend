import {
    GoogleGenerativeAI
} from "@google/generative-ai";

import dotenv from "dotenv";
// import filmInfoForAI from "../../middlewares/user/filmInfoForAI.js";
dotenv.config();
const k_f = `AIzaSyDMAZGz9V15KQcu90`
const k_s = `y2CzUozlvXdKsQ0js`
const k = k_f+k_s;
const genAI = new GoogleGenerativeAI(k);
// const filmInfo = filmInfoForAI()

const animeInfo = ""; // Toàn bộ dữ liệu anime
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "bạn là Lilia, tính cách nhiệt tình thích hỗ trợ bạn bè,là AI hỗ trợ tư vấn của trang học tiếng nhật qua anime Anime Tango"
        + `đây là thông tin về các anime: ${animeInfo}`
});

const generationConfig = {
    temperature: 0.7,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};
const chatBot = async (req, res) => {
    try {
        const chatSession = model.startChat({
            generationConfig,
            history: [
            ],
        });

        const prompt = req.body.message;

        const result = await chatSession.sendMessage(prompt);
        return res.json(result.response.text())
    } catch (error) {
        console.log(error)
        res.json("Xin lỗi hệ thống có chút vấn đề mong bạn thông cảm")
    }

}

export default chatBot