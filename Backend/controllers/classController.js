import classModel from "../models/classModels.js";

export const createClassController = async (req, res) => {
  try {
    const { name, year } = req.body;

    if (!name || !year) {
      return res
        .status(400)
        .send({ success: false, message: "Name or year is required" });
    }

    const Class = await new classModel({
      name,
      year,
    }).save();

    res.status(201).send({
      success: true,
      message: "New class created",
      Class,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in class",
    });
  }
};

export const updateClassController = async (req, res) => {
  try {
    const { name, year } = req.body;
    const { id } = req.params;
    const Class = await classModel.findByIdAndUpdate(
      id,
      { name, year },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "class Updated Successfully",
      Class,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating class",
    });
  }
};

export const classController = async (req, res) => {
  try {
    const Class = await classModel.find({});
    res.status(200).send({
      success: true,
      message: "All class List",
      Class,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all class",
    });
  }
};

export const deleteClassController = async (req, res) => {
  try {
    const { id } = req.params;
    await classModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "class Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting class",
      error,
    });
  }
};
