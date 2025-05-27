import Staff from "../models/staff.model.js";

export const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.getAll();
    res.status(200).json({ success: true, data: staff });
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, message: error.message });
  }
};

export const createStaff = async (req, res) => {
  try {
    const { staff_name, staff_role, shift_time } = req.body;
    const newStaff = await Staff.create({ staff_name, staff_role, shift_time });
    res.status(201).json({ success: true, data: newStaff });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { staff_name, staff_role, shift_time } = req.body;
    const updatedStaff = await Staff.update(id, {
      staff_name,
      staff_role,
      shift_time,
    });
    res.status(200).json({ success: true, data: updatedStaff });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    await Staff.delete(id);
    res
      .status(200)
      .json({ success: true, message: "Staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
