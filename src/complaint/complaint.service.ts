import { HTTPError } from '../errors/HTTPError';
import { Complaint, IComplaint } from './complaint.model';
import { errorMessages } from './complaint.errorMessages';
import { getIo } from '../socket';

// Function to add a category
export const addComplaint = async (categoryData: Partial<IComplaint>): Promise<string> => {
    const complaint = new Complaint(categoryData);
    await complaint.save();
    console.log('Category added successfully');
    return complaint._id;
  
};


  // Function to delete a category
export const deleteComplaint = async (complaintId: string,userId: string): Promise<void> => {
    
     const deleted = await Complaint.findById(complaintId);
      if(!deleted){
        const error = new HTTPError(errorMessages.notfound.message,errorMessages.notfound.statusCode);
        throw error;
    }
    if(!(deleted.createdBy==userId)){
        const error = new HTTPError(errorMessages.unauthorized.message,errorMessages.unauthorized.statusCode);
        throw error;
    }
    await deleted.deleteOne();
    console.log('Complaint deleted successfully');
    
  };
  //
//
export const getComplaint = async (complaintId: string,userId: string): Promise<IComplaint> => {
    
    const currentComplaint = await Complaint.findById(complaintId).populate('categories');
     if(!currentComplaint){
       const error = new HTTPError(errorMessages.notfound.message,errorMessages.notfound.statusCode);
       throw error;
   }
   if(!(currentComplaint.createdBy==userId)){
       const error = new HTTPError(errorMessages.unauthorized.message,errorMessages.unauthorized.statusCode);
       throw error;
   }
   return currentComplaint;
   
 };
  // 
export const getMyComplaint = async (userId:String,page:number,limit:number): Promise<any> => {
   
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalCount = await Complaint.countDocuments({ createdBy: userId });
    const totalPages = Math.ceil(totalCount / limit);

    const complaints = await Complaint.find({ createdBy: userId })
      .limit(limit)
      .skip(startIndex)
      .populate('categories')
      .sort({ createdAt: -1 });

    const paginationInfo = {
      currentPage: page,
      totalPages: totalPages,
      totalComplaints: totalCount
    };

    return {  paginationInfo,complaints };
  
};


export const updateComplaint = async (complaintId: string,status: IComplaint["status"]): Promise<void> => {
    
    
    const currentComplaint = await Complaint.findById(complaintId).populate('categories');
     if(!currentComplaint){
       const error = new HTTPError(errorMessages.notfound.message,errorMessages.notfound.statusCode);
       throw error;
   }
   
currentComplaint.status=status;
await currentComplaint.save();

getIo().to(currentComplaint.createdBy.toString()).emit('statusChanged',"complaint status changed to "+status);

 };

 

 export const filterComplaints = async (page:number,limit:number,query:{createdBy?: string;status?: string;}): Promise<any> => {
   
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;


  


  const totalCount = await Complaint.countDocuments(query);
  const totalPages = Math.ceil(totalCount / limit);

  const complaints = await Complaint.find(query)
    .limit(limit)
    .skip(startIndex)
    .populate('categories')
    .sort({ createdAt: -1 });

  const paginationInfo = {
    currentPage: page,
    totalPages: totalPages,
    totalComplaints: totalCount
  };

  return {  paginationInfo,complaints };

};