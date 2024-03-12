import { HTTPError } from '../errors/HTTPError';
import { Category, ICategory } from './category.model';
import { errorMessages } from './category.errorMessages';

// Function to add a category
export const addCategory = async (categoryData: Partial<ICategory>): Promise<string> => {
 
    const category = new Category(categoryData);
    await category.save();
    console.log('Category added successfully');
    return category._id;
  
};

// Function to update a category
export const updateCategory = async (categoryId: string, categoryData: Partial<ICategory>): Promise<void> => {
   // Check if the category exists
   const existingCategory = await Category.findById(categoryId);
   if (!existingCategory) {
    const error = new HTTPError(errorMessages.notfound.message,errorMessages.notfound.statusCode);
    throw error;
   }
      await Category.findByIdAndUpdate(categoryId, categoryData, { new: true });
      console.log('Category updated successfully');
   
  };
  
  // Function to delete a category
export const deleteCategory = async (categoryId: string): Promise<void> => {
    
    const deleted = await Category.findByIdAndDelete(categoryId);
    if(!deleted){
        const error = new HTTPError(errorMessages.notfound.message,errorMessages.notfound.statusCode);
        throw error;
    }


      console.log('Category deleted successfully');
    
  };


  export const getCategories = async (): Promise<ICategory[]> => {
 return   await Category.find();
};

//
export const getCategory = async (complaintId: string): Promise<ICategory> => {
    
    const currentCategory = await Category.findById(complaintId);
     if(!currentCategory){
       const error = new HTTPError(errorMessages.notfound.message,errorMessages.notfound.statusCode);
       throw error;
   }
  
   return currentCategory;
   
 };
  // 
export const getAllCategory = async (page:number,limit:number): Promise<any> => {
   
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalCount = await Category.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    const categories = await Category.find()
      .limit(limit)
      .skip(startIndex)
      .sort({ createdAt: -1 });

    const paginationInfo = {
      currentPage: page,
      totalPages: totalPages,
      totalCategories: totalCount
    };

    return {  paginationInfo,categories };
  
};

