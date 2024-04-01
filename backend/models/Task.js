
const mongoose=require('mongoose');

const taskSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    assignee:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true,
    },
    priority:{
        type:String,
        enum:['P0','P1','P2'],
        required:true,
    },
    status:{
        type:String,
        enum:['Pending' ,'In Progress', 'Completed',  'Deployed',  'Deffered'],
        required:true,
    },
    startDate:{
        type:Date,
        default:function(){
            const currentDate=new Date();
            currentDate.setHours(0,0,0,0);
            return currentDate;
        },
        required:true,
    },
    endDate:{
        type:Date,
        
    }
})

const Task=mongoose.model('Task',taskSchema);
module.exports=Task;
