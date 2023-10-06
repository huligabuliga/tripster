import { Group } from "../models/Group.js";
import { User } from "../models/user.model.js";
import { Expense } from "../models/Expense.js";


//getExpensesById
export const getExpenseById = async (req, res) => {
  try {
    const expenseId = req.params.expenseId;

    // Find expense by ID
    const expense = await Expense.findById(expenseId);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json(expense);
  } catch (error) {
    console.error('Error al obtener expense por ID:', error);
    res.status(500).json({ message: 'Error al obtener expense por ID' });
  }
};


//createExpense
export const createExpense = async (req, res) => {
        try {
            // Create the expense document
            const newExpense = new Expense({
                name: req.body.name,
                categories: req.body.categories,
                currency: req.body.currency,
                totalAmount: req.body.totalAmount,
                payer: req.body.payer,
                payees: req.body.payees,
                group: req.body.group,
                // Other expense properties
            });
    
            // Save the expense to the database
            await newExpense.save();
    
            // Get the group ID from the request payload
            const groupId = req.body.group;
    
            // Update the group document to include the new expense's ID
            const group = await Group.findById(groupId);
            if (!group) {
                return res.status(404).json({ message: 'Group not found' });
            }
            group.expenses.push(newExpense._id);
            await group.save();
    
            res.status(201).json({ message: 'Expense created successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error: ' + error.message });
        }
    };
