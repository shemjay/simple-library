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
// Style the form DONE!
// Add check and uncheck button to the prototype of the instances DONE!
//Style the Book Div DONE!
//Finish styling the form legend DONE!
// Make the form fields not required except for the title and then add default values for empty fields DONE!
// Add a footer DONE!
//Add a side menu DONE!
//Fix bug with delete button that dosent allow one to delete books in any order DONE!

//Add filters in the side menu: Alphabetical, Display last added first, Display last added last, filter by author, pages, rating and title.
//Add ability to edit data

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
const testBtn = document.querySelector('#test')
const newBtn = document.querySelector('#new');
const bookGrid = document.querySelector('.book-grid');
const sidebar = document.querySelector('.sidebar');
const sidebarOpen = document.querySelector('.side-open');
const sidebarClose = document.querySelector('.side-close');
const myLibrary = [];

//Book object constructor
class Book {
    constructor(id, title, author, numOfPages, status, starRating) {
        this.id = id; // Unique ID for each book
        this.title = title;
        this.author = author;
        this.numOfPages = numOfPages;
        this.status = status;
        this.starRating = starRating;
    }
}

// Generate a unique ID for each book
function generateUniqueId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

//Collect user input and pass to create instance function
bookForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let title = bookTitle.value.trim() || "Unknown Title";
  let author = bookAuthor.value.trim() || "Unknown Author";
  let numOfPages = parseInt(bookPages.value) || 0;
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
  const id = generateUniqueId()
  myLibrary.push(new Book(id, title, author, numOfPages, status, starRating));
}

// Store entries in local storage
function storeLibrary() {
  myLibrary.forEach((book) => {
    const key = `book_${book.id}`;
    const value = JSON.stringify(book);
    localStorage.setItem(key, value);
  });
}

// Retrieve entries from local storage and place them in a new array
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

// Store the retrieve books function in a variable
const retrievedBooks = retrieveLibrary();

function populateGrid() {

  retrievedBooks.reverse()
  
  retrievedBooks.forEach((Book, index) => {
    const bookGridItem = document.createElement('div');
    bookGridItem.classList.add('grid-item');
  
    const titleContainer = document.createElement('div');
    titleContainer.classList.add('book-title-container');

    const titleNode = document.createElement('h3');
    titleNode.textContent = Book.title;

    const authorContainer = document.createElement('div');
    authorContainer.classList.add('author-container')
    const authorNode = document.createElement('p');
    authorNode.textContent = `Author: ${Book.author}`;

    const pagesNode = document.createElement('p');
    pagesNode.textContent = `Pages: ${Book.numOfPages}`;

    const statusContainer = document.createElement('div');
    statusContainer.classList.add('status-container');

    const statusNode = document.createElement('p');
    statusNode.textContent =  `Status: ${Book.status ? 'Read' : 'Unread'}`;

    const ratingNode = document.createElement('p');
    ratingNode.textContent = `Rating: ${Math.round(Book.starRating)}/5`;

    const deleteBtnContainer = document.createElement('div');
    deleteBtnContainer.classList.add('book-deleteBtn-container');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('book-delete-btn')
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    deleteBtn.addEventListener('click', () => {
      const bookId = retrievedBooks[index].id; // Get the ID of the book
      deleteBook(bookId)
    });

    authorContainer.appendChild(authorNode);
    statusContainer.appendChild(statusNode);
    deleteBtnContainer.appendChild(deleteBtn);
    titleContainer.appendChild(titleNode);

    bookGridItem.appendChild(deleteBtnContainer);
    bookGridItem.appendChild(titleContainer);
    bookGridItem.appendChild(authorContainer);
    bookGridItem.appendChild(pagesNode);
    bookGridItem.appendChild(statusContainer);
    bookGridItem.appendChild(ratingNode);
    
  
    bookGrid.appendChild(bookGridItem);
  })
}
// Delete a book using its ID
function deleteBook(id) {
  const index = retrievedBooks.findIndex(book => book.id === id);
  if (index !== -1) {
      retrievedBooks.splice(index, 1);
      const key = `book_${id}`;
      localStorage.removeItem(key);
      // Refresh the grid after deletion
      bookGrid.innerHTML = '';
      populateGrid(); // Populate the grid again without the deleted book
  }
}


//Add test data
const testData = () => {
  createInstance('To Kill a Mockingbird', 'Harper Lee', 281, true, 4.5);
  createInstance('1984', 'George Orwell', 328, true, 4.3);
  createInstance('The Great Gatsby', 'F. Scott Fitzgerald', 180, false, 4.0);
  createInstance('Pride and Prejudice', 'Jane Austen', 279, true, 4.7);
  createInstance('The Catcher in the Rye', 'J.D. Salinger', 214, false, 4.1);
  createInstance('Great Expectations', 'Charles Dickens', 365, true, 3.5);
  createInstance('The Hobbit', 'J.R.R. Tolkien', 310, true, 4.6);
  storeLibrary();
  populateGrid();
  location.reload()
}

//Toggle sidebar function
function toggleSidebar() {
  if (sidebar.style.left === '0px') {
      sidebar.style.left = '-300px';
  } else {
      sidebar.style.left = '0px';
  }
}

//Close sidebar function
function closeSidebar() {
  sidebar.style.left = '-300px';
}

clearBtn.addEventListener('click', function() {
  localStorage.clear();
  location.reload();
});

newBtn.addEventListener("click", () => {
  formDialog.showModal();
});

closeBtn.addEventListener("click", () => {
  formDialog.close();
});

testBtn.addEventListener('click', () => testData())

sidebarClose.addEventListener('click', closeSidebar)
sidebarOpen.addEventListener('click', toggleSidebar)

// Populate the grid when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
  populateGrid();
});



