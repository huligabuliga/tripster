import express from 'express'
import { Expense } from '../models/Expense.js'
import { getExpenseById, createExpense, updateExpenseById } from '../controller/expense.controller.js'

const expenseRouter = express.Router()

// Routes
// /api/expenses/:expenseId
// /api/expenses/register

//get expenses by id route 
expenseRouter.get('/:expenseId', getExpenseById)

//create expense
expenseRouter.post('/register', createExpense)

//update expense by id
expenseRouter.put('/:expenseId/update', updateExpenseById)


export default expenseRouter