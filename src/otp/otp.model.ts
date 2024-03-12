import mongoose, { Schema, Document } from 'mongoose';
import { tableNames } from '../config';

export interface Iotp extends Document {
  otp: string;
  email: string;
  otpExpires: Date;
  retrycount: number;
  userId:mongoose.Types.ObjectId;
  verificationToken: string;
}


const OtpSchema: Schema = new Schema({
    otp: String,
    email: String,
    otpExpires: Date,
    retrycount: {type:Number,default:0},
    userId:{
      type: mongoose.Types.ObjectId,
      ref: 'User' // Reference the User model
  },
    verificationToken: String
}, {
  timestamps: true 
});

OtpSchema.index({ userId: 1 });

const Otp = mongoose.model<Iotp>(tableNames.otp, OtpSchema);

export default Otp;