const booksTable = document.querySelector(".books")
const button = document.querySelector("#submit")
const titleField = document.querySelector("#title")
const authorField = document.querySelector("#author")
const pagesField = document.querySelector("#pages")
const readCheckbox = document.querySelector("#read")
const displayFormButton = document.querySelector('#display-form')
const formDiv = document.querySelector('.add-books')
const form = document.querySelector('form')
const tableHeader = booksTable.children[0]

let myLibrary = []

formDiv.hidden = true

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  if (read) {
    this.read = "Already read"
  }else {
    this.read = "Not read yet"
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book)
  booksTable.innerHTML = ""
  form.reset()
  booksTable.appendChild(tableHeader)
  updateLibrary()
  formDiv.hidden = true
}

function updateLibrary() {
  myLibrary.forEach((book, index) => {
    let newRow = document.createElement('tr')
    newRow.setAttribute('data-id', index)
    let bookId = document.createElement('td')
    bookId.textContent = index
    newRow.appendChild(bookId)
    for (let key in book) {
      let bookData = document.createElement('td')
      bookData.textContent = book[key]
      newRow.appendChild(bookData)
    }
    if (book.read == "Already read") {
      newRow.classList.add('already-read')
    }
    newRow = addDeleteButton(newRow)
    booksTable.appendChild(newRow)
  })
}

function addDeleteButton(tableRow) {
  let tableColumn = document.createElement('td')
  let deleteButton = document.createElement('a')
  deleteButton.textContent = "Delete"
  deleteButton.setAttribute('href', '#')
  deleteButton.setAttribute('data-delete', tableRow.getAttribute('data-id'))
  deleteButton.addEventListener('click', (a) => {
    deleteBook(a.target.getAttribute('data-delete'))
  })
  tableColumn.appendChild(deleteButton)
  tableRow.appendChild(tableColumn)
  return(tableRow)
}

function deleteBook(bookId) {
  let book = document.querySelector(`[data-id="${bookId}"]`)
  book.parentNode.removeChild(book)
  for(let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].title == book.children[1].textContent) {
      myLibrary.splice(i, 1)
    }
  }
}

button.addEventListener('click', () => {
  if (titleField.value != "" && authorField.value != "") {
    addBookToLibrary(new Book(titleField.value, authorField.value, pagesField.value, readCheckbox.checked))
  }
})

displayFormButton.addEventListener('click', () => {
  formDiv.hidden = false
})


