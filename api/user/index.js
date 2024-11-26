import express from "express";
import routerForgotPassword from "./forgotPassword.js";
import routerLogin from "./login.js";
import routerLogOut from "./logOut.js";
import routerRecommend from "./recommend.js";
import routerSignUp from "./signUp.js";
import routerUploadImage from "./uploadImage.js";

const router = express.Router()
router.use("/login",routerLogin)
router.use("/logOut",routerLogOut)
router.use("/signUp",routerSignUp)
router.use("/forgotPassword",routerForgotPassword)
router.use("/uploadImage",routerUploadImage)
router.use("/recommend",routerRecommend)

export default router;