const multer = require("multer");
const path = require("path");

// Set up storage configuration for uploaded files
const storageConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    if (file.fieldname === "image") {
      callback(null, "./uploads");
    }
  },
  filename: (req, file, callback) => {
    if (file.fieldname === "image") {
      callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
  },
});

// Initialize multer with storage settings, file size limits, and a filter for valid file types
const upload = multer({
  storage: storageConfig,
  limits: {
    fileSize: 10 * 1024 * 1024, // Limit file size to 10 MB
  },
  fileFilter: (req, file, callback) => {
    validateFileType(file, callback);
  },
});

// Function to validate the file type
function validateFileType(file, callback) {
  if (file.fieldname === "image") {
    const validMimeTypes = ["image/png", "image/jpg", "image/jpeg", "image/svg+xml"];
    if (validMimeTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Invalid file type"), false);
    }
  }
}

// Export the configured multer instance for use in routes
module.exports = upload;
