import React, { useEffect, useState, useRef } from 'react';
import './ExperienceSection.scss';

interface TimelineItemProps {
    number: string;
    title: string;
    subtitle: string;
    isRight: boolean;
    progress: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ number, title, subtitle, isRight, progress }) => {
    // Calculate if this item should be active based on scroll progress
    // Adjusted formula to slow down activation
    const isActive = progress >= (Number(number) * 0.2); // Increased multiplier to slow down
    
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

const ExperienceSection: React.FC = () => {
    const [scrollProgress, setScrollProgress] = useState<number>(0);
    const sectionRef = useRef<HTMLDivElement>(null);
    const timelineContainerRef = useRef<HTMLDivElement>(null);
    const timelineLineRef = useRef<HTMLDivElement>(null);
    
    // Handle scroll to update progress
    useEffect(() => {
        const handleScroll = (): void => {
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
            const sectionHeight = rect.height;
            
            // Calculate the position relative to viewport
            // 0 means top of section just entered viewport
            // 1 means bottom of section is at bottom of viewport
            const viewportPosition = (windowHeight - rect.top) / (windowHeight + sectionHeight);
            
            // Combine these factors to get a smoother progress
            let progress = viewportPosition * 1.5; // Slowed down by factor
            
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
    
    // Position timeline line to start at first circle and end at last
    useEffect(() => {
        const positionTimelineLine = () => {
            const circles = document.querySelectorAll('.circle');
            const timelineLine = timelineLineRef.current;
            const container = timelineContainerRef.current;
            
            if (circles.length >= 2 && timelineLine && container) {
                try {
                    const firstCircle = circles[0].getBoundingClientRect();
                    const lastCircle = circles[circles.length - 1].getBoundingClientRect();
                    const containerRect = container.getBoundingClientRect();
                    
                    // Calculate the top position of the first circle relative to the container
                    const firstCircleTop = firstCircle.top - containerRect.top;
                    
                    // Calculate the bottom position of the last circle relative to the container
                    const lastCircleBottom = lastCircle.bottom - containerRect.top;
                    
                    // Calculate the height of the line
                    const lineHeight = lastCircleBottom - firstCircleTop;
                    
                    // Position line to start at the center of the first circle
                    timelineLine.style.top = `${firstCircleTop + 20}px`; // 20px is half the circle height
                    
                    // Set height to go from first circle center to last circle center
                    timelineLine.style.height = `${lineHeight - 40}px`; // Subtract circle heights
                    
                    // Add a class to indicate successful positioning
                    container.classList.add('js-positioned');
                } catch (error) {
                    console.error("Error positioning timeline:", error);
                }
            }
        };
        
        // Run multiple times to ensure it works after all elements are properly rendered
        const timers = [
            setTimeout(positionTimelineLine, 100),
            setTimeout(positionTimelineLine, 500),
            setTimeout(positionTimelineLine, 1000)
        ];
        
        window.addEventListener('resize', positionTimelineLine);
        window.addEventListener('load', positionTimelineLine);
        
        return () => {
            timers.forEach(clearTimeout);
            window.removeEventListener('resize', positionTimelineLine);
            window.removeEventListener('load', positionTimelineLine);
        };
    }, []);

    return (
        <div className="experience-section" ref={sectionRef}> 
            <p className="title">Inside The Dehurdle Experience</p>
            <p className="subtitle">The Dehurdle experience is designed as a 3-month executive transformation program that adapts and deepens over time.</p>
            
            <div className="timeline-container" ref={timelineContainerRef}>
                <div className="timeline-line" ref={timelineLineRef}>
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
            <div className="timeline-button-container">
                <button className="timeline-button">SEE DEHURDLE IN ACTION</button>
            </div>
        </div>
    );
}

export default ExperienceSection;