import dotenv from 'dotenv';
dotenv.config();


const MONGODB_CONNECTION_LINK: string = process.env.MONGODB_CONNECTION_LINK || "";
const JWT_TOKEN_RANDOM_STRING: string = process.env.JWT_TOKEN_RANDOM_STRING || "";
const EMAIL_USER: string = process.env.EMAIL_USER || "";
const EMAIL_PASSWORD: string = process.env.EMAIL_PASSWORD || "";

export const tableNames: {[key: string]: string} = {
    user: 'User',
    otp:'Otp',
    passwordReset:'PasswordReset',
    category:'Category',
    complaint:'Complaint'
};

export const mongodbConnection: string = MONGODB_CONNECTION_LINK;
export const jwtRandomString: string = JWT_TOKEN_RANDOM_STRING;

export const emailUser: string = EMAIL_USER;
export const emailPassword: string = EMAIL_PASSWORD;
