import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BarChart from '../components/BarChart'
import { transformDataForChart } from '../utils/dataForChart'

const Analytics = () => {
    const { groupId } = useParams()
    const [expenses, setExpenses] = useState([])
    const [members, setMembers] = useState([])
    const [barChartData, setBarChartData] = useState(false)

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
              const response = await fetch(`http://localhost:3001/api/groups/${groupId}/expenses`)
              const data = await response.json()
              setExpenses(data)
            } catch (error) {
              console.error('Error fetching expenses:', error)
            }
        }

        fetchExpenses()
    }, [groupId])

    useEffect(() => {
        const fetchMembers = async () => {
            try {
              const response = await fetch(`http://localhost:3001/api/groups/${groupId}/members`)
              const data = await response.json()
              setMembers(data)
            } catch (error) {
              console.error('Error fetching members:', error)
            }
        }

        fetchMembers()
    }, [groupId])

    useEffect(() => {
        // Prepare data format for chart
        const formattedData = transformDataForChart(expenses, members, 'Expenses Added by Member')
        setBarChartData(formattedData)
    }, [expenses, members])

    return (
        <div className='w-full min-h-screen'>
            {/** Header */}
            <div className=''>
                <h2 className='text-3xl font-bold mb-2 text-center'>Analytics</h2>
            </div>

            {/** Graphs and Charts */}
            <div className='flex flex-wrap justify-center'>
                {/** Bar Chart - Expenses by User */}
                <div className='w-3/4'>
                    { barChartData && <BarChart chartData={barChartData} /> }
                </div>
            </div>
        </div>
    )
}

export default Analytics