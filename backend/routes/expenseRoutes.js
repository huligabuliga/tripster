import express from 'express'
import { Expense } from '../models/Expense.js'
import { getExpenseById, createExpense } from '../controller/expense.controller.js'

const expenseRouter = express.Router()

// Routes
// /api/expenses/:expenseId
// /api/expenses/register

//get expenses by id route 
expenseRouter.get('/:expenseId', getExpenseById)

//create expense
expenseRouter.post('/register', createExpense)


export default expenseRouter