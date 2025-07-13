import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  image: string;
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Project image is required'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);