const busModel = require("../Models/bus.model");

exports.addBus = async (req, res) => {
  const { name, routeNumber, registerNumber, route, timing } = req.body;

  try {
    const newBus = await busModel.create({
      name,
      routeNumber,
      registerNumber,
      route,
      timing,
    });
    res.status(201).send({ message: "Bus added successfully", bus: newBus });
  } 
  catch (error) {
    console.log("error : ", error);
    res.status(500).send({
      message: "Server error. Unable to add bus",
      error: error.message,
    });
  }
};

exports.searchBus = async (req, res) => {
  const { routeNumber, name, route } = req.query;

  try {
    const query = {
      $or: [
        { routeNumber: routeNumber },
        { name: name },
        { route: { $in: [route] } },
      ],
    };

    const buses = await busModel.find(query);
    res.status(200).send({ buses });
  } 
  catch (error) {
    console.log("error : ", error);
    res.status(500).send({
      message: "Server error. Unable to search buses",
      error: error.message,
    });
  }
};

exports.updateBus = async (req, res) => {
  const { busId, name, routeNumber, registerNumber, route, timing } = req.body;

  try {
    const updatedBus = await busModel.findByIdAndUpdate(
      busId,
      { name, routeNumber, registerNumber, route, timing },
      { new: true }
    );
    res
      .status(200)
      .send({ message: "Bus updated successfully", bus: updatedBus });
  } 
  catch (error) {
    console.log("error : ", error);
    res.status(500).send({
      message: "Server error. Unable to update bus",
      error: error.message,
    });
  }
};

exports.deleteBus = async (req, res) => {
  const { busId } = req.body;

  try {
    await busModel.findByIdAndDelete(busId);
    res.status(200).send({ message: "Bus deleted successfully" });
  } 
  catch (error) {
    console.log("error : ", error);
    res.status(500).send({
      message: "Server error. Unable to delete bus",
      error: error.message,
    });
  }
};

exports.addRoutes = async (req, res) => {
  const { busId, route } = req.body;

  try {
    const updatedBus = await busModel.findByIdAndUpdate(
      busId,
      { $push: { route } },
      { new: true }
    );
    res
      .status(200)
      .send({ message: "Route added successfully", bus: updatedBus });
  } 
  catch (error) {
    console.log("error : ", error);
    res.status(500).send({
      message: "Server error. Unable to add route",
      error: error.message,
    });
  }
};

exports.updateRoutes = async (req, res) => {
  const { busId, route } = req.body;

  try {
    const updatedBus = await busModel.findByIdAndUpdate(
      busId,
      { route },
      { new: true }
    );
    res
      .status(200)
      .send({ message: "Route updated successfully", bus: updatedBus });
  } 
  catch (error) {
    console.log("error : ", error);
    res.status(500).send({
      message: "Server error. Unable to update route",
      error: error.message,
    });
  }
};
