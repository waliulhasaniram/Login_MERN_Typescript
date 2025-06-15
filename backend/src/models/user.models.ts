import 'dotenv/config';
import { Schema, model, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';

// ------------------- ENV SAFETY -------------------
const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
} = process.env;

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error('JWT secrets are missing in environment variables.');
}

const accessTokenExpiry: SignOptions['expiresIn'] = (ACCESS_TOKEN_EXPIRY as SignOptions['expiresIn']) || '15m';
const refreshTokenExpiry: SignOptions['expiresIn'] = (REFRESH_TOKEN_EXPIRY as SignOptions['expiresIn']) || '7d';

// ------------------- INTERFACE -------------------
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  refreshToken?: string;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

// ------------------- SCHEMA -------------------
const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    refreshToken: { type: String, trim: true },
  },
  { timestamps: true }
);

// ------------------- HOOK -------------------
userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// ------------------- METHODS -------------------
userSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function (): string {
  return jwt.sign(
    { _id: this._id.toString() },
    ACCESS_TOKEN_SECRET!,
    { expiresIn: accessTokenExpiry }
  );
};

userSchema.methods.generateRefreshToken = function (): string {
  return jwt.sign(
    { _id: this._id.toString() },
    REFRESH_TOKEN_SECRET!,
    { expiresIn: refreshTokenExpiry }
  );
};

// ------------------- MODEL -------------------
export const User: Model<IUser> = model<IUser>('user', userSchema);
