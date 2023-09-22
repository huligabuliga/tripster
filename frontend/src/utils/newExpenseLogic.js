export const transformPayees = (updatedPayees, split, totalAmount) => {
  let equalSplitMembers = 0
  let unequalSplitTotalAmount = 0
  let percentageSplitTotal = 0

  updatedPayees.forEach((payee) => {
    // Split equally. Calculate shareAmount and sharePercentage
    // Unknown among how many members the split is. Use equalSplitMembers to count first
    if(split === 'equally') {
      if(payee.involved) {
        equalSplitMembers++
      }
    }
    // Split unequally. Calculate involved and sharePercentage
    else if(split === 'unequally') {
      // Add payee's share to total share
      unequalSplitTotalAmount += payee.shareAmount
      const payeePercentage = payee.shareAmount / totalAmount

      // If share is > 0, member is part of payees
      if(payee.shareAmount > 0) {
        payee.involved = true
        payee.sharePercentage = payeePercentage
      }
      // If not, member is not part of payees
      else {
        payee.involved = false
        payee.sharePercentage = 0
      }
    }
    // Split percentage. Calculate involved and shareAmount
    else {
      percentageSplitTotal += payee.sharePercentage
      const payeeShare = payee.sharePercentage * totalAmount / 100

      // If percentage is > 0, member is part of payees
      if(payee.sharePercentage > 0) {
        payee.involved = true
        payee.shareAmount = payeeShare
      }
      // If not, member is not part of payees
      else {
        payee.involved = false
        payee.shareAmount = 0
      }
    }
  })

  // After counting involved members, totalAmount can be equally split among its payees
  if(split === 'equally') {
    const equalShare = totalAmount / equalSplitMembers
    const equalPercentage = 1 / equalSplitMembers

    updatedPayees.forEach((payee) => {
      if(payee.involved) {
        payee.shareAmount = equalShare
        payee.sharePercentage = equalPercentage
      }
    })
  }
  // In unequal split, if unequalSplitTotalAmount is not equal to totalAmount, shares have not been correctly set
  else if(split === 'unequally') {
    if(unequalSplitTotalAmount < totalAmount) {
      throw new Error('Unequal Split Error. Sum of shares is less than total amount')
    } else if(unequalSplitTotalAmount > totalAmount) {
      throw new Error('Unequal Split Error. Sum of shares is more than total amount')
    }
  }
  // In percentage split, if percentageSplitTotal is not equal to 100, shares have not been correctly set
  else {
    if(percentageSplitTotal < 100) {
      throw new Error('Percentage Split Error. Sum of percentages is less than 100')
    } else if(percentageSplitTotal > 100) {
      throw new Error('Percentage Split Error. Sum of percentages is more than 100')
    }
  }

  return updatedPayees
}

// Update state of payees (involved, shareAmount, sharePercentage)
export const payeeChange = (updatedPayees, payeeId, update, split) => {
  // Find the group member to be updated
  const payeeIndex = updatedPayees.findIndex((payee) => payeeId === payee._id)

  if(payeeIndex !== -1) {
    // Split equally. Toggle group member's involvement in the split
    if(split === 'equally') {
      const isInvolved = updatedPayees[payeeIndex].involved
      updatedPayees[payeeIndex].involved = isInvolved ? false : true
    }
    // Split unequally, Update group member's shareAmount 
    else if(split === 'unequally') {
      updatedPayees[payeeIndex].shareAmount = update
    }
    // Split percentage. Update group member's sharePercentage
    else {
      updatedPayees[payeeIndex].sharePercentage = update
    }
  }

  return updatedPayees
}