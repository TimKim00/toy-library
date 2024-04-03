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

    if (myLibrary.length == 0) {
        shelf.innerHTML = '';
    }

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

    if (myLibrary.length == 0) {
        shelf.textContent = "Please 'Add Book' to your Library!";
    }

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
    read.style.color = book.is_read ? "rgb(36, 161, 36)" : "goldenrod";

    const author = document.createElement('div');
    author.id = "author";
    const text_a = document.createElement('h6');
    text_a.id="card-descriptor";
    text_a.textContent = "Author: ";
    author.appendChild(text_a);
    author.append(book.author);

    const num_pages = document.createElement('div');
    num_pages.id = "pages";
    const text_p = document.createElement('h6');
    text_p.id="card-descriptor";
    text_p.textContent = "Length (page): ";
    num_pages.appendChild(text_p);
    num_pages.append(book.num_pages);

    const buttons = document.createElement('div');
    buttons.id = "buttons";

    const toggleRead = document.createElement('button');
    toggleRead.id = book.is_read ? "toggle-read" : "toggle-unread";
    toggleRead.textContent = !book.is_read ? "Read" : "Unread";

    toggleRead.addEventListener('click', () => {
        book.is_read = !book.is_read;
        read.textContent = book.is_read ? "Read" : "Unread";
        read.style.color = book.is_read ? "rgb(36, 161, 36)" : "goldenrod";

        toggleRead.textContent = !book.is_read ? "Read" : "Unread";
        toggleRead.id = book.is_read ? "toggle-read" : "toggle-unread";
    })  

    const removeButton = document.createElement('button');
    removeButton.id = "remove";
    
    removeButton.addEventListener('click', () => {
        removeBookFromLibrary(book);
    })  

    buttons.appendChild(toggleRead);
    buttons.appendChild(removeButton);

    bookElement.appendChild(title);
    title.appendChild(read);
    bookElement.appendChild(author);
    bookElement.appendChild(num_pages);
    bookElement.appendChild(buttons);

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

