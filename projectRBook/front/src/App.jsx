import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import Login from './pages/Login';
import Join from './pages/Join';
import BlogWrite from './pages/BlogWrite';
import BlogDetail from './pages/BlogDetail';
import BlogEdit from './pages/BlogEdit';
import Profile from './pages/Profile';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <div className="app-wrapper">
        <Header />
        <main className="main-container animate-fade-in">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/blogs/write" element={<BlogWrite />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/blogs/edit/:id" element={<BlogEdit />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
