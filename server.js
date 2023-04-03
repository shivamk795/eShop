import express from "express";
import * as dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoute.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import path from "path";

const app = express();
const PORT = process.env.port || 5000;

dotenv.config();
connectDB();
// app.use((req, res, next) => {
//   console.log(req.originalUrl);
//   next();
// });

app.use(express.urlencoded());
// app.use(bodyParser.json());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.resolve(__dirname, "./client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build/", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is Running");
  });
}
app.use(notFound);
app.use(errorHandler);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.listen(
  PORT,
  console.log(`Running on port ${PORT}, mode=${process.env.NODE_ENV}`)
);
