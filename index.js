// Define a Book object constructor. DONE!
// Collect user input for a new book entry (title, author, pages, read). DONE!
// Create a new Book object with the user input. DONE!
// Initialize an array to store book entries (if not already initialized). DONE!
// Add the new book object to the library array. DONE!
// Convert the library array to JSON. DONE!
// Store the JSON string in local storage. DONE!
// Retrieve the JSON string from local storage. DONE!
// Convert the JSON string back to an array of book objects. DONE!
// Iterate over the library array and display book entries on the website. DONE!
//Make a function that will display the books according to the order they were added
// Make the form fields not required except fot the title and then add default values for empty fields
// Add function to toggle read status on the books prototype
// Style the form


const bookForm = document.querySelector('#book-form');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookPages = document.querySelector('#pages');
const bookRead = document.querySelector('#read');
const bookStars = document.querySelectorAll('.stars')
const submitBtn = document.querySelector('#submit');
const formDialog = document.querySelector(".modal-dialog");
const clearBtn = document.querySelector('#clear');
const closeBtn = document.querySelector('#close');
const newBtn = document.querySelector('#new');
const bookGrid = document.querySelector('.book-grid');
const myLibrary = [];

//Book object constructor
class Book {
    constructor(title, author, numOfPages, status, starRating) {
        this.title = title;
        this.author = author;
        this.numOfPages = numOfPages;
        this.status = status;
        this.starRating = starRating;
    }
}

//Collect user input and pass to create instance function
bookForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let title = bookTitle.value;
  let author = bookAuthor.value;
  let numOfPages = parseInt(bookPages.value);
  let status = bookRead.checked;
  let starRating = null

  bookStars.forEach(star => {
    if(star.checked) {
      starRating = star.value;
    } 
  });

  createInstance(title, author, numOfPages, status, starRating)
  storeLibrary()
  location.reload(); //This is a temp fix
  bookForm.reset();
  
})

// create new book instance and store in the array
function createInstance(title, author, numOfPages, status, starRating) {
  myLibrary.push(new Book(title, author, numOfPages, status, starRating));
}

// Store entries in local storage
function storeLibrary() {
  myLibrary.forEach((book, index) => {
    let key = `book_${index}`;
    // Check if key already exists
    while (localStorage.getItem(key) !== null) {
      // If key exists, generate a new key with a different index
      index++;
      key = `book_${index}`;
    }
    const value = JSON.stringify(book);
    localStorage.setItem(key, value);
  });
}

//Retrieving entries from local storage and place them in new array
function retrieveLibrary() {
  const storedBooks = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('book_')) {
      const bookJson = localStorage.getItem(key);
      const book = JSON.parse(bookJson);
      storedBooks.push(book);
    }
  }
  return storedBooks;
}

function populateGrid() {
  const retrievedBooks = retrieveLibrary();

  retrievedBooks.reverse()
  
  retrievedBooks.forEach(Book => {
    const bookGridItem = document.createElement('div');
    bookGridItem.classList.add('grid-item');
  
    const titleNode = document.createElement('h2');
    titleNode.textContent = Book.title;

    const authorNode = document.createElement('p');
    authorNode.textContent = `Author: ${Book.author}`;

    const pagesNode = document.createElement('p');
    pagesNode.textContent = `Pages: ${Book.numOfPages}`;

    const statusNode = document.createElement('p');
    statusNode.textContent = `Status: ${Book.status ? 'Read' : 'Unread'}`;

    const ratingNode = document.createElement('p');
    ratingNode.textContent = `Rating: ${Book.starRating}`;

    bookGridItem.appendChild(titleNode);
    bookGridItem.appendChild(authorNode);
    bookGridItem.appendChild(pagesNode);
    bookGridItem.appendChild(statusNode);
    bookGridItem.appendChild(ratingNode);
  
    bookGrid.appendChild(bookGridItem);
  })
}

clearBtn.addEventListener('click', function() {
  localStorage.clear();
});

newBtn.addEventListener("click", () => {
  formDialog.showModal();
});

closeBtn.addEventListener("click", () => {
  formDialog.close();
});

// Populate the grid when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
  populateGrid();
});



