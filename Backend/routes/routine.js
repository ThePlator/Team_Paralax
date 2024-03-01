import express from "express";
import {
  createRoutineController,
  updateRoutineController,
  RoutineController,
  deleteRoutineController,
  singleRoutineController,
  getRoutineBranchWiseController,
} from "../controllers/routineController.js";

const router = express.Router();

router.post("/create-routine", createRoutineController);

router.put("/update-routine/:id", updateRoutineController);

router.get("/get-routine", RoutineController);
router.get("/single-routine/:id", singleRoutineController);
router.delete(
  "/delete-routine/:id",

  deleteRoutineController
);

router.get("/get-routine-branch/:id", getRoutineBranchWiseController);

export default router;
