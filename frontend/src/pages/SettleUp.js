import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { categoryList, currencyList } from "../utils/constants";
import Select from "react-select";
import axios from "axios";

import "../cftools.css";

const SettleUp = () => {
  const { groupId } = useParams();
  const [expenses, setExpenses] = useState([]);
  const [users, setUsers] = useState({});
  const [conversionRates, setConversionRates] = useState({});
  const [targetCurrency, setTargetCurrency] = useState("");
  const [currency, setCurrency] = useState("");
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const fetchConversionRates = async () => {
      // Extract unique currencies from expenses
      const currencies = [
        ...new Set(expenses.map((expense) => expense.currency)),
      ];

      // Fetch conversion rates for each currency
      const fetchedConversionRates = await Promise.all(
        currencies.map(async (currency) => {
          try {
            const response = await axios.get(
              `https://api.exchangerate-api.com/v4/latest/${currency}`
            );
            return { [currency]: response.data.rates[targetCurrency] };
          } catch (err) {
            console.error(err);
            return { [currency]: undefined };
          }
        })
      );

      // Combine fetched conversion rates into a single object
      const combinedConversionRates = Object.assign(
        {},
        ...fetchedConversionRates
      );

      // Update state
      setConversionRates(combinedConversionRates);
    };

    fetchConversionRates();
  }, [expenses, targetCurrency]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/groups/${groupId}/expenses`
        );
        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, [groupId]);

  useEffect(() => {
    const fetchUsers = async () => {
      const userIds = [
        ...new Set(
          expenses.flatMap((expense) => [
            expense.userId,
            ...expense.payees.map((payee) => payee._id),
          ])
        ),
      ];
      const validUserIds = userIds.filter(Boolean); // Filter out undefined values
      console.log("User IDs:", validUserIds); // Log user IDs

      const fetchedUsers = await Promise.all(
        validUserIds.map(async (userId) => {
          const response = await fetch(
            `http://localhost:3001/api/users/${userId}/info`
          );
          const data = await response.json();
          console.log("Fetched user:", data); // Log fetched user (for debugging purposes
          return { [userId]: data };
        })
      );

      console.log("Fetched users:", fetchedUsers); // Log fetched users

      setUsers(Object.assign({}, ...fetchedUsers));
    };

    if (expenses.length > 0 && Object.keys(users).length === 0) {
      fetchUsers();
    }
  }, [expenses, users]);

  console.log("Expenses:", expenses); // Log expenses
  console.log("Users:", users); // Log users
  const usernames = Object.values(users).map((user) => user.username);
  console.log("Usernames:", usernames); // Log usernames
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const currentUserId = currentUser._id;
  const loggedInUsername = currentUser.username; // Replace this with the actual username field name
  const otherUsers = Object.entries(users)
    .filter(([id, user]) => user.username !== loggedInUsername)
    .map(([id, user]) => ({ _id: id, ...user }));

  console.log("Other users:", otherUsers); // Log other users

  otherUsers.forEach((user) => {
    console.log(`User ID type: ${typeof user._id}, value: ${user._id}`);
  });

  const unpaidExpenses = otherUsers.map((user) => {
    let totalOwed = 0;
    expenses.forEach((expense) => {
      const conversionRate = conversionRates[expense.currency];
      if (!conversionRate) {
        console.error(
          `No conversion rate found for currency: ${expense.currency}`
        );
        return;
      }
      expense.payees.forEach((payee) => {
        // Check if the current user is the one who owes money and the user from the list is the one who paid initially
        if (
          !payee.paid &&
          payee._id === currentUserId &&
          expense.payees[0]._id === user._id
        ) {
          const shareAmountInUSD = payee.shareAmount * conversionRate;
          totalOwed += shareAmountInUSD;
        }
      });
    });
    return { ...user, totalOwed };
  });
  console.log("Unpaid expenses:", unpaidExpenses); // Log unpaid expenses

  const handlePayAndSubmitEvidence = (e, userId) => {
    handleEvidenceSubmit(e, userId);
    handlePay(userId);
  };

  // Update state of selected currency
  const handleCurrencyChange = (selectedCurrency) => {
    setTargetCurrency(selectedCurrency.value); // Update this line
    setCurrency(selectedCurrency);
  };

  const handlePay = async () => {
    try {
      // Iterate over all expenses
      for (const expense of expenses) {
        // Iterate over all payees of the current expense
        for (const payee of expense.payees) {
          // Check if the payee's id matches the userId passed to the function
          if (payee._id === currentUserId) {
            // Update the payee's paid status to true
            await axios
              .put(`http://localhost:3001/api/expenses/${expense._id}/update`, {
                userId: currentUserId,
                paid: true,
              })
              .then(async (response) => {
                console.log("userid sent:", currentUserId);
                console.log(response);
                const updatedExpense = await axios.get(
                  `http://localhost:3001/api/expenses/${expense._id}`
                );
                console.log("Updated Expense:", updatedExpense.data);
              });
          }
        }
      }
      setPaymentSuccess(true);
      // Redirect to group page after 5 seconds
      setTimeout(() => {
        navigate(`/group/${groupId}`);
      }, 5000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEvidenceSubmit = (e, userId) => {
    e.preventDefault();
    const imageLink = formRef.current.elements[0].value;
    if (!imageLink) {
      alert("Please enter an image link");
      return;
    }
    console.log(`Image link for user ${userId}: ${imageLink}`);
    // Handle the submission of the image link here
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        flexDirection: "column",
      }}
    >
      <h1>Settle Up</h1>
      {paymentSuccess && <p>Payment successful!</p>}
      <div>
        <Select
          options={currencyList}
          value={currency}
          onChange={handleCurrencyChange}
          closeMenuOnSelect={true}
          className="bg-gray-100 outline-none cursor-pointer w-2/3"
        />
      </div>
      <table
        style={{ borderCollapse: "collapse", width: "80%", margin: "20px 0" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f8f8f8" }}>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Username
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Amount to Pay
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Evidence
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {unpaidExpenses.map((user) => (
            <tr key={user._id} style={{ borderBottom: "1px solid #ddd" }}>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                {user.username}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                {user.totalOwed.toFixed(2)}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                <form
                  ref={formRef}
                  onSubmit={(e) => handleEvidenceSubmit(e, user._id)}
                >
                  <input type="text" placeholder="Enter image link" />
                </form>
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                <button
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => handlePayAndSubmitEvidence(e, user._id)}
                >
                  Pay
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SettleUp;
