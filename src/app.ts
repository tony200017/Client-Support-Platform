import express from 'express';
import bodyParser from 'body-parser';
import { connect } from 'mongoose';
import { mongodbConnection } from './config';

import userRoutes from './user/user.routes';
import otpRoutes from './otp/opt.routes';
import ErrorMiddleware from './Middleware/errorMiddleware';
import categoryRoutes from './category/category.routes';
import complaintRoutes from './complaint/complaint.routes';
import { init } from './socket';

//
async function connectToDatabase() {
    try {
      await connect(mongodbConnection);
      console.log('Connected Successfully');
    } catch (err) {
      console.error(err);
    }
  }
 connectToDatabase();
 const app =express();
 app.use(bodyParser.json());
 app.use('/users',userRoutes);
 app.use('/otp',otpRoutes);
 app.use('/category',categoryRoutes);
 app.use('/complaint',complaintRoutes);
 app.use(ErrorMiddleware);
 const server = app.listen(3000,()=>{console.log("server started");
 const io = init(server);
 io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('join',room=>{
    console.log("client joined room ",room);
    socket.join(room)});
});



});
