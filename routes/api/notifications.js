const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const notificationController = require("../../controllers/notificationController");
router.get("/",notificationController.getAllNotifications);

// Create
router.post('/',notificationController.createNotification)
// Read
router.get("/:id",notificationController.getNotificationById);
// Update
router.put("/:id",notificationController.updateNotification)
// Delete a notification
router.delete("/:id",notificationController.deleteNotification)

module.exports = router;