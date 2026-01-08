import { z } from "zod"

/* ===========================
   EXPENSE (SUB DOCUMENT)
=========================== */

export const expenseZodSchema = z.object({
  title: z.string().min(1),
  id: z.string().min(1),
  time: z.string().min(1),
  category: z.string().min(1),
  amount: z.number().positive(),
  date: z.string().min(1),
  month: z.string().min(1),
  notes: z.string().optional(),
})

/* ===========================
   USER ZOD SCHEMA
=========================== */

export const userZodSchema = z.object({
  fullName: z.object({
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
  }).optional(),

  email: z.string().email(),

  password: z.string().min(6),

  refreshToken: z.string().optional(),

  totalBudget: z.number().min(0).default(0),
  PhoneNumber: z.string()
  .regex(/^[0-9]\d{9}$/, "Invalid phone number").optional(),

  expenses: z.array(expenseZodSchema).default([]),

  createdAt: z.date().optional(),

  updatedAt: z.date().optional(),
})

/* ===========================
   TYPE INFERENCE
=========================== */

export type UserZodInput = z.infer<typeof userZodSchema>
