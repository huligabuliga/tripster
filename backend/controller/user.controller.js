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

export const getUserInfo = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userInfo = {
      username: user.username,
      email: user.email,
      groups: user.groups, 
    };

    console.log('User Info:', userInfo);

    res.status(200).json(userInfo);
  } catch (error) {
    console.error('There was an error retrieving the user information:', error);
    res.status(500).json({ message: 'Error retrieving the information' });
  }
};

export const getUserGroups = async (req, res) => {
    try {
      const userId = req.params.userId;
      
      const user = await User.findById(userId).populate('groups');
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const userGroups = user.groups;
  
      console.log('User Groups:', userGroups);
      res.status(200).json(userGroups);
    } catch (error) {
      console.error('Error while finding the user´s group:', error);
      res.status(500).json({ message: 'Error finding the groups' });
    }
  };