const API_URL = "http://localhost:3000/books";
let books = [];
let visibleBooks = [];
let sortAscending = true;

class Book {
  constructor(id, title, author, pages, price) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.price = price;
  }
}

async function fetchBooks({ query = "", sort = "", order = "" } = {}) {
  try {
    const params = new URLSearchParams();
    if (query) params.append("q", query);
    if (sort) params.append("sort", sort);
    if (order) params.append("order", order);

    const res = await fetch(`${API_URL}?${params.toString()}`);
    if (!res.ok) throw new Error("Не вдалося отримати книжки");
    books = await res.json();
    visibleBooks = [...books];
    renderBooks(visibleBooks);
  } catch (err) {
    console.error("Помилка при завантаженні книжок:", err);
    alert("Сервер недоступний або сталася помилка.");
  }
}

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
  const query = document.getElementById("searchInput").value.trim();
  fetchBooks({ query });
}

function clearSearch() {
  document.getElementById("searchInput").value = "";
  fetchBooks();
}

function sortByPrice() {
  sortAscending = !sortAscending;
  const query = document.getElementById("searchInput").value.trim();
  fetchBooks({
    query,
    sort: "price",
    order: sortAscending ? "asc" : "desc"
  });
}

function toggleCreateForm() {
  document.getElementById("createModal").classList.remove("hidden");
}

function closeCreateModal() {
  document.getElementById("createModal").classList.add("hidden");
}

document.getElementById("createForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const form = e.target;

  const nameRegex = /^[А-Яа-яЁёЇїІіЄєҐґA-Za-z\s]+$/;
  if (!nameRegex.test(form.author.value)) {
    alert("Поле 'Автор' має містити лише літери.");
    return;
  }

  const newBook = {
    title: form.title.value,
    author: form.author.value,
    pages: parseInt(form.pages.value),
    price: parseFloat(form.price.value)
  };

  if (newBook.pages <= 0 || newBook.price <= 0) {
    alert("Некоректні числові значення.");
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook)
    });
    if (!res.ok) throw new Error("Помилка при створенні книжки");
    alert("Книжку створено!");
    form.reset();
    closeCreateModal();
    await fetchBooks();
  } catch (err) {
    console.error(err);
    alert("Не вдалося створити книжку.");
  }
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

document.getElementById("editForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const form = e.target;

  const nameRegex = /^[А-Яа-яЁёЇїІіЄєҐґA-Za-z\s]+$/;
  if (!nameRegex.test(form.author.value)) {
    alert("Поле 'Автор' має містити лише літери.");
    return;
  }

  const id = parseInt(form.id.value);
  const pages = parseInt(form.pages.value);
  const price = parseFloat(form.price.value);

  if (pages <= 0 || price <= 0) {
    alert("Некоректні числові значення.");
    return;
  }

  const updatedBook = {
    title: form.title.value,
    author: form.author.value,
    pages,
    price
  };

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBook)
    });
    if (!res.ok) throw new Error("Помилка при оновленні книжки");
    alert("Книжку оновлено!");
    closeEditModal();
    await fetchBooks();
  } catch (err) {
    console.error(err);
    alert("Не вдалося оновити книжку.");
  }
});

async function deleteBook(id) {
  if (confirm("Ви впевнені, що хочете видалити цю книжку?")) {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Помилка при видаленні книжки");
      await fetchBooks();
    } catch (err) {
      console.error(err);
      alert("Не вдалося видалити книжку.");
    }
  }
}

fetchBooks();