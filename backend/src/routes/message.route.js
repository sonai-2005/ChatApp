import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import {getmessages , getUserForSidebar , sendMessage} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users",protectRoute,getUserForSidebar);
router.get("/chat/:id",protectRoute,getmessages);
router.post("/send/:id" , protectRoute , sendMessage);

export default router;