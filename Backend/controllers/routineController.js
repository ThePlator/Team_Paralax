import routineModel from "../models/routineModels.js";

export const createRoutineController = async (req, res) => {
  try {
    const { day, period, classes, subject, teacher } = req.body;

    if (!day || !period || !classes || !subject || !teacher) {
      return res
        .status(400)
        .send({ success: false, message: "all filed are required required" });
    }

    const existingRoutine = await routineModel.findOne({
      day,
      period,
      classes,
    });

    console.log(existingRoutine);

    if (existingRoutine) {
      // If routine exists, get the subject details in a separate query
      const existingRoutineWithSubject = await routineModel
        .findOne({ _id: existingRoutine._id })
        .populate("subject")
        .populate("teacher");
      const existingSubject = existingRoutineWithSubject.subject.name;
      const existingTeacher = existingRoutineWithSubject.teacher.name;

      return res.status(400).send({
        success: false,
        message: `This subject (${existingSubject}) and this teacher ${existingTeacher} is already assigned at this period and day for the given class`,
      });
    }
    const Routine = await new routineModel({
      day,
      period,
      classes,
      subject,
      teacher,
    }).save();

    res.status(201).send({
      success: true,
      message: "New Routine created",
      Routine,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in Routine",
    });
  }
};

export const updateRoutineController = async (req, res) => {
  try {
    const { day, period, classes, subject, teacher } = req.body;
    const { id } = req.params;
    const Routine = await routineModel.findByIdAndUpdate(
      id,
      { day, period, classes, subject, teacher },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Routine Updated Successfully",
      Routine,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating Routine",
    });
  }
};

export const RoutineController = async (req, res) => {
  try {
    const Routine = await routineModel.find({});
    res.status(200).send({
      success: true,
      message: "All Routine List",
      Routine,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all Routine",
    });
  }
};

export const singleRoutineController = async (req, res) => {
  try {
    const { id } = req.params;
    const Routine = await routineModel.findOne({ _id: id });
    res.status(200).send({
      success: true,
      message: "Get Single Routine SUccessfully",
      Routine,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Routine",
    });
  }
};

export const deleteRoutineController = async (req, res) => {
  try {
    const { id } = req.params;
    await routineModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Routine Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting Routine",
      error,
    });
  }
};

export const getRoutineBranchWiseController = async (req, res) => {
  try {
    const { id } = req.params;

    const routines = await routineModel
      .find({ classes: id })
      .populate("subject");

    if (!routines || routines.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No routines found for the provided class ID",
      });
    }

    res.status(200).send({
      success: true,
      message: "Routines fetched successfully",
      routines,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while getting routines by class ID",
      error: error.message,
    });
  }
};
