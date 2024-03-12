import mongoose, { Schema, Document } from 'mongoose';
import { tableNames } from '../config'; // Assuming you have a config interface defined

// Define interface for Category document
export interface ICategory extends Document {
  name: string;
  description: string;
}

// Define schema for Category
const categorySchema: Schema = new Schema({
  name: String,
  description:String ,
}, { timestamps: true });

// Export Mongoose model
export const Category = mongoose.model<ICategory>(tableNames.category, categorySchema);