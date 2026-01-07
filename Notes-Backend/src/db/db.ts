import mongoose from "mongoose"
import logger from "../logger/logger"

const connectToDB = (): void => {
  const mongoUri = process.env.MONGO_URI

  if (!mongoUri) {
    throw new Error("MONGO_URI is not defined in environment variables")
  }

  mongoose
    .connect(mongoUri)
    .then(() => {
        logger.info("✅ Connected to MongoDB successfully")
        })
    .catch((err: Error) => {
        logger.error("❌ Failed to connect to MongoDB", err)
      process.exit(1)
    })
}

export default connectToDB
