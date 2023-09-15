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

