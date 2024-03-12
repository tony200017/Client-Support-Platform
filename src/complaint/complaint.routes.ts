import {Router} from 'express';
import {validate} from 'express-validation';
import { complaintValidationSchema ,paramsIdSchema,myComplaintSchema,updateComplaintSchema,getComplaintSchema} from './complaint.validation';
import {complaintAdd,complaintDelete,complaintGet,myComplaints,complaintUpdate,getComplaints} from './complaint.controller';
import isAuth from '../Middleware/Auth';
import isClient from '../Middleware/client';
import isAdmin from '../Middleware/admin';




const router = Router();
router.post('/add',isAuth,isClient,validate(complaintValidationSchema) ,complaintAdd);
router.get('/mycomplaints',isAuth,isClient,validate(myComplaintSchema) ,myComplaints);

router.get('/getcomplaints',isAuth,isAdmin,validate(getComplaintSchema) ,getComplaints);

router.delete('/delete/:id',isAuth,isClient,validate(paramsIdSchema) ,complaintDelete);
router.get('/:id',isAuth,isClient,validate(paramsIdSchema) ,complaintGet);
router.put('/:id',isAuth,isAdmin,validate(updateComplaintSchema) ,complaintUpdate);

export default router;