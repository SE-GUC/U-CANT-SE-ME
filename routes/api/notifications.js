const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const notificationController = require("../../controllers/notificationController");

// Read
router.get("/", notificationController.getAllNotifications);

router.get("/:id", notificationController.getNotificationById);

// Create
router.post("/", notificationController.createNotification);

// Update
router.put("/:id", notificationController.updateNotification);

// Delete a notification
router.delete("/:id", notificationController.deleteNotification);

module.exports = router;
