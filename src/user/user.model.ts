import mongoose, { Schema, Document } from 'mongoose';
import { tableNames } from '../config';
// Define the interface for the User document
export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  isVIP?: boolean;
  isAdmin?: boolean;
}

// Define the schema for the User model
const UserSchema: Schema = new Schema({
  email:String,
  firstName:String,
  lastName:String,
  password: String,
  isVIP: { type: Boolean, default: false },
  isAdmin: { type: Boolean,default:false }
}, {
  timestamps: true 
});

// Create the User model
const User = mongoose.model<IUser>(tableNames.user, UserSchema);

export default User;