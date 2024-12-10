import { isTokenExpired, verifyToken } from '../../middlewares/JWT.js';
import UserAnime from "../../models/UserAnime.js";
import UserCommend from "../../models/UserCommend.js";
import UserFavorites from "../../models/UserFavorites.js";
import UserRating from "../../models/UserRating.js";
// **Hàm userWatch**
export const userWatch = async (req, res) => {
  const token = req.body.jwt
  if (!token) {
      return res.json({
          message: "Người dùng chưa đăng nhập",
          success: false
      });
  }

  if (isTokenExpired(token)) {
      return res.json({
          message: "Người dùng hết phiên đăng nhập",
          success: false
      });
  }

  const decoded = verifyToken(token);
  const user_id = decoded.id;
    const { anime_id, episode_id, isLastEpisode } = req.body;
  
    if (!user_id || !anime_id || !episode_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    try {
      const currentTime = new Date();
  
      // **1. Cập nhật hoặc thêm UserAnime**
      let userAnime = await UserAnime.findOne({ User_id: user_id, Anime_id: anime_id });
      if (!userAnime) {
        // Nếu chưa tồn tại, thêm mới
        userAnime = new UserAnime({
          User_id: user_id,
          Anime_id: anime_id,
          LastestTimeWatched: currentTime,
          Status: isLastEpisode ? true : false, // Đánh dấu hoàn thành nếu là tập cuối
        });
        await userAnime.save();
      } else {
        // Nếu đã tồn tại, cập nhật thông tin
        userAnime.LastestTimeWatched = currentTime;
        if (isLastEpisode) {
          userAnime.Status = true; // Đánh dấu hoàn thành nếu tập cuối
        }
        await userAnime.save();
      }
  
      // **2. Cập nhật UserFavorites nếu xem hết anime**
      if (isLastEpisode) {
        let userFavorites = await UserFavorites.findOne({ User_id: user_id });
  
        if (!userFavorites) {
          // Nếu chưa có danh sách yêu thích, tạo mới
          userFavorites = new UserFavorites({
            User_id: user_id,
            favorites: [anime_id],
          });
        } else if (!userFavorites.favorites.includes(anime_id)) {
          // Thêm anime_id vào favorites nếu chưa có
          userFavorites.favorites.push(anime_id);
        }
        await userFavorites.save();
      }
  
      res.status(200).json({ message: "User watch history and anime status updated successfully" });
    } catch (error) {
      console.error("Error updating user watch data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  // **Hàm userComment**
  export const userComment = async (req, res) => {
    const token = req.body.jwt
        if (!token) {
            return res.json({
                message: "Người dùng chưa đăng nhập",
                success: false
            });
        }

        if (isTokenExpired(token)) {
            return res.json({
                message: "Người dùng hết phiên đăng nhập",
                success: false
            });
        }

        const decoded = verifyToken(token);
        const user_id = decoded.id;
    const { anime_id, episode_id, comment } = req.body;
  
    if (!user_id || !anime_id || !episode_id || !comment) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    try {
      // **Cập nhật hoặc thêm UserCommend**
      let userCommend = await UserCommend.findOne({
        User_id: user_id,
        Anime_id: anime_id,
        Episode_id: episode_id,
      });
  
      if (!userCommend) {
        // Nếu chưa tồn tại, thêm mới
        userCommend = new UserCommend({
          User_id: user_id,
          Anime_id: anime_id,
          Episode_id: episode_id,
          Comment: comment,
          Time: new Date(),
        });
        await userCommend.save();
      } else {
        // Nếu đã tồn tại, cập nhật comment
        userCommend.Comment = comment;
        userCommend.Time = new Date();
        await userCommend.save();
      }
  
      res.status(200).json({
        message: "Comment updated successfully",
        data: userCommend,
      });
    } catch (error) {
      console.error("Error updating comment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  export const userRate = async (req, res) => {
    const token = req.body.jwt
        if (!token) {
            return res.json({
                message: "Người dùng chưa đăng nhập",
                success: false
            });
        }

        if (isTokenExpired(token)) {
            return res.json({
                message: "Người dùng hết phiên đăng nhập",
                success: false
            });
        }

        const decoded = verifyToken(token);
        const user_id = decoded.id;
    const { anime_id, rating } = req.body;
  
    // Kiểm tra đầu vào
    if (!user_id || !anime_id || rating == null || rating < 0 || rating > 10) {
      return res.status(400).json({ error: 'Invalid or missing required fields' });
    }
  
    try {
      // **1. Thêm hoặc cập nhật UserRating**
      let userRating = await UserRating.findOne({ User_id: user_id, Anime_id: anime_id });
  
      if (!userRating) {
        // Nếu không tồn tại, thêm mới
        userRating = new UserRating({
          User_id: user_id,
          Anime_id: anime_id,
          Rating: rating,
        });
        await userRating.save();
      } else {
        // Nếu đã tồn tại, cập nhật rating
        userRating.Rating = rating;
        await userRating.save();
      }
  
      // **2. Nếu rating > 7, thêm vào UserFavorites**
      if (rating >= 7) {
        let userFavorites = await UserFavorites.findOne({ User_id: user_id });
  
        if (!userFavorites) {
          // Nếu chưa có danh sách yêu thích, tạo mới
          userFavorites = new UserFavorites({
            User_id: user_id,
            favorites: [anime_id],
          });
        } else if (!userFavorites.favorites.includes(anime_id)) {
          // Thêm anime_id vào favorites nếu chưa có
          userFavorites.favorites.push(anime_id);
        }
        await userFavorites.save();
      }
  
      res.status(200).json({
        message: 'Rating and favorites updated successfully',
        data: userRating,
      });
    } catch (error) {
      console.error('Error handling user rating:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  export const userUnRate = async (req, res) => {
    const token = req.body.jwt;
    if (!token) {
        return res.json({
            message: "Người dùng chưa đăng nhập",
            success: false
        });
    }

    if (isTokenExpired(token)) {
        return res.json({
            message: "Người dùng hết phiên đăng nhập",
            success: false
        });
    }

    const decoded = verifyToken(token);
    const user_id = decoded.id;
    const { anime_id } = req.body;

    // Kiểm tra đầu vào
    if (!user_id || !anime_id) {
        return res.status(400).json({ error: 'Invalid or missing required fields' });
    }

    try {
        // **1. Tìm UserRating của người dùng với anime_id**
        let userRating = await UserRating.findOne({ User_id: user_id, Anime_id: anime_id });

        if (!userRating) {
            // Nếu không tồn tại rating, trả về thông báo
            return res.status(404).json({
                message: 'Rating không tồn tại để hủy',
                success: false
            });
        }

        // **2. Xóa rating (set rating thành null hoặc xóa document nếu muốn)**
        userRating.Rating = null;
        await userRating.save();

        // **3. Nếu rating đã bị xóa, kiểm tra và xóa khỏi UserFavorites nếu có**
        let userFavorites = await UserFavorites.findOne({ User_id: user_id });

        if (userFavorites && userFavorites.favorites.includes(anime_id)) {
            // Xóa anime_id khỏi danh sách yêu thích
            userFavorites.favorites = userFavorites.favorites.filter(id => id !== anime_id);
            await userFavorites.save();
        }

        res.status(200).json({
            message: 'Rating has been removed and favorites updated if necessary',
            success: true
        });
    } catch (error) {
        console.error('Error handling unRate:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
