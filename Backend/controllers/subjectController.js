import subjecTModels from "../models/subjectModels.js";

export const createSubjectController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .send({ success: false, message: "subject is required" });
    }

    const Subject = await new subjecTModels({
      name,
    }).save();

    res.status(201).send({
      success: true,
      message: "New Subject created",
      Subject,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in Subject",
    });
  }
};

export const updateSubjectController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const Subject = await subjecTModels.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Subject Updated Successfully",
      Subject,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating Subject",
    });
  }
};

export const SubjectController = async (req, res) => {
  try {
    const Subject = await subjecTModels.find({});
    res.status(200).send({
      success: true,
      message: "All Subject List",
      Subject,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all Subject",
    });
  }
};

export const deleteSubjectController = async (req, res) => {
  try {
    const { id } = req.params;
    await subjecTModels.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Subject Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting Subject",
      error,
    });
  }
};
