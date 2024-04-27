// Define a Book object constructor. DONE!
// Collect user input for a new book entry (title, author, pages, read). DONE!
// Create a new Book object with the user input.
// Initialize an array to store book entries (if not already initialized).
// Add the new book object to the library array.
// Convert the library array to JSON.
// Store the JSON string in local storage.
// Retrieve the JSON string from local storage.
// Convert the JSON string back to an array of book objects.
// Iterate over the library array and display book entries on the website.
const bookForm = document.querySelector('#bookForm');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookPages = document.querySelector('#pages');
const bookRead = document.querySelector('#read');
const bookStars = document.querySelectorAll('.stars')
const submitBtn = document.querySelector('#submit');

const myLibrary = [];

class Book {
    constructor(title, author, numOfPages, status, starRating) {
        this.title = title;
        this.author = author;
        this.numOfPages = numOfPages;
        this.status = status;
        this.starRating = starRating;
    }
}

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

  console.log(title, author, numOfPages, status, starRating);
  const newBook = new Book(title, author, numOfPages, status, starRating);
  myLibrary.push(newBook);
  console.log(myLibrary)
  
})





