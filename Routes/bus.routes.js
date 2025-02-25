const busController = require("../Controllers/bus.controller.js");
const verifyJWT = require("../Middlewares/verifyJWT.js");
const isAdmin = require("../Middlewares/isAdmin.js");

module.exports = (app) => {
  app.post(
    "/api/admin/addBus",
    verifyJWT.verifyAccessToken,
    isAdmin,
    busController.addBus
  );
  app.get(
    "/api/searchBus",
    verifyJWT.verifyAccessToken,
    busController.searchBus
  );
  app.put(
    "/api/admin/updateBus",
    verifyJWT.verifyAccessToken,
    isAdmin,
    busController.updateBus
  );
  app.delete(
    "/api/admin/deleteBus",
    verifyJWT.verifyAccessToken,
    isAdmin,
    busController.deleteBus
  );
  app.put(
    "/api/admin/addRoute",
    verifyJWT.verifyAccessToken,
    isAdmin,
    busController.addRoutes
  );
  app.put(
    "/api/admin/updateRoute",
    verifyJWT.verifyAccessToken,
    isAdmin,
    busController.updateRoutes
  );
};
