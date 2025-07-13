import mongoose, { Document, Schema } from 'mongoose';

export interface INewsletter extends Document {
  email: string;
  createdAt: Date;
}

const NewsletterSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Newsletter || mongoose.model<INewsletter>('Newsletter', NewsletterSchema);