const User =require('../models/User')

const isAuthorised=async(req,res)=>{
    try {
        const user=await User.findById(req.user.id);
        if(user.role!=='admin'){
            return res.status(400).json({error:"Not authorised to perform this task"})
        }
        else{
            next();
        }
        
    } catch (error) {
        return res.status(500).json({error:"Internal server error"})

    }
}

module.exports=isAuthorised;