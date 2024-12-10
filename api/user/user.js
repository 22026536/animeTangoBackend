import express from "express";
import { userComment, userRate, userWatch } from "../../controllers/user/user.js";

const routerUser = express.Router()
routerUser.post("/watch",userWatch)
routerUser.post("/comment",userComment)
routerUser.post("/rate",userRate)
export default routerUser;