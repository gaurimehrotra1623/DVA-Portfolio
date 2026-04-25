import React from 'react';
import { motion } from 'framer-motion';
import { Settings, CheckCircle2 } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { profileData, highlightsData } from '../data';
import './ProfileHeader.css';

const ProfileHeader = ({ onHighlightClick, onMessageClick }) => {
  return (
    <div className="profile-header">
      <div className="profile-header-top">
        <div className="avatar-container">
          <div className="story-ring">
            <motion.div 
              className="avatar-image"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{ background: `url(${profileData.avatar}) center/cover no-repeat` }}
            />
          </div>
        </div>
        
        <div className="profile-info">
          <div className="profile-actions-row">
            <h2 className="username">{profileData.handle} <CheckCircle2 size={18} color="var(--btn-primary)" className="verified-badge" /></h2>
            <div className="actions-desktop">
              <button className="btn-primary" onClick={() => window.open('https://www.linkedin.com/in/gauri-mehrotra-008580324/', '_blank', 'noreferrer')}>Follow</button>
              <button className="btn-secondary" onClick={onMessageClick}>Message</button>
              <button className="btn-icon"><Settings size={20} /></button>
            </div>
          </div>
          
          <div className="actions-mobile">
            <button className="btn-primary flex-1" onClick={() => window.open('https://www.linkedin.com/in/gauri-mehrotra-008580324/', '_blank', 'noreferrer')}>Follow</button>
            <button className="btn-secondary flex-1" onClick={onMessageClick}>Message</button>
            <button className="btn-icon"><Settings size={20} /></button>
          </div>

          <div className="profile-stats">
            <div className="stat"><strong>{profileData.stats.posts}</strong> posts</div>
            <div className="stat"><strong>{profileData.stats.followers}</strong> followers</div>
            <div className="stat"><strong>{profileData.stats.following}</strong> following</div>
          </div>

          <div className="profile-bio">
            <h1 className="full-name">{profileData.name}</h1>
            <p className="bio-text">
              {profileData.bio.split('|').map((line, index, array) => (
                <React.Fragment key={index}>
                  {line.trim()}
                  {index < array.length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
            <div className="bio-social-links" style={{ display: 'flex', gap: '16px', marginTop: '6px' }}>
              {profileData.github && (
                <a href={profileData.github} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--link-color)', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
                  <SiGithub size={16} color="var(--text-primary)" /> GitHub
                </a>
              )}
              {profileData.linkedin && (
                <a href={profileData.linkedin} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--link-color)', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
                  <FaLinkedin size={16} color="#0077b5" /> LinkedIn
                </a>
              )}
            </div>
            {profileData.website && (
              <a href={`https://${profileData.website}`} target="_blank" rel="noreferrer" className="bio-link">
                {profileData.website}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="highlights-container">
        {highlightsData.map((highlight, index) => (
          <motion.div 
            key={highlight.id} 
            className="highlight-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onHighlightClick(highlight.id)}
          >
            <div className="highlight-circle-wrapper">
              <div className="highlight-circle" style={{ background: highlight.cover }}></div>
            </div>
            <span className="highlight-name">{highlight.title}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProfileHeader;
