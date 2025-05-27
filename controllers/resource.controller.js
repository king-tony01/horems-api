import Resource from "../models/resource.model.js";

export const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.getAll();
    res.status(200).json({ success: true, data: resources });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createResource = async (req, res) => {
  try {
    const { resource_type, available, quantity } = req.body;
    const newResource = await Resource.create({
      resource_type,
      available,
      quantity,
    });
    res.status(201).json({ success: true, data: newResource });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { resource_type, available, quantity } = req.body;
    const updatedResource = await Resource.update(id, {
      resource_type,
      available,
      quantity,
    });
    res.status(200).json({ success: true, data: updatedResource });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;
    await Resource.delete(id);
    res
      .status(200)
      .json({ success: true, message: "Resource deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
