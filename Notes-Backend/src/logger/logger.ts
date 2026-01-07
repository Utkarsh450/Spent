import winston from "winston"
import DailyRotateFile from "winston-daily-rotate-file"

const { combine, timestamp, printf, colorize, errors } = winston.format

/* ------------------ LOG FORMAT ------------------ */
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} | ${level} | ${stack || message}`
})

/* ------------------ TRANSPORTS ------------------ */

// Console (dev)
const consoleTransport = new winston.transports.Console({
  level: "debug",
  format: combine(
    colorize(),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    logFormat
  )
})

// File – errors only
const errorFileTransport = new DailyRotateFile({
  level: "error",
  filename: "logs/error-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
})

// File – all logs
const combinedFileTransport = new DailyRotateFile({
  filename: "logs/combined-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "30d",
})

/* ------------------ LOGGER ------------------ */
const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    consoleTransport,
    errorFileTransport,
    combinedFileTransport,
  ],
  exitOnError: false,
})

export default logger
