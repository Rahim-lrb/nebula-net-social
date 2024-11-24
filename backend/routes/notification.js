const express = require("express");
const protectRoute = require("../middlewares/protectRoute.js");
const { deleteNotifications, getNotifications } = require("../controllers/notificationControllers.js");

const notificationRouter = express.Router();

notificationRouter.get("/", protectRoute, getNotifications);
notificationRouter.delete("/", protectRoute, deleteNotifications);

module.exports = notificationRouter;
