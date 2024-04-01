const Task = require("../models/Task");
const User=require("../models/User");
const {validationResult}=require('express-validator')


//creat task  //login required
const createTask=async(req,res)=>{
    try {

        const {title,description,assignee,priority,status}=req.body;
       
        

        //validating the result
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            
            return res.status(400).json({ error: errors.array() })
        }

        

        //check wether there is a task with same title if there is ,ask to change the title
        const taskExists=await Task.findOne({title});
        if(taskExists){
            return res.status(400).json({error:'Change the name of the task, task with this name already exists'})
        }

        
        
        //check wether assigne exist or not
        const assigneExists=await User.findOne({email:assignee});
        if(!assigneExists){
            return res.status(400).json({error:"Assignee does not work here"})
        }

        let endDate=null;

        if(status==='Completed'){
            const currentDate=new Date();
            currentDate.setHours(0,0,0,0);
            endDate=currentDate;
        }

        //now create the task
        let task=await Task.create({
            title,
            description,
            assignee:assigneExists._id,
            priority,
            status,
            endDate
        })
        task=await Task.findById(task._id).populate('assignee','name email _id');

        return res.status(200).json({msg:"Task created successfully",task});
        

    } catch (error) {
        
        return res.status(500).json({
            error: "Internal server error"
        })       
    }

}


//get all the task //login required
const getTask=async(req,res)=>{
    try {
        const employee=await User.find();
        const task=await Task.find().populate('assignee','name email _id');
        let Pending=[],InProgress=[],Completed=[],Deployed=[],Deffered=[];
        task.map((t)=>{
             switch(t.status){
                case 'Pending':
                    Pending.push(t);
                    break;
                case 'In Progress':
                    InProgress.push(t);
                    break;
                case 'Completed':
                    Completed.push(t);
                    break;
                case 'Deployed':
                    Deployed.push(t);
                    break;
                case 'Deffered':
                    Deffered.push(t);
                    break;
                default:
                    break;
             }           
        })

        
        return res.status(200).json({
            employee,
            task:{
                Pending,
                InProgress,
                Completed,
                Deployed,
                Deffered
            }
        })
        
    } catch (error) {
       
        return res.status(500).json({
            error: "Internal server error"
        })   
        
    }
}


//editting the task //login required

const editTask=async(req,res)=>{
    try {

        const {taskId,priority,status}=req.body;
        console.log(req.body);
        
        //check if the task is assigned to the user
        const task=await Task.findById(taskId);
        if(!task){
            return res.status(400).json({error:"Task does not exists"});
        }
        console.log(`Task assine ${task.assignee}  req.user.id ${req.user.id} `)
        if(task.assignee!=req.user.id){
            return res.status(400).json({error:"Not authorised"});                                    
        }

        let endDate=null;
        if(status==='Completed'){
            const currentDate=new Date();
            currentDate.setHours(0,0,0,0);
            endDate=currentDate;
        }


        const updateTask=await Task.findOneAndUpdate({_id:taskId},{priority,status,endDate},{new:true}).populate('assignee','name email _id');;
        console.log(updateTask);

        return res.status(200).json({
            msg:"Task editted successfully",
            task:updateTask
        })     

        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal server error"
        })  
        
    }
}


const deleteTask=async(req,res)=>{

     //validating the result
     

        const taskId=req.params.id;
     console.log(taskId);
      //check if the task is assigned to the user
      const task=await Task.findById(taskId);
        console.log(task);

        if(!task){
            return res.status(400).json({error:"Task does not exists"})
        }
    
      if( task.assignee!=req.user.id){
          return res.status(400).json({error:"Not authorised"});                                    
      }

      //if task is completed then it can not be deleted

      if(task.status==='Completed'){
        return res.status(400).json({error:"Completed task can not be deleted"})
      }

      //delete task
      const deletedTask=await Task.findOneAndDelete(task._id);
      
      
      return res.status(200).json({
        msg:'Task Deleted successfully',
        deletedTask
      })



}



module.exports={
    createTask,
    getTask,
    editTask,
    deleteTask
}