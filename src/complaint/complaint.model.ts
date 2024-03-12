import mongoose, { Schema, Document } from 'mongoose';
import { tableNames } from '../config';


// Define the interface for the complaint document
export interface IComplaint extends Document {
  title: string;
  description: string;
  categories: string[]; // Assuming category IDs are represented as strings
  status: 'PENDING' | 'INPROGRESS' | 'RESOLVED' | 'REJECTED';
  createdBy: string; // Assuming user ID is represented as a string
}

// Define the Mongoose schema for the complaint
const complaintSchema: Schema = new Schema({
  title:String,
  description: String,
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category',
  }],
  status: {
    type: String,
    default: 'PENDING'
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
}, { timestamps: true });


complaintSchema.index({ createdBy: 1 });
// Create the Mongoose model for the complaint
export const Complaint = mongoose.model<IComplaint>(tableNames.complaint, complaintSchema);