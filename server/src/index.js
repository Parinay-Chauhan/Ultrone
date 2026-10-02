import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

const port = process.env.PORT || 3001;

// Start HTTP server FIRST — so Render health check always works
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Connect MongoDB in background — server stays up even if DB fails
connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    // Server keeps running — health check still responds
  });

app.on("error", (error) => {
  console.error("Server error:", error);
});
