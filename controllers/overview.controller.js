import Patient from "../models/patients.model.js";
import Staff from "../models/staff.model.js";
import Resource from "../models/resource.model.js";

export const getOverview = async (req, res) => {
  try {
    const [patients, staff, resources] = await Promise.all([
      Patient.getAll(),
      Staff.getAll(),
      Resource.getAll(),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        patients: patients.length ?? 0,
        staffs: staff.length ?? 0,
        resources: resources.length ?? 0,
      },
    });
  } catch (error) {
    console.error("Error in getOverview:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
