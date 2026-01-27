// import {Router} from "express";

// const router = Router();
// router.route("/login").post(login)
// router.route("/register").post(register)
// router.route("/add_to_activity")
// router.route("/get_all_activity")

// export default router;
// import { Router } from "express";
// import {
//   login,
//   register,
//   addToActivity,
//   getAllActivity
// } from "../controllers/user.controller.js";

// const router = Router();

// router.post("/login", login);
// router.post("/register", register);
// router.post("/add_to_activity", addToActivity);
// router.get("/get_all_activity", getAllActivity);

// export default router;

// import { Router } from "express";
// import {
//   login,
//   register,
//   addToHistory,
//   getUserHistory
// } from "../controllers/user.controller.js";

// const router = Router();

// router.post("/login", login).post(login)
// router.post("/register", register).post(register)
// router.post("/add_to_activity", addToActivity).post(addToHistory)
// router.get(, getAllActivity).get(getUserHistory)

// export default router;

import { Router } from "express";
import {
  login,
  register,
  addToHistory,
  getUserHistory
} from "../controllers/user.controller.js";

const router = Router();

/* ===== AUTH ===== */
router.post("/login", login);
router.post("/register", register);

/* ===== MEETING HISTORY ===== */
router.post("/add_to_activity",addToHistory );
router.get("/get_all_activity", getUserHistory);

export default router;


