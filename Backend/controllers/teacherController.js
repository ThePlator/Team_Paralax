import teacherModel from "../models/teacherModels.js";

export const createTeacherController = async (req, res) => {
  try {
    const { name, dep } = req.body;

    if (!name || !dep) {
      return res
        .status(400)
        .send({ success: false, message: "Name or department is required" });
    }

    const teacher = await new teacherModel({
      name,
      dep,
    }).save();

    res.status(201).send({
      success: true,
      message: "New Teacher created",
      teacher,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in Teacher",
    });
  }
};

export const updateTeacherController = async (req, res) => {
  try {
    const { name, dep } = req.body;
    const { id } = req.params;
    const teacher = await teacherModel.findByIdAndUpdate(
      id,
      { name, dep },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Teacher Updated Successfully",
      teacher,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating Teacher",
    });
  }
};

export const teacherController = async (req, res) => {
  try {
    const teacher = await teacherModel.find({});
    res.status(200).send({
      success: true,
      message: "All Teacher List",
      teacher,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all Teacher",
    });
  }
};

export const singleTeacherController = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await teacherModel.findOne({ _id: id });
    res.status(200).send({
      success: true,
      message: "Get Single teacher SUccessfully",
      teacher,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single teacher",
    });
  }
};

export const deleteTeacherController = async (req, res) => {
  try {
    const { id } = req.params;
    await teacherModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "teacher Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting teacher",
      error,
    });
  }
};
