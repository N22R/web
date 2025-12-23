import axios from 'axios';

const BASE_URL = 'http://localhost:3001/books';

export const fetchBooks = async (params = {}) => {
  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Помилка при отриманні книг:', error);
    return [];
  }
};

export const fetchBookById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Помилка при отриманні книги:', error);
    return null;
  }
};