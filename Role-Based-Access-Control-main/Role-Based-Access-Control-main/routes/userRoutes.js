const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const verifytoken = require("../middlewares/authmiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const {
    saveImageBlob,
    getImagesByUserId,
    getAllImages,
    getImageById,
} = require("../models/userModel");

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Upload an image (with blob data)
router.post("/upload", verifytoken, upload.single("image"), async (req, res) => {
    try {
        const { user } = req;
        const imageData = req.file.buffer; // Get the binary data from the uploaded file
        const filename = req.file.originalname;

        const imageMetadata = await saveImageBlob({
            userId: user.id,
            filename,
            data: imageData,
        });

        res.status(201).json({
            message: "Image uploaded successfully",
            image: {
                id: imageMetadata.id,
                filename: imageMetadata.filename,
                upload_date: imageMetadata.upload_date,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to upload image" });
    }
});

// View all images of a specific user (excluding blob data)
router.get("/my-images", verifytoken, async (req, res) => {
    try {
        const { user } = req;
        const images = await getImagesByUserId(user.id);
        
        res.status(200).json({ images });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch images" });
    }
});

// Admin view: Get all images (excluding blob data)
router.get("/all-images", verifytoken, authorizeRoles("admin"), async (req, res) => {
    try {
        const images = await getAllImages();
        res.status(200).json({ images });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch all images" });
    }
});

// Fetch a single image (with blob data)
router.get("/image/:id", verifytoken, async (req, res) => {
    try {
        const { id } = req.params;
        const image = await getImageById(id);

        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }

        res.set("Content-Type", "image/jpeg"); // Assuming image is in JPEG format
        res.send(image.data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch image" });
    }
});

// Admin-only route
router.get("/admin", verifytoken, authorizeRoles("admin"), (req, res) => {
    res.json({ message: "WELCOME MY DEAR ADMIN" });
});

// User route accessible by all roles
router.get("/user", verifytoken, authorizeRoles("admin", "moderator", "user"), (req, res) => {
    res.json({ message: "WELCOME USER" });
});

module.exports = router;