import app from "./app.js";
import cloudinary from "cloudinary";
import cors from "cors";  // Import the CORS middleware

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

// Enable CORS with specific configuration
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true, // Allow cookies and other credentials to be sent
}));

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
