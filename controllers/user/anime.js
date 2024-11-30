import Anime from "../../models/Anime.js";
import AnimeEpisode from "../../models/AnimeEpisode.js";
import UserHistory from "../../models/UserHistory.js";
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
        const { n = 10 } = req.body;

        const latestAnime = await Anime.find().sort({ LastestEpisodeAired: -1 }).limit(n);
        res.status(200).json(latestAnime);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const animeMostFavorites = async (req, res) => {
    try {
        const { n = 10 } = req.body;

        const popularAnime = await Anime.find().sort({ Favorites: -1 }).limit(n);
        res.status(200).json(popularAnime);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}


export const animeSearch = async (req, res) => {
    try {
      const { JapaneseLevel, Type, Genre, limit, page } = req.body;
      const { n = 10 } = req.body;
      // Tạo bộ lọc linh hoạt
      const filters = {};
      if (JapaneseLevel) filters.JapaneseLevel = JapaneseLevel;
      if (Type) filters.Type = Type;
      if (Genre) filters.Genres = { $elemMatch: { $regex: Genre, $options: "i" } }; // Tìm kiếm phần tử trong mảng không phân biệt chữ hoa thường
  
      // Pagination (Phân trang)
      const pageNumber = parseInt(page) || 1; // Mặc định page = 1
      const pageSize = parseInt(n) || 10; // Mặc định limit = 10
      const skip = (pageNumber - 1) * pageSize;
  
      // Thực hiện truy vấn với phân trang và sắp xếp
      const results = await Anime.find(filters)
        .sort({ LastestEpisodeAired: -1 }) // Sắp xếp giảm dần theo tập mới nhất
        .skip(skip)
        .limit(pageSize);
  
      res.status(200).json(results);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  


  export const animeUnfinished = async (req, res) => {
    try {
        // const token = req.cookies.jwt;

        // if (!token) {
        //     return res.status(401).json({
        //         message: "Người dùng chưa đăng nhập",
        //         success: false
        //     });
        // }

        // if (isTokenExpired(token)) {
        //     return res.status(401).json({
        //         message: "Người dùng hết phiên đăng nhập",
        //         success: false
        //     });
        // }

        // const decoded = verifyToken(token);
        const user_id = 6;
        const { n = 10 } = req.body; // Số lượng kết quả trả về (default = 10)

        // Lấy danh sách tập cuối của mỗi anime
        const lastEpisodes = await AnimeEpisode.aggregate([
            { $group: { _id: "$Anime_id", maxEpisode: { $max: "$Episode" } } }
        ]);

        // Lấy lịch sử xem của user, sắp xếp theo thời gian xem gần nhất
        const userHistory = await UserHistory.find({ User_id: user_id })
            .sort({ TimeWatches: -1 });

        // Lọc các anime mà người dùng đã xem nhưng chưa hoàn thành
        const unfinishedAnimeIds = [];
        for (const history of userHistory) {
            // Tìm tập cuối của anime trong `lastEpisodes`
            const anime = lastEpisodes.find((ep) => ep._id === history.Anime_id);

            // Nếu người dùng chưa xem tập cuối thì thêm vào danh sách
            if (anime && history.Episode_id < anime.maxEpisode) {
                unfinishedAnimeIds.push(history.Anime_id);
            }
        }

        // Truy vấn thông tin anime chưa hoàn thành
        const unfinishedAnimes = await Anime.find({
            Anime_id: { $in: unfinishedAnimeIds },
        })
            .limit(n); // Giới hạn số lượng kết quả trả về

        res.status(200).json({
            unfinishedAnimes,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
