const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");

const connectDB = require("./config/db.config");
const dataRoutes = require("./routes/data.route");
const apiLimiter = require("./helper/apiLimiter");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

//* middlewares
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(morgan("combined"));
app.use("/api", apiLimiter);

//* routes
app.use("/api/data", dataRoutes);

app.use(errorHandler);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on the port of ${PORT}`);
});
