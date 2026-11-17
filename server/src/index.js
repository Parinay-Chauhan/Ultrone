import "dotenv/config";
import connectDB from "./db/index.js";
import { app } from "./app.js";

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });

app.on("error", (error) => {
  console.error("Server error:", error);
});
