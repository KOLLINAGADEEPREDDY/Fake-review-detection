// // const express = require("express");
// // const mongoose = require("mongoose");
// // const bodyParser = require("body-parser");
// // const cors = require("cors");
// // require("dotenv").config();

// // const app = express();
// // const PORT = process.env.PORT || 5000;

// // // Middleware
// // app.use(cors());
// // app.use(bodyParser.json());

// // // MongoDB Connection
// // mongoose
// //   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// //   .then(() => console.log("Connected to MongoDB Atlas"))
// //   .catch((err) => console.error("Error connecting to MongoDB:", err));

// // // User Schema
// // const userSchema = new mongoose.Schema({
// //   email: { type: String, required: true, unique: true },
// //   password: { type: String, required: true },
// // });

// // const User = mongoose.model("User", userSchema);

// // // Review Schema
// // const reviewSchema = new mongoose.Schema({
// //   userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
// //   reviewText: { type: String, required: true },
// //   createdAt: { type: Date, default: Date.now },
// // });

// // const Review = mongoose.model("UserReview", reviewSchema);

// // // Sign-up Route
// // app.post("/signup", async (req, res) => {
// //   const { email, password } = req.body;

// //   // Validate fields
// //   if (!email || !password) {
// //     return res.status(400).json({ error: "All fields are required" });
// //   }

// //   try {
// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) {
// //       return res.status(400).json({ error: "User already exists" });
// //     }

// //     const newUser = new User({ email, password });
// //     await newUser.save();
// //     res.status(201).json({ message: "User registered successfully" });
// //   } catch (err) {
// //     console.error("Error registering user:", err);
// //     res.status(500).json({ error: "Internal server error" });
// //   }
// // });

// // // Login Route
// // app.post("/login", async (req, res) => {
// //   const { email, password } = req.body;

// //   // Validate fields
// //   if (!email || !password) {
// //     return res.status(400).json({ error: "Email and password are required" });
// //   }

// //   try {
// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return res.status(400).json({ error: "Invalid email or password" });
// //     }

// //     if (user.password !== password) {
// //       return res.status(400).json({ error: "Invalid email or password" });
// //     }

// //     // Successful login, send a success response with a redirect instruction
// //     res.status(200).json({ message: "Login successful", redirect: "input.html", userId: user._id });
// //   } catch (err) {
// //     console.error("Error logging in:", err);
// //     res.status(500).json({ error: "Internal server error" });
// //   }
// // });

// // // Route to save user review
// // app.post("/api/reviews", async (req, res) => {
// //   const { userId, reviewText } = req.body;

// //   // Validate fields
// //   if (!userId || !reviewText) {
// //     return res.status(400).json({ error: "User ID and review text are required" });
// //   }

// //   try {
// //     // Save the review to the "user-reviews" collection
// //     const newReview = new Review({ userId, reviewText });
// //     await newReview.save();

// //     res.status(201).json({ message: "Review saved successfully", review: newReview });
// //   } catch (err) {
// //     console.error("Error saving review:", err);
// //     res.status(500).json({ error: "Internal server error" });
// //   }
// // });

// // // Logout Route
// // app.post("/logout", (req, res) => {
// //   // Here we clear the session or token, based on your auth strategy
// //   res.status(200).json({ message: "Logout successful" });
// // });

// // // Start Server
// // app.listen(PORT, () => {
// //   console.log(`Server running on http://localhost:${PORT}`);
// // });


// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Serve static files from a "public" directory
// const path = require("path");
// app.use(express.static(path.join(__dirname, "public")));

// // Default route to serve the main page
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "form.html"));
//   res.sendFile(path.join(__dirname, "input.html"));
//   res.sendFile(path.join(__dirname, "server.js"));

//   res.sendFile(path.join(__dirname, "style.css"));
// });

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connected to MongoDB Atlas"))
//   .catch((err) => console.error("Error connecting to MongoDB:", err));

// // User Schema
// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// const User = mongoose.model("User", userSchema);

// // Review Schema
// const reviewSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
//   reviewText: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const Review = mongoose.model("UserReview", reviewSchema);

// // Sign-up Route
// app.post("/signup", async (req, res) => {
//   const { email, password } = req.body;

//   // Validate fields
//   if (!email || !password) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: "User already exists" });
//     }

//     const newUser = new User({ email, password });
//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     console.error("Error registering user:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Login Route
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   // Validate fields
//   if (!email || !password) {
//     return res.status(400).json({ error: "Email and password are required" });
//   }

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ error: "Invalid email or password" });
//     }

//     if (user.password !== password) {
//       return res.status(400).json({ error: "Invalid email or password" });
//     }

//     // Successful login, send a success response with a redirect instruction and userId
//     res.status(200).json({ message: "Login successful", redirect: "input.html", userId: user._id });
//   } catch (err) {
//     console.error("Error logging in:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Route to save user review
// app.post("/api/reviews", async (req, res) => {
//   const { userId, reviewText } = req.body;

//   // Validate fields
//   if (!userId || !reviewText) {
//     return res.status(400).json({ error: "User ID and review text are required" });
//   }

//   try {
//     // Save the review to the "user-reviews" collection
//     const newReview = new Review({ userId, reviewText });
//     await newReview.save();

//     res.status(201).json({ message: "Review saved successfully", review: newReview });
//   } catch (err) {
//     console.error("Error saving review:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Logout Route
// app.post("/logout", (req, res) => {
//   // Here we clear the session or token, based on your auth strategy
//   res.status(200).json({ message: "Logout successful" });
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });




const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// UPDATED: Use Port 3000 to avoid system conflicts on Mac Port 5000
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static assets from frontend folder
app.use('/static', express.static(path.join(__dirname, '../frontend/static')));

// HTML Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/templates/form.html"));
});

app.get("/input", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/templates/input.html"));
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ Database connection error:", err));

// Use the external auth routes
app.use("/", require("./routes/auth"));

// Route to save user review
const Review = require("./models/Review");
app.post("/api/reviews", async (req, res) => {
  const { userId, reviewText } = req.body;
  if (!userId || !reviewText) return res.status(400).json({ error: "Required fields missing" });
  try {
    const newReview = new Review({ userId, reviewText });
    await newReview.save();
    res.status(201).json({ message: "Review saved to database" });
  } catch (err) {
    res.status(500).json({ error: "Internal error saving review" });
  }
});

// Logout Route
app.post("/logout", (req, res) => {
    // Add logic to clear sessions if you implement them later
    res.status(200).json({ message: "Logged out", redirect: "/" });
});

app.listen(PORT, () => {
    console.log(`🚀 Node.js Server running on http://localhost:${PORT}`);
    console.log(`💡 Remember: AI Engine must be running on Port 5001`);
});