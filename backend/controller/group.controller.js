import { Group } from "../models/Group.js";
import { User } from "../models/user.model.js";

//create group 
export const createGroup = async (req, res) => {
    try {
        const newGroup = Group({
            name: req.body.name,
            description: req.body.description,
            members: req.body.members,
            transactions: req.body.transactions,
            code: Math.floor(Math.random() * 100000).toString().substr(0, 5),
        })
  
        await newGroup.save();
  
        // Update user with new group ID
        const userId = req.body.members[0]; // Assuming the first member is the user who created the group
        const user = await User.findById(userId);
        user.groups.push(newGroup._id);
        await user.save();
  
        res.status(201).json({ 
            message: "Group created successfully",
            groupId: newGroup._id, // Include the groupId in the response
            code: newGroup.code // Include the group code in the response
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
  }

export const getGroupExpenses = async (req, res) => {
    try {
      const groupId = req.params.groupId;
  
      // busca grupo por ID
      const group = await Group.findById(groupId).populate('expenses');
  
      if (!group) {
        return res.status(404).json({ message: 'Grupo no encontrado' });
      }
  
      const groupExpenses = group.expenses;
  
      res.status(200).json(groupExpenses);
    } catch (error) {
      console.error('Error al obtener expenses del grupo:', error);
      res.status(500).json({ message: 'Error al obtener expenses del grupo' });
    }
  };

  export const getGroupById = async (req, res) => {
    try {
      const groupId = req.params.groupId;
  
      // Find group by ID
      const group = await Group.findById(groupId);
  
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }
  
      res.status(200).json(group);
    } catch (error) {
      console.error('Error getting group by ID:', error);
      res.status(500).json({ message: 'Error getting group by ID' });
    }
  };

// join group 
export const joinGroup = async (req, res) => {
  try {
    const code = req.body.code;
    const userId = req.body.userId;

    // Find group by code
    const group = await Group.findOne({ code });

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Check if user is already a member of the group
    if (group.members.includes(userId)) {
      return res.status(400).json({ message: 'User is already a member of the group' });
    }

    // Add user to group
    group.members.push(userId);
    await group.save();

    // Update user with new group ID
    const user = await User.findById(userId);
    user.groups.push(group._id);
    await user.save();

    res.status(200).json({ message: 'User joined group successfully' });
  } catch (error) {
    console.error('Error joining group:', error);
    res.status(500).json({ message: 'Error joining group' });
  }
}

// returns a list of group.members and user.username
// export const groupMembers = [
//   { _id: '1235645fd', username: 'Juan' },
//   { _id: '1rgdvsdf4', username: 'Pedro' },
//   { _id: '1012iedsf', username: 'Miguel Ángel' },
//   { _id: '9nv9w8fwe', username: 'Guillermo' },
//   { _id: '678uhjsdf', username: 'Daniel' },
//   { _id: '6tfhjui9i', username: 'Mario' },
// ]

export const getGroupMembers = async (req, res) => {
  try {
    const groupId = req.params.groupId;

    // Find group by ID
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    const groupMembers = group.members;

    // Find users with group.members that matches user.id
    const users = await User.find({ _id: { $in: groupMembers } });

    // Transform the users array to an array of objects with only _id and username properties
    const transformedUsers = users.map(user => ({ _id: user._id, username: user.username }));

    res.status(200).json(transformedUsers);
  } catch (error) {
    console.error('Error getting group members:', error);
    res.status(500).json({ message: 'Error getting group members' });
  }
}

  