const express = require("express");
const router = express.Router();
const multer = require("multer"); // For handling file uploads
const path = require("path");

const db = require("../models");

// Multer setup for handling file uploads

var filename;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/"); // Directory where images will be stored
  },
  filename: function (req, file, cb) {
    // Extract creator (userID) from req.body
    const creator = "kamel";
    const timestamp = Date.now();
    const fileExtension = path.extname(file.originalname);
    filename = `${creator}-${timestamp}${fileExtension}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

// POST a new post
router.post("/", upload.single("image"), async (req, res) => {
  const t = await db.sequelize.transaction();
    try {
      const { title, category, discription, author, comments, rating } = req.body;
      console.log(req.body)
  
      // Check if req.file exists to determine if an image was uploaded
      const imageData = req.file ? { image: req.file.filename } : {};
      console.log("----------------------------------")
      console.log("imageData", imageData);

      const newPost = await db.post.create({
        title,
        category,
        discription,
        author,
        comments,
        rating,
      } ,{ transaction: t });

      if (req.file) {
        const imagePath = `${process.env.BACKEND_BASE_URL}/images/${filename}`;
        const docname = req.file.originalname;
  
        const newImage = await db.images.create(
          {
            path: imagePath,
            docname: docname,
            postId: newPost.id, // Assuming you have a foreign key postId in the images table
          },
          { transaction: t }
        );
      }
  
      await t.commit();
      res.status(200).json(newPost);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Failed to create post" });
    }
  });

// PUT update a post
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const {title, category, discription, author, comments, rating} = req.body;
    const updatedPost = await db.post.update(
      {
        title,
        category,
        discription,
        author,
        comments,
        rating,
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
