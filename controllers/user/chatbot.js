import {
    GoogleGenerativeAI
} from "@google/generative-ai";

import dotenv from "dotenv";
// import filmInfoForAI from "../../middlewares/user/filmInfoForAI.js";
dotenv.config();
const k_f = `sk-WCSlVGKGVQe4cygymbzndozDmh1g03ybMM`
const k_s = `BpnoNQRXT3BlbkFJQaNV8Hab0fZREcFjgmnSBlKb78aLDX9BlwP1w0QXgA`
const k = k_f + k_s;
const genAI = new GoogleGenerativeAI(k);
// const filmInfo = filmInfoForAI()

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "bạn là Lilia, tính cách nhiệt tình thích hỗ trợ bạn bè,là AI hỗ trợ tư vấn của trang web đặt vé xem phim NHTT"
        + "đây là thông tin về phim Joker 2: Điên Có Đôi, tiêu đề phim :Joker 2: Điên Có Đôi đưa Arthur Fleck đến trại tâm thần Arkham trong khi chờ xét xử cho những tội ác của hắn với tư cách là Joker. Trong lúc vật lộn với hai bản ngã của mình, Arthur không chỉ tìm thấy tình yêu đích thực mà còn khám phá ra âm nhạc luôn tồn tại trong con người hắn.;giới hạn độ tuổi :18;thời lượng 138 phút;ngày chiếu: 2024-10-16; thể loại: Drama, Thriller,Crime" + "nếu người dùng không hỏi đúng chuyên môn những thông tin được cung cấp, hãy trả lời 'Xin lỗi câu hỏi này không thuộc lĩnh vực của mình xin thông cảm'. Hãy cố gắng đừng trả lời có thông tin nhạy cảm để tránh bị vi phạm SAFETY"
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
                // {
                //     role: "user",
                //     parts: [
                //         { text: "xin chào\n" },
                //     ],
                // },
                // {
                //     role: "model",
                //     parts: [
                //         { text: "Chào bạn! 👋  Rất vui được gặp bạn! Bạn muốn xem phim gì hôm nay? 😊  Hãy cho mình biết bạn muốn xem phim gì, ở đâu và vào thời gian nào, mình sẽ giúp bạn tìm vé phù hợp nhất! ✨\n" },
                //     ],
                // },
                // {
                //     role: "user",
                //     parts: [
                //         { text: "bạn tên là gì" },
                //     ],
                // },
                // {
                //     role: "model",
                //     parts: [
                //         { text: "À, mình quên giới thiệu bản thân! Mình là Lilia, trợ lý ảo của NHTT. 😊 Mình sẽ giúp bạn tìm vé xem phim, thông tin về suất chiếu, rạp chiếu phim và mọi thứ liên quan đến việc xem phim. 🎬  Bạn muốn tìm hiểu gì nào? \n" },
                //     ],
                // },
            ],
        });

        const prompt = req.body.message;

        const result = await chatSession.sendMessage(prompt);
        return res.json(result.response.text())
    } catch (error) {
        res.json("Xin lỗi hệ thống có chút vấn đề mong bạn thông cảm")
    }

}

export default chatBot