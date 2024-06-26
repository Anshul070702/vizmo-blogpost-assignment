import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  registerUser,
  loginUser,
  logOutUser,
} from "../controllers/user.controllers.js";

const router = Router();

router.route("/").get((req, res) => {
  res.send("Server is listening");
});
// SignUp User routes
router.route("/signup").post(registerUser);

// LoginUser routes
router.route("/login").post(loginUser);

// LogoutUser routes
router.route("/logout").post(verifyJWT, logOutUser);

export default router;
