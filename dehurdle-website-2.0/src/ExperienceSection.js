import React, { useEffect, useState, useRef } from 'react';
import './ExperienceSection.css';

const TimelineItem = ({ number, title,subtitle, isRight, progress }) => {
    // Calculate if this item should be active based on scroll progress
    // Adjusted formula to slow down activation
    const isActive = progress >= (number * 0.3); // Increased multiplier to slow down
    
    return (
        <div className={`timeline-item ${isRight ? 'right' : 'left'} ${isActive ? 'active' : ''}`}>
            <div className="circle">{number}</div>
            <div className="content">
                <p className="title">{title}</p>
                <p className="subtitle">{subtitle}</p>
            </div>
        </div>
    );
};

const ExperienceSection = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const sectionRef = useRef(null);
    
    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate the visible portion of the section
            const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
            
            // If section is not visible at all
            if (visibleHeight <= 0) {
                setScrollProgress(rect.top > 0 ? 0 : 1);
                return;
            }
            
            // Calculate what percentage of the section is currently visible
            // Start when section enters viewport, end when it's 80% through
            const sectionHeight = rect.height;
            const viewportPercentage = visibleHeight / sectionHeight;
            
            // Calculate the position relative to viewport
            // 0 means top of section just entered viewport
            // 1 means bottom of section is at bottom of viewport
            const viewportPosition = (windowHeight - rect.top) / (windowHeight + sectionHeight);
            
            // Combine these factors to get a smoother progress that depends on how much
            // of the section is visible and where it is in the viewport
            let progress = viewportPosition * 1.1; // Slowed down by factor of 1.5
            
            // Clamp between 0 and 1
            progress = Math.max(0, Math.min(1, progress));
            
            setScrollProgress(progress);
        };
        
        window.addEventListener('scroll', handleScroll);
        handleScroll(); 
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="experience-section" ref={sectionRef}> 
            <p className='title'>Inside The Dehurdle Experience</p>
            <p className='subtitle'>The Dehurdle experience is designed as a 3-month executive transformation program that adapts and deepens over time.</p>
            
            <div className="timeline-container">
                <div className="timeline-line">
                    <div 
                        className="timeline-progress" 
                        style={{ height: `${scrollProgress * 100}%` }}
                    ></div>
                </div>
                
                <TimelineItem 
                    number="1" 
                    title="Onboarding Session"
                    subtitle="Provides a walkthrough of how to get the most out of the app."
                    isRight={true}
                    progress={scrollProgress}
                />
                <TimelineItem 
                    number="2" 
                    title="Executives engage with the app"
                    subtitle="As per the convenience executives spend time on the app."
                    isRight={false}
                    progress={scrollProgress}
                />
                <TimelineItem 
                    number="3" 
                    title="Monthly Check-ins with certified experts"
                    subtitle="Provides a walkthrough of how to get the most out of the app."
                    isRight={true}
                    progress={scrollProgress}
                />
            </div>
        </div>
    );
}

export default ExperienceSection;