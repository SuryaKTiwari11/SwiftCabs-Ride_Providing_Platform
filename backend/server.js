import { createServer } from "http";
import app from "./app.js";
import express from "express";
import userRoutes from "./routes/user.routes.js";

const port = process.env.PORT || 4000;
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRoutes);

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
