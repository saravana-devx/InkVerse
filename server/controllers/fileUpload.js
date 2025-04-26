const cloudinary = require("cloudinary").v2;

async function uploadToCloudinary(file, folder) {
  const options = { folder };
  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}
exports.imageUpload = async (req, res) => {
  try {
    const image = req.files?.image;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is missing",
      });
    }

    // Check if the file is an image by MIME type
    if (!image.mimetype.startsWith("image/")) {
      return res.status(400).json({
        success: false,
        message: "Uploaded file is not an image",
      });
    }

    // Upload to Cloudinary or your desired storage
    const response = await uploadToCloudinary(image, "Blog");

    return res.json({
      success: true,
      imageUrl: response.secure_url,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error during image upload",
    });
  }
};
