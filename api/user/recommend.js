import express from "express";
import { recommendDecisionTree, recommendKNN, recommendNaiveBayes } from "../../controllers/user/recommend.js";

const routerRecommend = express.Router()
routerRecommend.post("/knn",recommendKNN)
routerRecommend.post("/deciontree",recommendDecisionTree)
routerRecommend.post("/naivebayes",recommendNaiveBayes)




export default routerRecommend;