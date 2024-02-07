// localStorage.clear();

const homeHTML = `
<div id="home">
    <div id="balance-section">
        <div id="balance-card">
            <div id="balance">
                <div class="fontsize18 fontweight600 paddingbottom16">Total balance</div>
                <div class="fontsize36 fontweight800" id="balance-amount">₹0.00</div>
            </div>
            <div class="fontsize18 fontweight600 paddingbottom16">Total</div>
            <div id="income-expense-section">
                <div id="income">
                    <div class="fontsize12 fontweight600"><span class="green-color">▼</span> Income</div>
                    <div class="fontsize24 fontweight800" id="income-amount">+₹0.00</div>
                </div>
                <div id="expense">
                    <div class="fontsize12 fontweight600"><span class="red-color">▲</span> Expense</div>
                    <div class="fontsize24 fontweight800" id="expense-amount">-₹0.00</div>
                </div>
            </div>
        </div>
    </div>
    <div id="history-section"></div>
</div>`;
const accountsHTML = `
<div id="accounts">
    <div id="accounts-section">
        <div class="account-card" id="account-bank-card">
            <div class="account-card-row1">
                <div class="account-card-row1-text">Cash</div>
                <div class="account-card-row1-icon"></div>
            </div>
            <div id="cash-total" class="account-card-row2">₹1200.00</div>
            <div class="account-card-row3">This month</div>
            <div class="account-card-row4">
                <div>Income</div>
                <div>Expense</div>
            </div>
            <div class="account-card-row5">
                <div id="cash-income">₹2100.00</div>
                <div id="cash-expense">₹1000.00</div>
            </div>
        </div>
        <div class="account-card" id="account-bank-card">
            <div class="account-card-row1">
                <div class="account-card-row1-text">Bank</div>
                <div class="account-card-row1-icon"></div>
            </div>
            <div id="bank-total" class="account-card-row2">₹1200.00</div>
            <div class="account-card-row3">This month</div>
            <div class="account-card-row4">
                <div>Income</div>
                <div>Expense</div>
            </div>
            <div class="account-card-row5">
                <div id="bank-income">₹2100.00</div>
                <div id="bank-expense">₹1000.00</div>
            </div>
        </div>
    </div>
</div>`;
const categoriesHTML = `<div id="categories"></div>`;

var transactionHistory = [];
var categories = [];

document.getElementById('add-btn').addEventListener('click', function() {
    var selectedSidebarButton = document.querySelector('.selected-sidebar-button');
    if (selectedSidebarButton.getAttribute('id') === 'sidebar-button-home') {
        window.location.href = 'transaction.html?categories=' + encodeURIComponent(JSON.stringify(categories))
    } else if (selectedSidebarButton.getAttribute('id') === 'sidebar-button-categories') {
        window.location.href = 'category.html?';
    }
});

function updateBalance() {
    var balance = 0;
    var income = 0;
    var expense = 0;
    transactionHistory.forEach(function(transaction) {
        if (transaction.type === 'income') {
            balance += parseFloat(transaction.amount);
            income += parseFloat(transaction.amount);
        } else {
            balance -= parseFloat(transaction.amount);
            expense += parseFloat(transaction.amount);
        }
    });
    document.getElementById('balance-amount').innerHTML = '₹' + balance.toFixed(2);
    document.getElementById('income-amount').innerHTML = '₹+' + income.toFixed(2);
    document.getElementById('expense-amount').innerHTML = '₹-' + Math.abs(expense).toFixed(2);
}

function updateAccounts() {
    var cashBalance = 0;
    var cashIncome = 0;
    var cashExpense = 0;
    var bankBalance = 0;
    var bankIncome = 0;
    var bankExpense = 0;

    transactionHistory.forEach(function(transaction) {
        if (transaction.type === 'income') {
            if (transaction.account === 'cash') {
                cashBalance += parseFloat(transaction.amount);
                cashIncome += parseFloat(transaction.amount);
            } else {
                bankBalance += parseFloat(transaction.amount);
                bankIncome += parseFloat(transaction.amount);
            }
        } else {
            if (transaction.account === 'cash') {
                cashBalance -= parseFloat(transaction.amount);
                cashExpense -= parseFloat(transaction.amount);
            } else {
                bankBalance -= parseFloat(transaction.amount);
                bankExpense -= parseFloat(transaction.amount);
            }
        }
    });
    document.getElementById('cash-total').innerHTML = '₹' + cashBalance.toFixed(2);
    document.getElementById('cash-income').innerHTML = '₹' + cashIncome.toFixed(2);
    document.getElementById('cash-expense').innerHTML = '₹' + cashExpense.toFixed(2);

    document.getElementById('bank-total').innerHTML = '₹' + bankBalance.toFixed(2);
    document.getElementById('bank-income').innerHTML = '₹' + bankIncome.toFixed(2);
    document.getElementById('bank-expense').innerHTML = '₹' + bankExpense.toFixed(2);
}

function displayHistory() {
    var historySection = document.getElementById('history-section');
    historySection.innerHTML = ''; // Clear the existing content

    // Iterate over the history and create history tiles
    for (var i = 0; i < transactionHistory.length; i++) {(function(index) {
        var transaction = transactionHistory[index];
        var div = document.createElement('div');
        div.className = 'history-tile';
        var colorClass = (transaction.type === 'income') ? 'green-color' : 'red-color';
        div.innerHTML = `<div class="history-tile-content">
                            <div class="history-tile-details">
                                <div class="history-tile-title fontsize18">${transaction.title}</div>
                                <div class="history-tile-info fontsize14">${transaction.date} . ${transaction.time}</div>
                            </div>
                            <div class="history-tile-amount ${colorClass} fontsize18">₹${transaction.amount.toFixed(2)}</div>
                        </div>`;

        div.addEventListener('click', function() {
            var sendData = {
                title: transaction.title,
                description: transaction.description,
                date: transaction.date,
                time: transaction.time,
                amount: transaction.amount.toFixed(2),
                account: transaction.account,
                type: transaction.type,
                index: index
            };
            window.location.href = 'transaction.html?data=' + encodeURIComponent(JSON.stringify(sendData)) + '&categories=' + encodeURIComponent(JSON.stringify(categories));
        });

        // Append the new history tile to the history section
        historySection.appendChild(div);
    })(i);
    };
}

function displayCategories() {
    var categoriesSection = document.querySelector('#categories');
    for (var i = 0; i < categories.length; i++) {(function(index) {
        var category = categories[index];
        var div = document.createElement('div');
        div.className = 'category';
        div.innerHTML = `<div class="category-title">${category.title}</div>
                         <div class="category-description">${category.description}</div>`;

        div.addEventListener('click', function() {
            var sendData = {
                title: category.title,
                description: category.description,
                index: index
            };
            window.location.href = 'category.html?data=' + encodeURIComponent(JSON.stringify(sendData));
        });

        categoriesSection.appendChild(div);
    })(i);
    };
}

function processData() {
    var queryParams = new URLSearchParams(window.location.search);
    var transactionData = queryParams.get('transaction');
    var categoryData = queryParams.get('category');
    transactionHistory = JSON.parse(localStorage.getItem('transactionHistory')) || [];
    categories = JSON.parse(localStorage.getItem('categories')) || [];

    if (transactionData == null && categoryData == null) {
        displayHistory();
        updateBalance();
    } else {
        var list = (transactionData) ? transactionHistory : categories;
        var data = (transactionData) ? transactionData : categoryData;
        var receivedData = JSON.parse(decodeURIComponent(data));
        if (receivedData.action === 'add') {
            list.push(receivedData);
        } else if (receivedData.action === 'update') {
            list[receivedData.index] = receivedData;
        } else if (receivedData.action === 'delete') {
            console.log(receivedData.index);
            list.splice(receivedData.index, 1);
        }
        localStorage.setItem((transactionData) ? 'transactionHistory' : 'categories', JSON.stringify(list));
        selectSidebarButton(document.querySelector((transactionData) ? '#sidebar-button-home' : '#sidebar-button-categories'));
    }
    
    history.replaceState({}, document.title, window.location.pathname);
}

processData();

function selectSidebarButton(icon) {
    var selectedSidebarButtonIcon = document.querySelector('.selected-sidebar-button');
    selectedSidebarButtonIcon.classList.remove('selected-sidebar-button');
    selectedSidebarButtonIcon.style.backgroundColor = '';

    icon.classList.add('selected-sidebar-button');
    icon.style.backgroundColor = '#5d4035';

    var mainSection = document.querySelector('#main-section');
    if (icon.getAttribute('id') === 'sidebar-button-home') {
        mainSection.innerHTML = homeHTML;
        document.querySelector('#add-btn-div').style.display = 'block';
        displayHistory();
        updateBalance();
    } else if (icon.getAttribute('id') === 'sidebar-button-accounts') {
        mainSection.innerHTML = accountsHTML;
        document.querySelector('#add-btn-div').style.display = 'none';
        updateAccounts();
    } else if (icon.getAttribute('id') === 'sidebar-button-categories') {
        mainSection.innerHTML = categoriesHTML;
        document.querySelector('#add-btn-div').style.display = 'block';
        displayCategories();
    }
}

document.querySelectorAll('.sidebar-button').forEach(function(button) {
    var icon = button.querySelector('.sidebar-button-icon');
    button.addEventListener('click', function() {
        if (!icon.classList.contains('selected-sidebar-button')) {
            selectSidebarButton(icon);
        }
    });
    button.addEventListener('mouseover', function() {
        if (!icon.classList.contains('selected-sidebar-button')) {
            icon.style.backgroundColor = '#29201d';
        }
    });
    button.addEventListener('mouseout', function() {
        if (!icon.classList.contains('selected-sidebar-button')) {
            icon.style.backgroundColor = '';
        }
    });
});