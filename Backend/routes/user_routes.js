import express from "express";
import multer from "multer";
import upload from "../controllers/multer-middleware.js";
import { getUserDetails,signupMiddleware ,loginMiddleware,storeAddress,getAddress,storeCaretaking,getCaretakingService,getAllCaretakingService,updateCaretakeStatus,getAllAddress} from "../controllers/User-middleware.js";
const router = express.Router();

router.get("/", getUserDetails);
router.post("/signup", signupMiddleware);
router.post("/login", loginMiddleware);
router.post("/address",storeAddress)
// router.post("/getAllusers",storeAddress)
router.get("/getAddress",getAddress);
router.get("/getAllAddress",getAllAddress);
router.get("/getCaretaking",getCaretakingService);
router.get("/getallCaretaking",getAllCaretakingService);
router.post("/updateCaretakeStatus",updateCaretakeStatus);
router.post("/caretaking",upload.single("image"),storeCaretaking);

export default router;