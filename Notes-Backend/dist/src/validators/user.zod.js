"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userZodSchema = exports.expenseZodSchema = void 0;
const zod_1 = require("zod");
/* ===========================
   EXPENSE (SUB DOCUMENT)
=========================== */
exports.expenseZodSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    id: zod_1.z.string().min(1),
    time: zod_1.z.string().min(1),
    category: zod_1.z.string().min(1),
    amount: zod_1.z.number().positive(),
    date: zod_1.z.string().min(1),
    month: zod_1.z.string().min(1),
    notes: zod_1.z.string().optional(),
});
/* ===========================
   USER ZOD SCHEMA
=========================== */
exports.userZodSchema = zod_1.z.object({
    fullName: zod_1.z.object({
        firstName: zod_1.z.string().min(1).optional(),
        lastName: zod_1.z.string().min(1).optional(),
    }).optional(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    refreshToken: zod_1.z.string().optional(),
    totalBudget: zod_1.z.number().min(0).default(0),
    PhoneNumber: zod_1.z.string()
        .regex(/^[0-9]\d{9}$/, "Invalid phone number").optional(),
    expenses: zod_1.z.array(exports.expenseZodSchema).default([]),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
