import express from "express";
import { userInfo, userInfoUpdate } from "../../controllers/user/userInfo.js";

const routerUserInfo = express.Router()
routerUserInfo.post("/",userInfo)
routerUserInfo.post("/update",userInfoUpdate)
export default routerUserInfo; 