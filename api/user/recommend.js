import express from "express";
import { recommendDecisionTree, recommendKNN, recommendLastestEpisode, recommendNaiveBayes } from "../../controllers/user/recommend.js";

const routerRecommend = express.Router()
routerRecommend.post("/knn",recommendKNN)
routerRecommend.post("/deciontree",recommendDecisionTree)
routerRecommend.post("/naivebayes",recommendNaiveBayes)
routerRecommend.post("/lastestepisode",recommendLastestEpisode)




export default routerRecommend;