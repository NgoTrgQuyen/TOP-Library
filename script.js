const unreadBook= [];
const readBook = [];

function Book(name, author = "N/A", pages = "0", description = "N/A") {
    this.name = name;
    if(author) this.author = author;
    if(pages) this.pages = pages;
    if(description) this.description = description;
};

const cardContainer = document.querySelector(".card");

//Create book
const createBookDialog = document.querySelector("#add-book-dialog");
const createBookForm = createBookDialog.querySelector("form");

document.querySelector("#open-add-book-dialog").addEventListener("click", () =>{
    createBookDialog.showModal();
});

createBookDialog.querySelector(".close-form").addEventListener("click", () => {
    createBookDialog.close();
});

createBookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    bookName = createBookForm.elements.name.value.trim();
    bookAuthor = createBookForm.elements.author.value.trim();
    bookPages = createBookForm.elements.pages.value.trim();
    bookDescription = createBookForm.elements.description.value.trim();

    const book = new Book(bookName, bookAuthor, bookPages, bookDescription);

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

    metadata.append(author, document.createTextNode(" | "), pages);
    detail.append(title, metadata);

    const descriptionDetails = document.createElement("details");
    descriptionDetails.className = "book-description";

    const summary = document.createElement("summary");
    summary.textContent = "More info";

    const description = document.createElement("p");
    description.textContent = book.description;

    descriptionDetails.append(summary, description);
    cardContainer.append(detail);

    console.log("executed");

    createBookForm.reset();
    createBookDialog.close();
});