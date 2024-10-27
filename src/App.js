// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemsList from './ItemsList';
// You can import other components here

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<ItemsList />} />
                    {/* You can add more routes here */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
