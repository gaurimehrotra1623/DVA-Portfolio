import React from 'react';
import { Heart, MessageCircle, Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import { projectsData } from '../data';
import './PostsGrid.css';

const PostsGrid = ({ onPostClick }) => {
  return (
    <div className="posts-grid">
      {projectsData.map((post, index) => (
        <motion.div 
          key={post.id} 
          className="post-item"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onPostClick(post)}
        >
          <div className="post-image" style={{ background: post.image }}>
            <div className="post-overlay">
              <div className="post-overlay-stats">
                <span className="post-stat"><Heart size={18} fill="white" /> {post.likes}</span>
                <span className="post-stat"><MessageCircle size={18} fill="white" /> {post.comments}</span>
              </div>
              <p className="post-title">{post.title}</p>
            </div>
            {/* Multiple images icon logic placeholder */}
            {index % 3 === 0 && <div className="carousel-icon"><Copy size={16} color="white" /></div>}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PostsGrid;
