"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const { combine, timestamp, printf, colorize, errors } = winston_1.default.format;
/* ------------------ LOG FORMAT ------------------ */
const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} | ${level} | ${stack || message}`;
});
/* ------------------ TRANSPORTS ------------------ */
// Console (dev)
const consoleTransport = new winston_1.default.transports.Console({
    level: "debug",
    format: combine(colorize(), timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), errors({ stack: true }), logFormat)
});
// File – errors only
const errorFileTransport = new winston_daily_rotate_file_1.default({
    level: "error",
    filename: "logs/error-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
});
// File – all logs
const combinedFileTransport = new winston_daily_rotate_file_1.default({
    filename: "logs/combined-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "30d",
});
/* ------------------ LOGGER ------------------ */
const logger = winston_1.default.createLogger({
    level: "info",
    format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), errors({ stack: true }), logFormat),
    transports: [
        consoleTransport,
        errorFileTransport,
        combinedFileTransport,
    ],
    exitOnError: false,
});
exports.default = logger;
