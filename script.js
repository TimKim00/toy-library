const myLibrary = [];
const shelf = document.querySelector(".bookshelf");
const addBook = document.querySelector("button#add");
const form = document.querySelector("#form");

// Handle dialog inputs
const dialog = document.querySelector("dialog");
const titleInput = document.querySelector('input#add-title');
const authorInput = document.querySelector('input#add-author');
const pageInput = document.querySelector('input#add-pages');
const is_readInput = document.querySelector('input#is_read');


function Book(author, title, num_pages, is_read) {
    this.author = author;
    this.title = title;
    this.num_pages = num_pages;
    this.is_read = is_read;


}

function addBookToLibrary(book) {
    //   Adds the BOOK to MYLIBRARY array if the BOOK not in the library.
    //   Returns TRUE if BOOK added. FALSE otherwise.

    for (const b in myLibrary) {
        if (bookEqual(b, book))
            return false;
    }

    myLibrary.push(book);
    addBookToDisplay(book);
    return true;
}

function removeBookFromLibrary(book) {
    // removes BOOK from library. If book not found, returns false;

    let idx = -1;
    for (const b in myLibrary) {
        idx += 1;
        if (bookEqual(b, book)) {
            break;
        }
    }

    if (idx == -1)
        return false;

    myLibrary.splice(idx, 1);
    displayBooks();
    return true;
}

function addBookToDisplay(book) {
    const bookElement = document.createElement('div');
    bookElement.classList.add('card');

    // Add book content.
    const title = document.createElement('div');
    title.id = "title";
    title.textContent = book.title;

    const read = document.createElement('div');
    read.id = "read";
    read.textContent = book.is_read ? "Read" : "Unread";

    const author = document.createElement('div');
    author.id = "author";
    author.textContent = book.author;

    const num_pages = document.createElement('div');
    num_pages.id = "pages";
    num_pages.textContent = book.num_pages;

    const toggleRead = document.createElement('button');
    toggleRead.id = book.is_read ? "toggle-read" : "toggle-unread";
    toggleRead.textContent = !book.is_read ? "Read" : "Unread";

    toggleRead.addEventListener('click', () => {
        book.is_read = !book.is_read;
        read.textContent = book.is_read ? "Read" : "Unread";

        toggleRead.textContent = !book.is_read ? "Read" : "Unread";
        toggleRead.id = book.is_read ? "toggle-read" : "toggle-unread";
    })  

    bookElement.appendChild(title);
    bookElement.appendChild(read);
    bookElement.appendChild(author);
    bookElement.appendChild(num_pages);
    bookElement.appendChild(toggleRead);

    shelf.appendChild(bookElement);
}

function bookEqual(book1, book2) {
    if (book1.author != book2.author)
        return false;
    if (book1.title != book2.title)
        return false;
    return book1.num_pages == book2.num_pages;
}

function displayBooks() {
    // clear the shelf.
    while (shelf.hasChildNodes()) {
        shelf.removeChild(shelf.firstChild);
    }

    myLibrary.forEach(book => {
        addBookToDisplay(book);
    });
}

// Event listeners
addBook.addEventListener('click', () => {
    dialog.showModal();
})

form.addEventListener('submit', (event) => {
    const newTitle = titleInput.value;
    const newAuthor = authorInput.value;
    const newPages = pageInput.value;
    const newis_read = is_readInput.checked;

    const newBook = new Book(newAuthor, newTitle, newPages, newis_read);
    if (!addBookToLibrary(newBook)) {
        alert("Error!");
    }

    event.preventDefault();
    dialog.close();

    titleInput.value = '';
    authorInput.value = '';
    pageInput.value = '';
    is_readInput.checked = false;
})

