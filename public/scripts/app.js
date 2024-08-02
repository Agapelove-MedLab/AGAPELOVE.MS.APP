document.getElementById('register-sample-form').addEventListener('submit', function (event) {
    event.preventDefault();

    var formData = new FormData(event.target);
    formData.append('action', 'register');

    fetch('https://script.google.com/macros/s/AKfycbwFd5J3eGbJbfH5-UbhrCrk1jZF0vfFu8gmOy_bj0V2aYpUaXZiIzz50Mjbe4h5U0an/exec', {
        method: 'POST',
        body: formData,
        mode: 'cors'
    })
        .then(response => response.text())
        .then(data => alert(data))
        .catch(error => console.error('Error:', error));
});

document.getElementById('update-result-form').addEventListener('submit', function (event) {
    event.preventDefault();

    var formData = new FormData(event.target);
    formData.append('action', 'update');

    fetch('https://script.google.com/macros/s/AKfycbwFd5J3eGbJbfH5-UbhrCrk1jZF0vfFu8gmOy_bj0V2aYpUaXZiIzz50Mjbe4h5U0an/exec', {
        method: 'POST',
        body: formData,
        mode: 'cors'
    })
        .then(response => response.text())
        .then(data => alert(data))
        .catch(error => console.error('Error:', error));
});
