// book constructor
function Book(title,author,isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// us constructor
function UI() {

}

// Add book to list
UI.prototype.addBookToList = function(book) {
    const list = document.querySelector('#book-list');
    // create tr element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
    <td> ${book.title} </td>
    <td> ${book.author} </td>
    <td> ${book.isbn} </td>
    <td> <a href="#" class="delete">X</a> </td>
    `;

    list.appendChild(row);
}

// show alert
UI.prototype.showAlert = function(message, className) {
    // create div
    const div = document.createElement('div');
    // add classes
    div.className = `alert ${className}`;

    // add text
    div.appendChild(document.createTextNode(message));
    // get parent
    const container = document.querySelector('.container');
    // get form
    const form = document.querySelector('#book-form');
    // insert alert
    container.insertBefore(div, form);

    // set timeout
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 700);

}

// Delete book
UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

// clear fields
UI.prototype.clearFeilds = function() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
}

// add event listener
document.querySelector('#book-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // get form value
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Instantiate book
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // validate
    if(title === '' || author === '' || isbn === ''){
        // error alert
        ui.showAlert('Please Fill in all feilds', 'error');
    } else {
        // Add book to list
        ui.addBookToList(book);

        // show succcess
        ui.showAlert('Book Added', 'success')

        //Clear fields
        ui.clearFeilds();
    }
    
    
});

// event listener for delete
document.querySelector('#book-list').addEventListener('click', 
function(e){
    // indtanciate Ui
    const ui = new UI();

    // delete book
    ui.deleteBook(e.target);

    // show message
    ui.showAlert('Book Removed!', 'success');

e.preventDefault();
})