import mongoose, { Document, Schema } from 'mongoose';

export interface IContact extends Document {
  fullName: string;
  email: string;
  mobile: string;
  city: string;
  createdAt: Date;
}

const ContactSchema: Schema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);