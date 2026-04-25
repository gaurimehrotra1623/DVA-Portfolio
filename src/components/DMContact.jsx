/*
  EMAIL SETUP — EmailJS (free, no backend needed)
  1. Go to https://emailjs.com and create a free account
  2. Add an Email Service (Gmail recommended) → copy Service ID
  3. Create an Email Template with these variables:
       {{visitor_message}}  — the message they typed
       {{sent_at}}          — timestamp of the message
       {{reply_to}}         — leave blank or set to a no-reply
  4. Copy your Public Key from Account → API Keys
  5. Replace YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_PUBLIC_KEY below
*/

import React, { useState, useEffect, useRef } from 'react';
import { Info, Video, Phone, Image as ImageIcon, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { profileData } from '../data';
import './DMContact.css';

// Initialize EmailJS
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY");

const formatMessageTime = (date) => {
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const timeStr = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  if (isToday) return `Today ${timeStr}`;
  if (isYesterday) return `Yesterday ${timeStr}`;
  return date.toLocaleDateString([], {
    weekday: 'short', month: 'short', day: 'numeric'
  }) + ` · ${timeStr}`;
};

const getShortTime = (date) => {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
};

const DMContact = () => {
  const [messageTime] = useState(() => formatMessageTime(new Date()));
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(() => [
    { id: 1, type: 'incoming', text: "Drop in a message!!", time: getShortTime(new Date()) }
  ]);
  const [isSending, setIsSending] = useState(false);
  const [deliveredId, setDeliveredId] = useState(null);
  const [failedId, setFailedId] = useState(null);
  
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (deliveredId || failedId) {
      const timer = setTimeout(() => {
        setDeliveredId(null);
        setFailedId(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [deliveredId, failedId]);

  const handleTyping = (e) => {
    setMessage(e.target.value);
    
    // Auto-resize logic
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      // Max height approx 5 lines (100px)
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 100)}px`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async () => {
    if (!message.trim() || isSending) return;

    const newMessage = {
      id: Date.now() + 1,
      type: 'outgoing', // Visitor's message, colored blue
      text: message.trim(),
      time: getShortTime(new Date()),
      status: 'sending'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");
    
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
    }

    setIsSending(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        {
          visitor_message: newMessage.text,
          sent_at: new Date().toLocaleString(),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
      );
      
      setMessages(prev => prev.map(m => m.id === newMessage.id ? { ...m, status: 'sent' } : m));
      setDeliveredId(newMessage.id);
    } catch (error) {
      console.error('EmailJS error:', error);
      setMessages(prev => prev.map(m => m.id === newMessage.id ? { ...m, status: 'failed' } : m));
      setFailedId(newMessage.id);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="dm-container">
      <div className="dm-sidebar">
        <div className="dm-header">
          <div className="dm-username">{profileData.handle}</div>
        </div>
        <div className="dm-list">
          <div className="dm-list-item active">
            <div className="dm-avatar-wrapper">
              <div className="dm-avatar" style={{ background: 'var(--accent-gradient)' }}>
                <div className="dm-avatar-inner" style={{ backgroundImage: 'linear-gradient(135deg, #a18cd1, #fbc2eb)' }}></div>
              </div>
            </div>
            <div className="dm-list-info">
              <div className="dm-list-name">Gauri</div>
              <div className="dm-list-preview">
                <span className="status-dot"></span> Active now
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="dm-main">
        <div className="dm-main-header">
          <div className="dm-main-user">
            <div className="dm-avatar small" style={{ background: 'linear-gradient(135deg, #a18cd1, #fbc2eb)' }}></div>
            <div className="dm-main-name">Gauri</div>
            <span className="status-dot header-dot"></span>
          </div>
          <div className="dm-header-actions">
            <Phone size={22} className="dm-action-icon" />
            <Video size={22} className="dm-action-icon" />
            <Info size={22} className="dm-action-icon" />
          </div>
        </div>
        
        <div className="dm-chat-area">
          <div className="dm-timestamp">{messageTime}</div>
          
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div 
                key={msg.id}
                className={`message-wrapper ${msg.type}`}
                initial={{ opacity: 0, x: msg.type === 'incoming' ? -10 : 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <div className={`message ${msg.type} ${msg.status === 'sending' ? 'sending' : ''}`}>
                  {msg.type === 'incoming' && (
                    <div className="dm-avatar small" style={{ background: 'linear-gradient(135deg, #a18cd1, #fbc2eb)' }}></div>
                  )}
                  <div className="message-content">
                    <div className="message-bubble">
                      {msg.text}
                    </div>
                  </div>
                </div>
                
                <div className="message-meta">
                  {msg.time}
                  {deliveredId === msg.id && (
                    <motion.span 
                      className="status-text delivered"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      ✓ Delivered
                    </motion.span>
                  )}
                  {failedId === msg.id && (
                    <motion.span 
                      className="status-text failed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      ⚠ Failed to send
                    </motion.span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
        
        <div className="dm-input-area">
          <div className="dm-input-wrapper">
            <ImageIcon size={24} className="dm-input-icon" />
            <textarea 
              ref={textareaRef}
              placeholder="Message..." 
              value={message}
              onChange={handleTyping}
              onKeyDown={handleKeyDown}
              disabled={isSending}
              rows={1}
            />
            <AnimatePresence mode="wait">
              {message.trim().length > 0 ? (
                <motion.button 
                  key="send"
                  type="button" 
                  className="dm-send-btn"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  onClick={handleSend}
                  disabled={isSending}
                >
                  Send
                </motion.button>
              ) : (
                <motion.button 
                  key="heart"
                  type="button"
                  className="dm-heart-btn"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  disabled={isSending}
                >
                  <Heart size={24} className="dm-input-icon interactable" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DMContact;
