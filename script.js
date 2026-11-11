
// 1. Store the budget and expenses
let totalBudget = 0;

// Array to store multiple expense entries
let expenses = [];

// 2. Select HTML elements
const budgetForm = document.getElementById("budgetForm");
const expenseForm = document.getElementById("expenseForm");

const budgetInput = document.getElementById("budgetInput");
const expenseNameInput = document.getElementById("expenseName");
const expenseAmountInput = document.getElementById("expenseAmount");

const totalBudgetDisplay = document.getElementById("totalBudget");
const totalExpensesDisplay = document.getElementById("totalExpenses");
const remainingBalanceDisplay = document.getElementById("remainingBalance");

const expensesList = document.getElementById("expensesList");
const budgetMessage = document.getElementById("budgetMessage");

// 3. Function to calculate total expenses
function calculateTotalExpenses() {
    let total = 0;

    // Loop through the expenses array
    for (let i = 0; i < expenses.length; i++) {
        total += expenses[i].amount;
    }

    return total;
}

// 4. Function to calculate remaining balance
function calculateBalance(budget, expenseTotal) {
    return budget - expenseTotal;
}

// 5. Function to update the dashboard
function updateDashboard() {

    let expenseTotal = calculateTotalExpenses();

    let remainingBalance = calculateBalance(
        totalBudget,
        expenseTotal
    );

    // Update dashboard values
    totalBudgetDisplay.textContent =
        "KES " + totalBudget.toFixed(2);

    totalExpensesDisplay.textContent =
        "KES " + expenseTotal.toFixed(2);

    remainingBalanceDisplay.textContent =
        "KES " + remainingBalance.toFixed(2);

    // Conditional statements for budget status
    if (expenseTotal > totalBudget) {
        budgetMessage.textContent =
            "Warning! Your expenses have exceeded your budget.";

        budgetMessage.className = "warning";

    } else if (expenseTotal === totalBudget && totalBudget > 0) {
        budgetMessage.textContent =
            "You have used your entire budget.";

        budgetMessage.className = "warning";

    } else {
        budgetMessage.textContent =
            "Great! You are within your budget.";

        budgetMessage.className = "success";
    }

    // Display expenses dynamically
    displayExpenses();
}

// 6. Function to display the expense list
function displayExpenses() {

    // Clear the previous list
    expensesList.textContent = "";

    // Check whether the array is empty
    if (expenses.length === 0) {
        let message = document.createElement("li");
        message.textContent = "No expenses added yet.";
        expensesList.appendChild(message);
        return;
    }

    // Loop through the array
    for (let i = 0; i < expenses.length; i++) {

        let listItem = document.createElement("li");

        listItem.textContent =
            expenses[i].name +
            " - KES " +
            expenses[i].amount.toFixed(2);

        expensesList.appendChild(listItem);
    }
}

// 7. Event listener for setting the budget
budgetForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let enteredBudget = Number(budgetInput.value);

    if (!Number.isFinite(enteredBudget) || enteredBudget <= 0) {
        alert("Please enter a valid budget greater than zero.");
        return;
    }

    totalBudget = enteredBudget;

    updateDashboard();

    budgetForm.reset();
});

// 8. Event listener for adding expenses
expenseForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let expenseName = expenseNameInput.value.trim();

    let expenseAmount = Number(expenseAmountInput.value);

    // Validate user input
    if (expenseName === "") {
        alert("Please enter an expense name.");
        return;
    }

    if (!Number.isFinite(expenseAmount) || expenseAmount <= 0) {
        alert("Please enter a valid expense amount.");
        return;
    }

    // Store expense in the array
    let newExpense = {
        name: expenseName,
        amount: expenseAmount
    };

    expenses.push(newExpense);

    // Update dashboard without refreshing
    updateDashboard();

    // Clear form fields
    expenseForm.reset();
});

// 9. Display initial dashboard
updateDashboard();

console.log("SpendWise dashboard is ready!");
