const UserHistory = require('../../models/UserHistory.js');
const UserAnime = require('../../models/UserAnime.js');

export const userWatch = async (req, res) => {
    const { user_id, anime_id, episode_id, isLastEpisode } = req.body;

    if (!user_id || !anime_id || !episode_id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const currentTime = new Date();

        // **1. Cập nhật hoặc thêm UserHistory**
        let userHistory = await UserHistory.findOne({ User_id: user_id, Anime_id: anime_id, Episode_id: episode_id });
        if (!userHistory) {
            // Nếu chưa tồn tại, thêm mới
            userHistory = new UserHistory({
                User_id: user_id,
                Anime_id: anime_id,
                Episode_id: episode_id,
                Comment: null,
                TimeWatches: currentTime
            });
            await userHistory.save();
        } else {
            // Nếu đã tồn tại, cập nhật thời gian
            userHistory.TimeWatches = currentTime;
            await userHistory.save();
        }

        // **2. Cập nhật hoặc thêm UserAnime**
        let userAnime = await UserAnime.findOne({ User_id: user_id, Anime_id: anime_id });
        if (!userAnime) {
            // Nếu chưa tồn tại, thêm mới
            userAnime = new UserAnime({
                User_id: user_id,
                Anime_id: anime_id,
                LastestTimeWatched: currentTime,
                Status: isLastEpisode ? true : false // Đánh dấu là hoàn thành nếu tập cuối
            });
            await userAnime.save();
        } else {
            // Nếu đã tồn tại, cập nhật thông tin
            userAnime.LastestTimeWatched = currentTime;
            if (isLastEpisode) {
                userAnime.Status = true; // Nếu là tập cuối, đánh dấu hoàn thành
            }
            await userAnime.save();
        }

        res.status(200).json({ message: 'User watch history and anime status updated successfully' });
    } catch (error) {
        console.error('Error updating user watch data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const userComment = async (req, res) => {
    const { user_id, anime_id, episode_id, comment } = req.body;

    // Kiểm tra đầu vào
    if (!user_id || !anime_id || !episode_id || !comment) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Tìm UserHistory dựa trên user_id, anime_id, episode_id
        const userHistory = await UserHistory.findOne({
            User_id: user_id,
            Anime_id: anime_id,
            Episode_id: episode_id
        });

        if (!userHistory) {
            // Nếu không tìm thấy lịch sử, trả lỗi
            return res.status(404).json({ error: 'User history not found' });
        }

        // Cập nhật comment
        userHistory.Comment = comment;
        await userHistory.save();

        res.status(200).json({
            message: 'Comment updated successfully',
            data: userHistory
        });
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};