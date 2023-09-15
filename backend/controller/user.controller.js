import { User } from "../models/user.model.js"


export const deleteUser= async(req, res)=>{ 
    const user = await User.findById(req.params.id)
    
        if(err){
            return res.status(401).json({message: "unauthenticated"})
        }
        if(req.userId !== user._id.toString()){
            return res.status(401).json({message: "you can only delete your own account"})
        }
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "user deleted"} )

};