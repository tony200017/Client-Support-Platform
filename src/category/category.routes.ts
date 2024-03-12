import {Router} from 'express';
import {validate} from 'express-validation';
import { categorySchema, updatecategorySchema, paramsIdSchema,categoryPaginateSchema } from './category.validation';
import {categoryAdd,categoryDelete,categoryUpdate,allCategories,categoryGet,categories} from './category.controller';
import isAuth from '../Middleware/Auth';
import isAdmin from '../Middleware/admin';
//import isClient from '../Middleware/client';




const router = Router();
router.get('/' ,allCategories);
router.post('/add',isAuth,isAdmin,validate(categorySchema) ,categoryAdd);
router.put('/update/:id',isAuth,isAdmin,validate(updatecategorySchema) ,categoryUpdate);
router.delete('/delete/:id',isAuth,isAdmin,validate(paramsIdSchema) ,categoryDelete);
router.get('/categories',isAuth,isAdmin ,validate(categoryPaginateSchema),categories);
router.get('/get/:id',isAuth,isAdmin,validate(paramsIdSchema) ,categoryGet);



export default router;