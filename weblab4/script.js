class Book {
  constructor(id, title, author, pages, price) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.price = price;
  }
}

const books = [
  new Book(1, "1984", "Джордж Орвелл", 328, 210),
  new Book(2, "451° за Фаренгейтом", "Рей Бредбері", 256, 190),
  new Book(4, "12 правил життя", "Джордан Пітерсон", 400, 250),
  new Book(5, "100 років самотності", "Габріель Гарсія Маркес", 432, 270),
  new Book(6, "Тіні забутих предків", "Михайло Коцюбинський", 240, 150),
  new Book(7, "Захар Беркут", "Іван Франко", 320, 180),
  new Book(8, "Кобзар", "Тарас Шевченко", 140, 200),
  new Book(10, "Хто ми такі?", "Ювал Ной Харарі", 350, 260),
];

let visibleBooks = [...books];
let sortAscending = true;

function renderBooks(data) {
  const container = document.getElementById("bookList");
  container.innerHTML = "";
  data.forEach(book => {
    container.insertAdjacentHTML("beforeend", `
      <div class="book-card">
        <strong>${book.title}</strong>
        <div class="book-author">${book.author}</div>
        <div class="book-meta">Сторінок: ${book.pages}, Ціна: ${book.price} грн</div>
        <div class="book-actions">
          <button class="edit-btn" onclick="editBook(${book.id})">✏️ Редагувати</button>
          <button class="remove-btn" onclick="deleteBook(${book.id})">🗑️ Видалити</button>
        </div>
      </div>
    `);
  });
  updateTotalExpense();
}

function updateTotalExpense() {
  const total = visibleBooks.reduce((sum, b) => sum + b.price, 0);
  document.getElementById("totalExpenseDisplay").textContent = `Загальна ціна: ${total} грн`;
}

function searchBooks() {
  const input = document.getElementById("searchInput");
  const query = input.value.toLowerCase().trim();

  visibleBooks = books.filter(b =>
    b.title.toLowerCase().includes(query) || b.author.toLowerCase().includes(query)
  );
  renderBooks(visibleBooks);
}

function clearSearch() {
  document.getElementById("searchInput").value = "";
  visibleBooks = [...books];
  renderBooks(visibleBooks);
}

function sortByPrice() {
  visibleBooks.sort((a, b) =>
    sortAscending ? a.price - b.price : b.price - a.price
  );
  sortAscending = !sortAscending;
  renderBooks(visibleBooks);
}

function toggleCreateForm() {
  document.getElementById("createModal").classList.remove("hidden");
}

function closeCreateModal() {
  document.getElementById("createModal").classList.add("hidden");
}

document.getElementById("createForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = e.target;

  const nameRegex = /^[А-Яа-яЁёЇїІіЄєҐґA-Za-z\s]+$/;
  if (!nameRegex.test(form.author.value)) {
    alert("Поле 'Автор' має містити лише літери.");
    return;
  }

  const newBook = new Book(
    books.length + 1,
    form.title.value,
    form.author.value,
    parseInt(form.pages.value),
    parseFloat(form.price.value)
  );

  if (newBook.pages <= 0 || newBook.price <= 0) {
    alert("Некоректні числові значення.");
    return;
  }

  books.push(newBook);
  visibleBooks = [...books];
  alert("Книжку створено!");
  form.reset();
  closeCreateModal();
  renderBooks(visibleBooks);
});

function editBook(id) {
  const book = books.find(b => b.id === id);
  const form = document.getElementById("editForm");

  form.id.value = book.id;
  form.title.value = book.title;
  form.author.value = book.author;
  form.pages.value = book.pages;
  form.price.value = book.price;

  document.getElementById("editModal").classList.remove("hidden");
}

function closeEditModal() {
  document.getElementById("editModal").classList.add("hidden");
}

document.getElementById("editForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = e.target;

  const nameRegex = /^[А-Яа-яЁёЇїІіЄєҐґA-Za-z\s]+$/;
  if (!nameRegex.test(form.author.value)) {
    alert("Поле 'Автор' має містити лише літери.");
    return;
  }

  const id = parseInt(form.id.value);
  const book = books.find(b => b.id === id);
  const pages = parseInt(form.pages.value);
  const price = parseFloat(form.price.value);

  if (pages <= 0 || price <= 0) {
    alert("Некоректні числові значення.");
    return;
  }

  book.title = form.title.value;
  book.author = form.author.value;
  book.pages = pages;
  book.price = price;

  alert("Книжку оновлено!");
  closeEditModal();
  renderBooks(visibleBooks);
});

function deleteBook(id) {
  const index = books.findIndex(b => b.id === id);
  if (index !== -1) {
    if (confirm("Ви впевнені, що хочете видалити цю книжку?")) {
      books.splice(index, 1);
      searchBooks();
    }
  }
}

renderBooks(visibleBooks);