import { Group } from "../models/Group.js";
import { User } from "../models/user.model.js";

//create group 
export const createGroup = async (req, res) => {
  try {
      const newGroup = Group({
          name: req.body.name,
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

      res.status(201).json({ message: "Group created successfully" });
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

  