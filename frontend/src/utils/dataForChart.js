export const transformDataForChart = (expenses, members, label) => {
    // Expenses comes as an array of objects, change it to an array of numbers
    // Members comes as an array with the names of the members
    const transformedExpenses = expenses.reduce((acc, expense) => {
        const uid = expense.payer
        acc[uid] = (acc[uid] || 0) + 1
        return acc
    }, {})
    
    const expensesCounts = Object.values(transformedExpenses)
    
    const transformedData = {
        labels: members,
        datasets: [{
            label: label,
            data: expensesCounts
    }]
    }

    console.log(transformedData)
    return transformedData
}