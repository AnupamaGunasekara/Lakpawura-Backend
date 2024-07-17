const express = require("express");
const router = express.Router();
const multer = require("multer"); // For handling file uploads
const path = require("path");

const db = require("../models");

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/"); // Directory where images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Renaming file with current timestamp
  },
});

const upload = multer({ storage });

// POST a new post
router.post("/", upload.single("image"), async (req, res) => {
    try {
      const { title, category, description, creator, comments, rating } = req.body;
  
      // Check if req.file exists to determine if an image was uploaded
      const imageData = req.file ? { image: req.file.filename } : {};
      console.log("----------------------------------")
      console.log("imageData", imageData);

      const newPost = await db.post.create({
        title,
        category,
        description,
        creator,
        comments,
        rating,
        ...imageData, // Spread image data only if an image was uploaded
      });
  
      res.status(200).json(newPost);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Failed to create post" });
    }
  });

// PUT update a post
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, category, description, creator, comments, rating } = req.body;
    const updatedPost = await db.post.update(
      {
        title,
        category,
        description,
        creator,
        comments,
        rating,
        image: req.file ? req.file.filename : null, // Save filename if image uploaded
      },
      {
        where: { id: req.params.id },
      }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Failed to update post" });
  }
});

module.exports = router;
