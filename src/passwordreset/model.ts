import mongoose, { Schema, Document } from 'mongoose';
import { tableNames } from '../config';

export interface IpasswordReset extends Document {
  resetToken: string;
  resetExpires: Date;
  userId:mongoose.Types.ObjectId;
}


const PasswordResetSchema: Schema = new Schema({
  resetToken: String,
  resetExpires: Date,
  userId:{
    type: mongoose.Types.ObjectId,
    ref: 'User' // Reference the User model
}
}, {
  timestamps: true 
});

PasswordResetSchema.index({ userId: 1 });

const PasswordReset = mongoose.model<IpasswordReset>(tableNames.passwordReset, PasswordResetSchema);

export default PasswordReset;