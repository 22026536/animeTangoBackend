import express from "express";
import { recommendDecisionTreeUser, recommendNaiveBayesUser } from "../../controllers/user/recommend.js";

const routerRecommend = express.Router()
routerRecommend.post("/user/decisiontree",recommendDecisionTreeUser)
routerRecommend.post("/user/naivebayes",recommendNaiveBayesUser)
export default routerRecommend;