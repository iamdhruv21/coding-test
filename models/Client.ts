import mongoose, { Document, Schema } from 'mongoose';

export interface IClient extends Document {
  name: string;
  description: string;
  designation: string;
  image: string;
  createdAt: Date;
}

const ClientSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Client description is required'],
      trim: true,
    },
    designation: {
      type: String,
      required: [true, 'Client designation is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Client image is required'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Client || mongoose.model<IClient>('Client', ClientSchema);