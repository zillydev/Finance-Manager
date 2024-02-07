var action = "add";
var data = [];

var queryParams = new URLSearchParams(window.location.search);
var rawData = queryParams.get('data');
if (rawData) {
    // Get data from URL parameters
    data = JSON.parse(decodeURIComponent(rawData));
    document.getElementById('title').value = data.title;
    document.getElementById('description').value = data.description || "";

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
    var sendData = {
        title: title,
        description: description,
        index: data.index,
        action: action
    };
    var json = JSON.stringify(sendData);

    window.location.href = 'index.html?category=' + encodeURIComponent(json);
});

document.querySelector('#delete-btn').addEventListener('click', function() {
    var sendData = {
        action: 'delete',
        index: data.index
    };
    var json = JSON.stringify(sendData);

    window.location.href = 'index.html?category=' + encodeURIComponent(json);
});