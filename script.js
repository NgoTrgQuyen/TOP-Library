const unreadBook= [];
const readBook = [];

function Book(name, author, pages, description) {
    this.name = name;
    this.author = author || "N/A";
    this.pages = pages || "0";
    this.description = description || "N/A";
};

const cardContainer = document.querySelector(".card-container");
const readCardContainer = document.querySelector(".read-card-container");

//Create book
const createBookDialog = document.querySelector("#add-book-dialog");
const createBookForm = createBookDialog.querySelector("form");

//Edit book
const editBookDialog = document.querySelector("#edit-book-dialog");
const editBookForm = editBookDialog.querySelector("form");

//Variable to update edited book
let bookBeingEdited;
let refreshEditedCard;

document.querySelector("#open-add-book-dialog").addEventListener("click", () =>{
    createBookDialog.showModal();
});

createBookDialog.querySelector(".close-form").addEventListener("click", () => {
    createBookDialog.close();
});

document.querySelector(".cancel-edit").addEventListener("click", () => {
    editBookDialog.close();
});

createBookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    bookName = createBookForm.elements.name.value.trim();
    bookAuthor = createBookForm.elements.author.value.trim();
    bookPages = createBookForm.elements.pages.value.trim();
    bookDescription = createBookForm.elements.description.value.trim();

    const book = new Book(bookName, bookAuthor, bookPages, bookDescription);

    const card = document.createElement("div");
    card.className = "card";

    const detail = document.createElement("div");
    detail.className = "card-detail";

    const title  = document.createElement("h2");
    title.textContent = book.name;

    const metadata = document.createElement("div");
    metadata.className = "metadata";

    const author = document.createElement("span");
    author.className = "author";
    author.textContent = book.author;

    const page = document.createElement("span");
    page.className = "page";
    page.textContent = book.pages;

    metadata.append(author, document.createTextNode(" | "), page);
    detail.append(title, metadata);

    const descriptionDetails = document.createElement("details");
    descriptionDetails.className = "book-description";

    const summary = document.createElement("summary");
    summary.textContent = "More info";

    const description = document.createElement("p");
    description.textContent = book.description;

    const editButton = document.createElement("button");
    editButton.className = "edit-book";
    editButton.textContent = "Edit";

    const readButton = document.createElement("button");
    readButton.className = "read";
    readButton.textContent = "Mark as finished";

    const cardButton = document.createElement("div");
    cardButton.className = "card-button";
    cardButton.append(editButton, readButton);

    descriptionDetails.append(summary, description);
    card.append(detail, descriptionDetails);
    card.append(cardButton);

    cardContainer.append(card);

    unreadBook.push(book);

    function updateCard() {
        title.textContent = book.name;
        author.textContent = book.author;
        page.textContent = book.pages;
        description.textContent = book.description;
    }

    editButton.type = "button";

    editButton.addEventListener("click", () => {
        bookBeingEdited = book;
        refreshEditedCard = updateCard;

        editBookForm.elements.name.value = book.name;
        editBookForm.elements.author.value = book.author;
        editBookForm.elements.pages.value = book.pages;
        editBookForm.elements.description.value = book.description;

        editBookDialog.showModal();
        
    });

    readButton.type = "button";

    readButton.addEventListener("click", () => {
        const unreadIndex = unreadBook.indexOf(book);

        if(unreadIndex !== -1){
            unreadBook.splice(unreadIndex, 1);
            readBook.push(book);
            readCardContainer.append(card);

            card.classList.add("finished");
            readButton.textContent = "Mark as unread";
        }
        else{
            const readIndex = readBook.indexOf(book);

            if(readIndex !== -1){
            readBook.splice(readIndex, 1);
            unreadBook.push(book);
            cardContainer.append(card);
            }

            card.classList.remove("finished");
            readButton.textContent = "Mark as finished";
        }
    });

    createBookForm.reset();
    createBookDialog.close();
});

//edit book
editBookForm.addEventListener("submit", (submitEvent) => {
    submitEvent.preventDefault();

    bookBeingEdited.name = editBookForm.elements.name.value.trim();
    bookBeingEdited.author = editBookForm.elements.author.value.trim();
    bookBeingEdited.pages = editBookForm.elements.pages.value.trim();
    bookBeingEdited.description = editBookForm.elements.description.value.trim();

    console.log(bookBeingEdited.description)

    refreshEditedCard();
    editBookDialog.close();
});