import { app } from "./app.js";
import { config } from "dotenv";
import { connectDB } from "./data/database.js";

config();

const PORT = process.env.PORT || 4000;

connectDB(process.env.DB_URL);

app.listen(PORT, () => console.log("Server is working"));
