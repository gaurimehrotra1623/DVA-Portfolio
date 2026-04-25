import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { profileData } from '../data';
import './PostModal.css';

const PostModal = ({ post, onClose }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!post) return null;

  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={onClose}>
        <motion.button 
          className="close-btn"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onClose}
        >
          <X size={24} color="white" />
        </motion.button>
        
        <motion.div 
          className="modal-content"
          onClick={e => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div className="modal-image" style={{ background: post.image }}></div>
          
          <div className="modal-sidebar">
            <div className="modal-header">
              <div className="modal-user-info">
                <div className="modal-avatar" style={{ background: `url(${profileData.avatar}) center/cover no-repeat` }}></div>
                <span className="modal-username">{profileData.handle}</span>
              </div>
              <button className="btn-icon"><MoreHorizontal size={20} /></button>
            </div>
            
            <div className="modal-comments">
              <div className="comment">
                <div className="modal-avatar small" style={{ background: `url(${profileData.avatar}) center/cover no-repeat` }}></div>
                <div className="comment-text">
                  <span className="comment-username">{profileData.handle}</span>
                  <strong>{post.title}</strong> — {post.description}
                  <div className="comment-meta">2d</div>
                </div>
              </div>
              
              {post.github && (
                <div className="comment">
                  <div className="modal-avatar small" style={{ background: `url(${profileData.avatar}) center/cover no-repeat` }}></div>
                  <div className="comment-text">
                    <span className="comment-username">{profileData.handle}</span>
                    <a href={post.github} target="_blank" rel="noreferrer" style={{ color: 'var(--btn-primary)', textDecoration: 'none', fontWeight: 500 }}>
                      🔗 View Source on GitHub
                    </a>
                    <div className="comment-meta">1d</div>
                  </div>
                </div>
              )}
              
              {post.live && (
                <div className="comment">
                  <div className="modal-avatar small" style={{ background: `url(${profileData.avatar}) center/cover no-repeat` }}></div>
                  <div className="comment-text">
                    <span className="comment-username">{profileData.handle}</span>
                    <a href={post.live} target="_blank" rel="noreferrer" style={{ color: 'var(--btn-primary)', textDecoration: 'none', fontWeight: 500 }}>
                      🚀 View Live Project
                    </a>
                    <div className="comment-meta">1d</div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="modal-actions-wrapper">
              <div className="modal-actions">
                <div className="action-icons">
                  <button className="btn-icon" onClick={() => setLiked(!liked)}>
                    <Heart size={24} fill={liked ? "var(--like-color)" : "none"} color={liked ? "var(--like-color)" : "var(--text-primary)"} />
                  </button>
                  <button className="btn-icon"><MessageCircle size={24} /></button>
                  <button className="btn-icon"><Send size={24} /></button>
                </div>
                <button className="btn-icon" onClick={() => setSaved(!saved)}>
                  <Bookmark size={24} fill={saved ? "var(--text-primary)" : "none"} />
                </button>
              </div>
              <div className="modal-likes">{post.likes + (liked ? 1 : 0)} likes</div>
              <div className="modal-date">2 DAYS AGO</div>
            </div>
            
            <div className="modal-add-comment">
              <input type="text" placeholder="Add a comment..." />
              <button className="post-comment-btn">Post</button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PostModal;
