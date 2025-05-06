import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  address1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  dateOfBirth?: string;
  ssn?: string;
  image?: string;
  provider?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
    },
    address1: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    ssn: {
      type: String,
    },
    image: {
      type: String,
    },
    provider: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
