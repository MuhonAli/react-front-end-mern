// src/services/apiService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/items'; // Change this to match your backend URL and port

// Fetch all items
export const fetchItems = async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
};
 
// Create a new item
export const createItem = async (item) => { 
    console.log(item); 
    const response = await axios.post(API_BASE_URL, item);
    return response.data;
};

// Update an item
export const updateItem = async (id, updatedItem) => {
    console.log(id, )
    const response = await axios.patch(`${API_BASE_URL}/${id}`, updatedItem);
    return response.data;
};

// Delete an item
export const deleteItem = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
};
