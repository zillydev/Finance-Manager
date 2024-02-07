function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

document.getElementById('date').value = getCurrentDate();
document.getElementById('time').value = getCurrentTime();

var action = "add";
var data = [];

var queryParams = new URLSearchParams(window.location.search);
var categories = JSON.parse(decodeURIComponent(queryParams.get('categories')));
var rawData = queryParams.get('data');
if (rawData) {
    // Get data from URL parameters
    data = JSON.parse(decodeURIComponent(rawData));
    document.getElementById('title').value = data.title;
    document.getElementById('description').value = data.description || "";
    document.getElementById('amount').value = data.amount;
    document.getElementById('date').value = data.date;
    document.getElementById('time').value = data.time;
    document.querySelector('.selected-type').classList.remove('selected-type');
    document.getElementById(data.type).classList.add('selected-type');
    document.querySelector('.selected-account').classList.remove('selected-account');
    document.getElementById(data.account).classList.add('selected-account');
    document.getElementById('action-btn').innerHTML = 'Update';
    document.getElementById('delete-btn').style.display = 'block';
    action = "update";
}
// Clear URL parameters
history.replaceState({}, document.title, window.location.pathname);

document.getElementById('action-btn').addEventListener('click', function() {
    const title = document.getElementById('title').value;
    if (title === "") {
        alert('Please enter a title');
        return;
    }
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    if (amount === "" || amount === 0) {
        alert('Please enter valid amount');
        return;
    }
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const type = document.querySelector('.selected-type').id;
    const account = document.querySelector('.selected-account').getAttribute('id');
    if (document.querySelector('.selected-category') === null) {
        alert('Please select a category');
        return;
    }
    const category = document.querySelector('.selected-category').innerHTML;

    var sendData = {
        title: title,
        description: description,
        amount: amount,
        date: date,
        time: time,
        type: type,
        account: account,
        category: category,
        index: data.index,
        action: action
    };
    var json = JSON.stringify(sendData);

    window.location.href = 'index.html?transaction=' + encodeURIComponent(json);
});

document.querySelector('#delete-btn').addEventListener('click', function() {
    var sendData = {
        action: 'delete',
        index: data.index
    };
    var json = JSON.stringify(sendData);

    window.location.href = 'index.html?transaction=' + encodeURIComponent(json);
});

var types = document.querySelectorAll('.type');
types.forEach(function(type) {
    type.addEventListener('click', function() {
        document.querySelector('.selected-type').classList.remove('selected-type');
        type.classList.add('selected-type');
    });
});


document.querySelectorAll('.account-card').forEach(function(card) {
    card.addEventListener('click', function() {
        var selectedAccount = document.querySelector('.selected-account');
        if (selectedAccount != null) selectedAccount.classList.remove('selected-account');
        card.classList.add('selected-account');
    });
});

var categoriesSection = document.querySelector('#categories');
for (var category of categories) {
    var div = document.createElement('div');
    div.classList.add('category');
    div.innerHTML = `${category.title}`;

    div.addEventListener('click', function() {
        var selectedCategory = document.querySelector('.selected-category');
        if (selectedCategory != null) selectedCategory.classList.remove('selected-category');
        this.classList.add('selected-category');
    });
    categoriesSection.appendChild(div);
}
