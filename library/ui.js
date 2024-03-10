
const kinveyBaseUrl = "https://baas.kinvey.com/";
const kinveyAppKey = "kid_HJhkiBVaT";
const kinveyAppSecret = "a6ee063b0fc44019bad827c615687306";
const kinveyAppAuthHeaders = {
    "Authorization": "Basic " + btoa(kinveyAppKey + ":" + kinveyAppSecret)
}

export function showView(viewName) {
    // Function to show a specific view
    $('main > section').css('display', 'none');
    $('#' + viewName).css('display', 'block');
}

export function setupEventListeners() {
    // Function to initialize event listeners
    $('#linkHome').click(function (event) {
        event.preventDefault();
        showHomeView();
    });
    $('#linkLogin').click(function (event) {
        event.preventDefault();
        showLoginView();
    });
    $('#linkRegister').click(function (event) {
        event.preventDefault();
        showRegisterView();
    });
    $('#linkListBooks').click(function (event) {
        event.preventDefault();
        showListBooksView();
    });
    $('#linkCreateBook').click(function (event) {
        event.preventDefault();
        showCreateBookView();
    });
    $('#linkLogout').click(function (event) {
        event.preventDefault();
        logoutUser();
    });

    $('#buttonRegister').click(function (event) {
        event.preventDefault();
        registerUser();
    });

    $('#buttonLogin').on('click', function (event) {
        event.preventDefault();
        loginUser();
    });

    $('#books').on('click', '.btn-edit', function () {
        const bookId = $(this).attr('data-id');
        fetchAndPopulateEditForm(bookId);
    });

    $('#buttonEditBook').on('click', function () {
        const bookId = $('#formEditBook input[name="id"]').val();
        const bookData = {
            title: $('#editBookTitle').val().trim(),
            author: $('#editBookAuthor').val().trim(),
            description: $('#editBookDescription').val().trim(),
        };
        editBook(bookId, bookData);
    });

    $('#books').on('click', '.btn-delete', function () {
        if (confirm('Are you sure you want to delete this book?')) {
            const bookId = $(this).attr('data-id');
            deleteBook(bookId);
        }
    });

    $('#buttonCreateBook').off('click').on('click', function (event) {
        event.preventDefault();

        const title = $('#createBookTitle').val().trim();
        const author = $('#createBookAuthor').val().trim();
        const description = $('#createBookDescription').val().trim();

        if (title && author && description) {
            const bookData = { title, author, description };
            createBook(bookData);
        } else {
            console.log('Please fill in all fields');
        }
    });

    $('#infoBox, #errorBox').click(function () {
        $(this).css('display', 'none');
    });

}

function showHomeView() {
    // Functions for showing specific views
    $('main > section').hide();
    $('#viewHome').show();
}

export function showLoginView() {
    // Function to show the login view
    showView('viewLogin');
}

export function showRegisterView() {
    // Function to show the register view
    showView('viewRegister');
}

export function showListBooksView() {
    // Function to show the login view
    showView('viewBooks');
    listBooks();
}

function displayUser(username) {
    $('#loggedInUser').text('Hello, ' + username + '!');
    $('#loggedInUser').show();
    $('#linkLogout').show();
}

function showCreateBookView() {
    $('#createBookTitle').val('');
    $('#createBookAuthor').val('');
    $('#createBookDescription').val('');
    showView('viewCreateBook');
}

export function showInfo(message) {
    let infoBox = $('#infoBox');
    infoBox.text(message);
    infoBox.css('display', 'block');
}

export function showError(errorMsg) {
    let errorBox = $('#errorBox');
    errorBox.text(errorMsg);
    errorBox.css('display', 'block');
}

function listBooks() {
    $('#books .table tbody').empty();
    showView('viewBooks');
    $.ajax({
        method: "GET",
        url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/books",
        headers: getKinveyUserAuthHeaders(),
        success: function (data) {
            console.log('Books data received:', data);
            loadBooksSuccess(data);
        },
    });
}

function loadBooksSuccess(books) {
    $('#errorBox').hide();
    showInfo('Books loaded.');
    let booksTableBody = $('#books .table tbody');

    if (books.length === 0) {
        booksTableBody.append($('<tr>').append($('<td colspan="4">').text('No books in the library.')));
    } else {
        books.forEach(book => appendBookRow(book, booksTableBody));
    }
}

function appendBookRow(book, booksTableBody) {
    let bookRow = $('<tr>').append(
        $('<td>').text(book.title),
        $('<td>').text(book.author),
        $('<td>').text(book.description),
        $('<td>').append(
            $('<button>').text('Edit').addClass('btn-edit btn btn-primary').attr('data-id', book._id),
            $('<button>').text('Delete').addClass('btn-delete btn btn-danger').attr('data-id', book._id)
        )
    );
    booksTableBody.append(bookRow);
}

export function handleAjaxError(response) {
    let errorMsg = JSON.stringify(response);
    if (response.readyState === 0) {
        errorMsg = 'Cannot connect due to network error.';
    }
    if (response.status === 401) {
        errorMsg = 'Invalid username or password. Please try again.';
    } else if (response.responseJSON && response.responseJSON.description) {
        errorMsg = response.responseJSON.description;
    }
    showError(errorMsg);
}

function registerUser() {
    const username = $('#registerUsername').val();
    const password = $('#registerPassword').val();

    $.ajax({
        method: 'POST',
        url: kinveyBaseUrl + 'user/' + kinveyAppKey + '/',
        headers: kinveyAppAuthHeaders,
        data: JSON.stringify({ username, password }),
        contentType: 'application/json',
        success: registerSuccess,
        error: handleAjaxError
    });
}

function registerSuccess(response) {
    const username = response.username;
    localStorage.setItem('username', username);
    displayUser(username);
    localStorage.setItem('authToken', response._kmd.authtoken);
    showInfo('Registration successful');
    showView('viewBooks');
    $('#linkLogout').show();
    $('#linkListBooks').show();
    $('#linkCreateBook').show();
    $('#linkLogin').hide();
    $('#linkRegister').hide();
}

function loginUser() {
    const username = $('#loginUsername').val();
    const password = $('#loginPassword').val();

    $.ajax({
        method: 'POST',
        url: kinveyBaseUrl + 'user/' + kinveyAppKey + '/login',
        headers: kinveyAppAuthHeaders,
        data: JSON.stringify({ username, password }),
        contentType: 'application/json',
        success: loginSuccess,
        error: handleAjaxError
    });
}

function loginSuccess(response) {
    const username = response.username;
    localStorage.setItem('username', username);
    displayUser(username);
    localStorage.setItem('authToken', response._kmd.authtoken);
    showInfo('Login successful');
    listBooks();
    $('#linkLogout').show();
    $('#linkListBooks').show();
    $('#linkCreateBook').show();
    $('#linkLogin').hide();
    $('#linkRegister').hide();
}

function createBook(bookData) {
    $.ajax({
        method: 'POST',
        url: kinveyBaseUrl + 'appdata/' + kinveyAppKey + '/books',
        headers: getKinveyUserAuthHeaders(),
        data: JSON.stringify(bookData),
        contentType: 'application/json',
        success: createBookSuccess,
        error: handleAjaxError
    });
}

function createBookSuccess(response) {
    listBooks();
    showInfo('Book created successfully.');
}

function logoutUser() {
    localStorage.removeItem('username');
    $('#loggedInUser').hide();
    showInfo('Logout successful.');
    showView('viewHome');
    $('#linkLogout').hide();
    $('#linkListBooks').hide();
    $('#linkCreateBook').hide();
    $('#linkLogin').show();
    $('#linkRegister').show();
}

function editBook(bookId, bookData) {
    $.ajax({
        method: 'PUT',
        url: `${kinveyBaseUrl}appdata/${kinveyAppKey}/books/${bookId}`,
        headers: getKinveyUserAuthHeaders(),
        data: JSON.stringify(bookData),
        contentType: 'application/json',
        success: editBookSuccess,
        error: handleAjaxError
    });
}

function editBookSuccess(response) {
    showInfo('Book updated successfully.');
    listBooks();
    showView('viewBooks');
}

function fetchAndPopulateEditForm(bookId) {
    $.ajax({
        method: 'GET',
        url: kinveyBaseUrl + 'appdata/' + kinveyAppKey + '/books/' + bookId,
        headers: getKinveyUserAuthHeaders(),
        success: function (bookData) {
            $('#editBookTitle').val(bookData.title);
            $('#editBookAuthor').val(bookData.author);
            $('#editBookDescription').val(bookData.description);
            $('#formEditBook input[name="id"]').val(bookId);

            showView('viewEditBook');
        },
        error: handleAjaxError
    });
}

function deleteBook(bookId) {
    $.ajax({
        method: 'DELETE',
        url: kinveyBaseUrl + 'appdata/' + kinveyAppKey + '/books/' + bookId,
        headers: getKinveyUserAuthHeaders(),
        success: deleteBookSuccess,
        error: handleAjaxError
    });
}
function deleteBookSuccess(response) {
    showInfo('Book deleted successfully.');
    listBooks();
    showView('viewBooks');
}

export function getKinveyUserAuthHeaders() {
    // Function to get the user auth headers
    const userAuthToken = localStorage.getItem('authToken');
    return {
        'Authorization': 'Kinvey ' + userAuthToken,
    };
}

