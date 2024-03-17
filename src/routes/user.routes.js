import { Router } from "express";
import { logoutUser, userLogin, userRegister } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router();
router.route("/register")
.post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    userRegister
    )


router.route("/login")
.post(
    userLogin
)   

router.route("/logout")
.post(
   verifyJWT,
   logoutUser
) 

export default router;