import React, { useState } from 'react'

const SplitSelection = ({ members, currency, split, handleSplitChange, handlePayeesChange, resetShareValues }) => {
  const [selectedButton, setSelectedButton] = useState(split)

  // Update state of selectedButton
  // Calls parent (NewExpense page) to update its split state
  // Calls parent (NewExpense page) to reset payees' involved, shareAmount and sharePercentage attributes. Keeps integrity when switching between split types
  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId)
    handleSplitChange(buttonId)
    resetShareValues()
  }

  // Split Equally. Calls function from parent to toggle a member's involvement in the expense
  const handleChangeEqually = (id) => {
    handlePayeesChange(id, null)
  }

  // Split Unequally. Calls function from parent to update a member's share in the expense
  const handleChangeUnequally = (id, shareAmount) => { 
    handlePayeesChange(id, Number(shareAmount))
  }

  // Split Percentages. Calls function from parent to update a member's percentage share in the expense
  const handleChangePercentage = (id, sharePercentage) => {
    handlePayeesChange(id, Number(sharePercentage))
  }

  return (
    <div className='flex flex-col w-80 sm:w-1/2'>
        { /** Split Type Buttons */}
        <div className='flex flex-row gap-x-2'>
            <div
                className={`rounded-md text-center font-semibold w-1/3 py-2 my-2 cursor-pointer !important 
                    ${selectedButton === 'equally' ? 'bg-green-600 text-white' : 'bg-white text-green-600 border-2 border-green-600'}`}
                onClick={() => handleButtonClick('equally')}
            >
                Equally
            </div>

            <div
                className={`rounded-md text-center font-semibold w-1/3 py-2 my-2 cursor-pointer !important 
                    ${selectedButton === 'unequally' ? 'bg-green-600 text-white' : 'bg-white text-green-600 border-2 border-green-600'}`}
                onClick={() => handleButtonClick('unequally')}
            >
                Unequally
            </div>

            <div
                className={`rounded-md text-center font-semibold w-1/3 py-2 my-2 cursor-pointer !important 
                    ${selectedButton === 'percentage' ? 'bg-green-600 text-white' : 'bg-white text-green-600 border-2 border-green-600'}`}
                onClick={() => handleButtonClick('percentage')}
            >
                Percentage
            </div>
        </div>

        { /** List of Members */}
        <div className='flex flex-col'>
            {members.map((m) => (
                <div key={m._id} className='flex flex-row align-center justify-between rounded-xl p-2 shadow-xl'> 
                    { /** Member Name */}
                    <h2 className='w-1/2 font-normal text-xl mt-2'>
                        { m.username }
                    </h2>

                    { /** Involved in Expense Checkbox. Displayed ONLY in Split Equally */}
                    <div className='flex w-1/2 mt-2 justify-end'>
                        {selectedButton === 'equally' &&
                            <input
                            type='checkbox'
                            className='w-6 h-6' 
                            onChange={(e) => handleChangeEqually(m._id)}
                            />
                        }

                        { /** Share Input. Displayed ONLY in Split Unequally */}
                        {selectedButton === 'unequally' &&
                            <div className='flex flex-row gap-x-2 justify-end'>
                                <input
                                    className='outline-none cursor-pointer w-1/3'
                                    type='number'
                                    id='shareUnequal'
                                    min='0'
                                    placeholder='0'
                                    onChange={(e) => handleChangeUnequally(m._id, e.target.value)}
                                />
                                <p className='font-normal text-md italic'>
                                    { currency.value }
                                </p>
                            </div>
                        }

                        { /** Percentage Share Input. Displayed ONLY in Split Percentages */}
                        {selectedButton === 'percentage' &&
                            <div className='flex flex-row gap-x-2 justify-end'>
                                <input
                                    className='outline-none cursor-pointer w-1/3'
                                    type='number'
                                    id='sharePercentage'
                                    min='0'
                                    placeholder='0'
                                    onChange={(e) => handleChangePercentage(m._id, e.target.value)}
                                />
                                <p className='font-normal text-md italic'>
                                    %
                                </p>
                        </div>
                        }
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SplitSelection