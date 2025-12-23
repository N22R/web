class Book {
  constructor(title, author, pages, price) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.price = price;
  }
}

const books = [
  new Book("Тіні забутих предків", "Михайло Коцюбинський", 160, 120),
  new Book("Захар Беркут", "Іван Франко", 200, 150),
  new Book("Кайдашева сім'я", "Іван Нечуй-Левицький", 180, 100),
  new Book("Місто", "Валер’ян Підмогильний", 220, 130)
];

function renderBooks(bookArray) {
  const tbody = document.getElementById("bookTableBody");
  tbody.innerHTML = "";

  bookArray.forEach(book => {
    const row = `
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>${book.price}</td>
      </tr>
    `;
    tbody.insertAdjacentHTML("beforeend", row);
  });
}

renderBooks(books);

function sortBooks() {
  const sorted = [...books].sort((a, b) => a.price - b.price);
  renderBooks(sorted);
}

function searchBooks() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = books.filter(book =>
    book.author.toLowerCase().includes(query)
  );
  renderBooks(filtered);
}

function countTotalPrice() {
  const total = books.reduce((sum, book) => sum + book.price, 0);
  alert(`Загальна ціна всіх книжок: ${total} грн`);
}

function showTitles() {
  const titles = books.map(book => book.title);
  alert("Назви книжок:\n" + titles.join("\n"));
}