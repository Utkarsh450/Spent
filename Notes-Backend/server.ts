import { config as dotenvConfig } from "dotenv";
import app from "./src/app"
import logger from "./src/logger/logger";
import connectToDB from "./src/db/db";
dotenvConfig();
connectToDB();

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`)
})
