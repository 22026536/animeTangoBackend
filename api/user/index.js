import express from "express";
import routerAnime from "./anime.js";
import routerChatBot from "./chatBot.js";
import routerForgotPassword from "./forgotPassword.js";
import routerLogin from "./login.js";
import routerLogOut from "./logOut.js";
import routerRecommend from "./recommend.js";
import routerSignUp from "./signUp.js";
import routerUploadImage from "./uploadImage.js";
import routerUser from "./user.js";
import routerUserInfo from "./userInfo.js";

const router = express.Router()
router.use("/login",routerLogin)
router.use("/logOut",routerLogOut)
router.use("/signUp",routerSignUp)
router.use("/forgotPassword",routerForgotPassword)
router.use("/uploadImage",routerUploadImage)
router.use("/anime",routerAnime)
router.use("/userInfo",routerUserInfo)
router.use("/user",routerUser)
router.use("/chatBot",routerChatBot)
router.user("/recommend",routerRecommend)
export default router;