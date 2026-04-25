import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Network, Table, LineChart, BarChart2 } from 'lucide-react';
import { timelineStories, profileData, techStack } from '../data';
import { SiPython, SiJavascript, SiTypescript, SiHtml5, SiCss, SiNodedotjs, SiExpress, SiFastapi, SiReact, SiPandas, SiNumpy, SiPlotly, SiPostman, SiJupyter, SiGithub, SiGooglecolab } from 'react-icons/si';
import './StoriesBar.css';

const getTechIcon = (id) => {
  switch(id) {
    case 'python': return <SiPython color="#3776AB" />;
    case 'javascript': return <SiJavascript color="#F7DF1E" />;
    case 'typescript': return <SiTypescript color="#3178C6" />;
    case 'html': return <SiHtml5 color="#E34F26" />;
    case 'css': return <SiCss color="#1572B6" />;
    case 'nodejs': return <SiNodedotjs color="#339933" />;
    case 'express': return <SiExpress />;
    case 'fastapi': return <SiFastapi color="#009688" />;
    case 'rest': return <Network color="#6366f1" size={16} />;
    case 'react': return <SiReact color="#61DAFB" />;
    case 'pandas': return <SiPandas color="#150458" />;
    case 'numpy': return <SiNumpy color="#013243" />;
    case 'excel': return <Table color="#217346" size={16} />;
    case 'matplotlib': return <LineChart color="#11557c" size={16} />;
    case 'seaborn': return <BarChart2 color="#4c72b0" size={16} />;
    case 'plotly': return <SiPlotly color="#3F4F75" />;
    case 'postman': return <SiPostman color="#FF6C37" />;
    case 'jupyter': return <SiJupyter color="#F37626" />;
    case 'github': return <SiGithub />;
    case 'colab': return <SiGooglecolab color="#F9AB00" />;
    default: return <Network size={16} />;
  }
};

const StoriesBar = () => {
  const [activeStory, setActiveStory] = useState(null);

  return (
    <>
      <div className="stories-bar-container">
        <h3 className="section-title">Work Experience</h3>
        <div className="stories-row">
          {timelineStories.map((story) => (
            <div 
              key={story.id} 
              className="story-bubble-wrapper"
              onClick={() => setActiveStory(story)}
            >
              <div className="story-ring-sm">
                <div className="story-bubble" style={{ background: story.bg }}>
                  <span className="story-year">{story.year}</span>
                </div>
              </div>
              <span className="story-label">{story.company}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="tech-highlights-container">
        <h3 className="section-title">Tech Highlights</h3>
        <div className="tech-chips-grid">
          {techStack.map((tech, index) => (
            <motion.div 
              key={tech.id} 
              className="tech-chip"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.02 }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="tech-chip-icon">
                {getTechIcon(tech.id)}
              </div>
              <span className="tech-chip-name">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeStory && (
          <div className="story-viewer-backdrop" onClick={() => setActiveStory(null)}>
            <motion.div 
              className="story-viewer"
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={{ background: activeStory.bg }}
            >
              <div className="story-progress-container">
                <motion.div 
                  className="story-progress-fill"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  onAnimationComplete={() => setActiveStory(null)}
                />
              </div>
              
              <div className="story-header">
                <div className="story-user">
                  <div className="story-avatar" style={{ background: `url(${profileData.avatar}) center/cover no-repeat` }}></div>
                  <span className="story-username">{profileData.handle}</span>
                  <span className="story-time">Just now</span>
                </div>
                <button className="close-story-btn" onClick={() => setActiveStory(null)}>
                  <X size={24} color="white" />
                </button>
              </div>
              
              <div className="story-content">
                <h1 className="story-big-text">{activeStory.year}</h1>
                <h2 className="story-role">{activeStory.role}</h2>
                <h3 className="story-company">@ {activeStory.company}</h3>
                {activeStory.description && (
                  <p className="story-description">{activeStory.description}</p>
                )}
                {activeStory.link && (
                  <a 
                    href={activeStory.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="story-link-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StoriesBar;
