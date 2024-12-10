import express from "express";
import { recommendDecisionTreeUser, recommendKNNUser, recommendNaiveBayesUser } from "../../controllers/user/recommend.js";

const routerRecommend = express.Router()
routerRecommend.post("/user/decisiontree",recommendDecisionTreeUser)
routerRecommend.post("/user/naivebayes",recommendNaiveBayesUser)
routerRecommend.post("/user/knn",recommendKNNUser)
export default routerRecommend;