import express from "express";
import { animeInfo, animeLastestEpisode, animeMostFavorites, animeSearch, animeUnfinished, getComment, searchAnimeByName } from "../../controllers/user/anime.js";

const routerAnime = express.Router()
routerAnime.post("/animeInfo",animeInfo)
routerAnime.post("/search",animeSearch)
routerAnime.post("/lastestEpisode",animeLastestEpisode)
routerAnime.post("/mostFavorites",animeMostFavorites)
routerAnime.post("/unfinished",animeUnfinished)
routerAnime.post("/searchbyname",searchAnimeByName)
routerAnime.post("/getComment",getComment)
export default routerAnime;