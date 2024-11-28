import express from "express";
import { animeInfo, animeLastestEpisode, animeMostFavorites, animeSearch } from "../../controllers/user/anime.js";

const routerAnime = express.Router()
routerAnime.post("/animeInfo",animeInfo)
routerAnime.post("/search",animeSearch)
routerAnime.post("/lastestEpisode",animeLastestEpisode)
routerAnime.post("/mostFavorites",animeMostFavorites)
export default routerAnime;