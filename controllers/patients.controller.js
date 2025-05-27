import Patient from "../models/patients.model.js";

export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.getAll();
    res.status(200).json({ success: true, data: patients });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.getById(id);
    if (!patient) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }
    res.status(200).json({ success: true, data: patient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createPatient = async (req, res) => {
  try {
    console.log(req.body);

    const { patient_name, age, patient_condition } = req.body;
    const newPatient = await Patient.create({
      patient_name,
      age,
      patient_condition,
    });
    res.status(201).json({ success: true, data: newPatient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { patient_name, age, patient_condition } = req.body;
    const updatedPatient = await Patient.update(id, {
      patient_name,
      age,
      patient_condition,
    });
    res.status(200).json({ success: true, data: updatedPatient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    await Patient.delete(id);
    res
      .status(200)
      .json({ success: true, message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
