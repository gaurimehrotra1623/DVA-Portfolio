import React, { useState } from 'react';
import { Home, Menu, Grid, Bookmark, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import ProfileHeader from './components/ProfileHeader';
import StoriesBar from './components/StoriesBar';
import PostsGrid from './components/PostsGrid';
import PostModal from './components/PostModal';

import DMContact from './components/DMContact';
import Footer from './components/Footer';

import { profileData } from './data';
import { useTheme } from './context/ThemeContext';
import './App.css';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('POSTS');
  const [selectedPost, setSelectedPost] = useState(null);
  
  const handleHighlightClick = (highlightId) => {
    // Map highlights to tabs
    if (highlightId === 'projects' || highlightId === 'skills' || highlightId === 'experience') setActiveTab('POSTS');
    if (highlightId === 'contact') setActiveTab('SAVED'); // Using SAVED for Contact/DM
    
    // Smooth scroll down to tabs section
    window.scrollTo({
      top: 500, // Approximate scroll position of tabs
      behavior: 'smooth'
    });
  };

  const goHome = () => {
    setActiveTab('POSTS');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="app">
      {/* Top Navbar */}
      <nav className="navbar">
        <div className="container navbar-container">
          <div className="navbar-logo" onClick={goHome}>{profileData.name}</div>
          <div className="navbar-icons">
            <Home size={24} className="navbar-icon" onClick={goHome} />
            <button 
              onClick={toggleTheme} 
              className="navbar-icon"
              style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, rotate: 180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -180 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  style={{ position: 'absolute', display: 'flex' }}
                >
                  {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
                </motion.div>
              </AnimatePresence>
            </button>
            <div className="navbar-icon" style={{ width: 24, height: 24, borderRadius: '50%', background: `url(${profileData.avatar}) center/cover no-repeat` }}></div>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <div className="container">
          <ProfileHeader 
            onHighlightClick={handleHighlightClick} 
            onMessageClick={() => handleHighlightClick('contact')} 
          />
          
          <StoriesBar />

          {/* Profile Tabs */}
          <div className="profile-tabs">
            <button 
              className={`tab ${activeTab === 'POSTS' ? 'active' : ''}`}
              onClick={() => setActiveTab('POSTS')}
            >
              <Grid size={12} /> POSTS
            </button>

            <button 
              className={`tab ${activeTab === 'SAVED' ? 'active' : ''}`}
              onClick={() => setActiveTab('SAVED')}
            >
              <Bookmark size={12} /> DM / CONTACT
            </button>
          </div>

          {/* Tab Content */}
          <div className="section-wrapper">
            <AnimatePresence mode="wait">
              {activeTab === 'POSTS' && (
                <motion.div
                  key="posts"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <PostsGrid onPostClick={setSelectedPost} />
                </motion.div>
              )}
              

              
              {activeTab === 'SAVED' && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <DMContact />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />

      {/* Post Modal */}
      <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </div>
  );
}

export default App;
