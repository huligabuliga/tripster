import { Group } from "../models/Group.js";

//create group 
export const createGroup = async (req, res) => {
    try {
        const newGroup = Group({
            name: req.body.name,
            members: req.body.members,
            transactions: req.body.transactions,
        })

        await newGroup.save();
        res.status(201).send("group created")
    } catch (err) {
        res.status(500).json({ message: err.message })
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

