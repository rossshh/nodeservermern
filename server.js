require('dotenv').config();
const express = require("express");
const app = express();
const authRoute=require('./routes/authRoute');
const connectDB = require("./utils/connectDB");
const cors=require('cors');
const errorMiddleware=require('./middlewares/error-middleware');

const corsPolicy={
  origin:"*",
  credentials:true,
  methods:["GET","POST","PUT","DELETE"]
}
const PORT = process.env.PORT || 5000;
app.use(cors(corsPolicy));
app.use(express.json());
app.use("/api/auth/",authRoute);
app.use(errorMiddleware((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
}));


connectDB().then(() => {
  app.listen(PORT, () => {  
    console.log(`Server is running on port ${PORT}`);
  });
});

module.exports = app;
