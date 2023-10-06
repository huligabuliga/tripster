import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Select from 'react-select'
import { categoryList, currencyList } from '../utils/constants';
import { transformPayees, payeeChange } from '../utils/newExpenseLogic';
import SplitSelection from '../components/SplitSelection';

// css file 
// import './NewExpense.css';

const NewExpense = () => {
  const { groupId } = useParams();
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [currency, setCurrency] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [payer, setPayer] = useState(null);
  const [payees, setPayees] = useState([]);
  const [split, setSplit] = useState('equally');

  // Fetch group members from backend and initialize payees state
  useEffect(() => {
    const fetchGroupMembers = async () => {
      try {
        const response = await axios.post(`http://localhost:3001/api/groups/${groupId}/members`);
        const groupMembers = response.data;
        initializePayees(groupMembers);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGroupMembers();
  }, [groupId]);

  // Add shareAmount and sharePercentage properties to payees
  const initializePayees = (groupMembers) => {
    const payees = groupMembers.map((payee) => ({
      ...payee,
      involved: false,
      shareAmount: 0,
      sharePercentage: 0,
    }));
    setPayees(payees);
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
  
    try {
      // Clean up payees array before sending it to backend
      formatPayees()
      console.log('Payees', payees)
      console.log('response:', {
        name: name,
        categories: categories.map(c => (c.value)),
        currency: currency.value,
        totalAmount: totalAmount,
        payer: payer.value,
        payees,
        group: groupId, // Add the groupId to the request payload
      })
  
      const response = await axios.post('http://localhost:3001/api/expenses/register', {
        name: name,
        categories: categories.map(c => (c.value)),
        currency: currency.value,
        totalAmount: totalAmount,
        payer: payer.value,
        payees,
        group: groupId, // Add the groupId to the request payload
      })
  
      console.log(response.data)
    } catch (err) {
      console.error(err)
    }
  };

  // Transforms the payees array depending on the split type
  const formatPayees = () => {
    // Logic handled in transformPayees. Returns payees array of objects ready to send in request to backend
    const updatedPayees = transformPayees([...payees], split, totalAmount)
    
    // Set new state to payees
    setPayees(updatedPayees)
  }

  // Updates state of selected categories
  const handleCategoriesChange = (selectedCategories) => {
    setCategories(selectedCategories)
  }

  // Update state of selected currency
  const handleCurrencyChange = (selectedCurrency) => {
    setCurrency(selectedCurrency)
  }

  // Update state of selected payer
  const handlePayerChange = (selectedPayer) => {
    setPayer(selectedPayer)
  }

  // Update state of selected split type
  const handleSplitChange = (selectedSplit) => {
    setSplit(selectedSplit)
  }

  // Update state of payees (involved, shareAmount, sharePercentage)
  const handlePayeesChange = (payeeId, update) => {
    // Find the group member to be updated
    const updatedPayees = payeeChange([...payees], payeeId, update, split)

    // Set new state to payees
    setPayees(updatedPayees)
  }

  return (
    <div className='w-full min-h-screen'>
      {/** Header */}
      <h1 className='text-3xl font-bold my-4 text-center'>
        New Expense
      </h1>

      {/** Form */}
      <form onSubmit={handleSubmit} className='flex flex-col gap-y-4 items-center'>
        {/** Description */}
        <div className='flex flex-col'>
          <h2 className='font-semibold text-xl'>
            Name
          </h2>
          <input
            className='w-72 py-2 outline-none cursor-pointer border-2 border-gray-200 rounded-sm'
            type='text'
            id='name'
            value={name}
            placeholder='E.g Hotel booking'
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>

        {/** Category */}
        <div className='flex flex-col'>
          <h2 className='font-semibold text-xl'>
            Category
          </h2>
          <Select
            options={categoryList}
            value={categories}
            onChange={handleCategoriesChange}
            isMulti
            closeMenuOnSelect={false}
            className='bg-gray-100 w-72 outline-none cursor-pointer'
          />
        </div>

        {/** Price */}
        <div className='flex flex-col'>
          <h2 className='font-semibold text-xl'>
            Total Amount
          </h2>
          <div className='flex flex-row w-72 gap-x-2'>
            <Select
              options={currencyList}
              value={currency}
              onChange={handleCurrencyChange}
              closeMenuOnSelect={true}
              className='bg-gray-100 outline-none cursor-pointer w-2/3'
            />
            <input
              className='outline-none cursor-pointer w-1/3 border-2 border-gray-200 rounded-sm'
              type='number'
              id='totalAmount'
              min='0'
              value={totalAmount}
              onChange={(event) => setTotalAmount(event.target.value)}
              required
            />
          </div>
        </div>

        {/** Paid by */}
        <div className=''>
          <h2 className='font-semibold text-xl'>
            Paid by
          </h2>

          <Select
            options={payees.map(mem => ({ label: mem.username, value: mem._id }))}
            value={payer}
            onChange={handlePayerChange}
            closeMenuOnSelect={true}
            className='bg-gray-100 w-72 outline-none cursor-pointer'
          />
          
        </div>

        {/** Split */}
        <SplitSelection 
          members={payees} 
          currency={currency} 
          split={split} 
          handleSplitChange={handleSplitChange} 
          handlePayeesChange={handlePayeesChange}
          resetShareValues={initializePayees}
        />


        {/** Add Expense Button */}
        <button
          className="bg-green-600 rounded-full font-semibold text-white px-12 py-2 my-2 cursor-pointer !important"
          type="submit"
        >
          Add Expense
        </button>
      </form>  
    </div>
  );
};

export default NewExpense;