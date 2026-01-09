import mongoose, { Schema, Document } from "mongoose";
import jwt from "jsonwebtoken";
/* ===========================
   TYPES
=========================== */

interface FullName {
  firstName: string
  lastName: string
}

interface ExpenseData {
  title: string
  id: string
  time: string
  category: string
  amount: number
  date: string
  month: string
  notes?: string
}

export interface IUser extends Document {
  fullName: FullName
  email: string
  password: string
  refreshToken?: string
  PhoneNumber: string
  totalBudget: number
  expenses: ExpenseData[]

  // 👇 mongoose methods
  generateAccessToken(): string
  generateRefreshToken(): string
  verifyRefreshToken(token: string): boolean
}

/* ===========================
   SCHEMA
=========================== */

const expenseSchema = new Schema(
  {
    title: { type: String, required: true },
    id: { type: String, required: true },
    time: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: String, required: true },
    month: { type: String, required: true },
    notes: { type: String },
  },
  { _id: false }
)

const userSchema = new Schema<IUser>(
  {
    fullName: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      select: false,
    },

    refreshToken: {
      type: String,
      select: false,
    },

    totalBudget: {
      type: Number,
      default: 0,
    },
    PhoneNumber: {
        type: String,
    },

    expenses: {
      type: [expenseSchema],
      default: [],
    },
  },
  { timestamps: true }
)

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      userId: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: "4d",
    }
  )
}


userSchema.methods.generateRefreshToken = function () {
  const refreshToken = jwt.sign(
    {
      userId: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: "15d",
    }
  )

  // store refresh token in db
  this.refreshToken = refreshToken

  return refreshToken
}

userSchema.methods.verifyRefreshToken = function (token: string) {
  try {
    const decoded = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET as string
    )

    // token must match DB
    return this.refreshToken === token
  } catch {
    return false
  }
}

const User =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema)

export default User



