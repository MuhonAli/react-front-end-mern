// src/ItemsList.js
import React, { useState, useEffect } from 'react';
import { fetchItems, createItem, updateItem, deleteItem } from './services/apiService';

const ItemsList = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', description: '' });
    const [editItem, setEditItem] = useState(null);

    useEffect(() => {
        // Fetch items on component mount
        loadItems();
    }, []);

    // Load items from the backend
    const loadItems = async () => {
        const data = await fetchItems();
        setItems(data);
    };

    // Handle form submission to create a new item
    const handleCreate = async () => {
        if (newItem.name && newItem.description) {
            await createItem(newItem);
            setNewItem({ name: '', description: '' });
            loadItems();
        }
    };

    // Handle updating an existing item
    const handleUpdate = async (id) => {
        await updateItem(id, editItem);
        setEditItem(null);
        loadItems();
    };

    // Handle deleting an item
    const handleDelete = async (id) => {
        await deleteItem(id);
        loadItems();
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">Items List</h1>

            {/* Create New Item */}
            <div className="mb-4">
                <h4>Add New Item</h4>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        value={newItem.description}
                        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    />
                    <button className="btn btn-primary" onClick={handleCreate}>Add Item</button>
                </div>
            </div>

            {/* Display Items */}
            <h4>Existing Items</h4>
            <ul className="list-group">
                {items.map((item) => (
                    <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                        {editItem && editItem._id === item._id ? (
                            <>
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    value={editItem.name}
                                    onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                                />
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    value={editItem.description}
                                    onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                                />
                                <button className="btn btn-success" onClick={() => handleUpdate(item._id)}>Save</button>
                            </>
                        ) : (
                            <>
                                <span>{item.name} - {item.description}</span>
                                <div>
                                    <button className="btn btn-warning me-2" onClick={() => setEditItem(item)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemsList;
