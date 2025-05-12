import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import "./Home.css";
import ExperienceSection from './ExperienceSection.js';
import Plans from './Plans.js';

const Counter = ({ end, suffix = '+' ,color}) => {
    const [count, setCount] = useState(0);
    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: true
    });

    useEffect(() => {
        if (inView) {
            const duration = 2000; // 2 seconds
            const steps = 60;
            const increment = end / steps;
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, duration / steps);
            return () => clearInterval(timer);
        }
    }, [inView, end]);

    return (
        <div ref={ref} className={`counter ${color}`}>
            <span className="counter-number">{count}</span>
            <span className="counter-suffix">{suffix}</span>
        </div>
    );
};

const Wreckers = ({ title, subtitle, link}) => {
    return (
        <div className="wreckers-card">
            <p className='title'>{title}</p>
            <p className='subtitle'>{subtitle}</p>
            <a href={link} className="wrecker-link">LEARN MORE &rarr;</a>
            <img src={`/${title}.svg`}  alt={title} className="wrecker-image" />
            </div>
    )
};


const Home = () => {
    return ( 
        <div className="homePage">
            <div className="section1">
                <div className="text-container">
                    <p className='line1'>Empower executives to overcome <span className='pinkHighlight'>Hurdles</span>,  lead </p>
                    <p className='line2'>with <span className='pinkHighlight'>Clarity</span>,  and <span className='pinkHighlight'>Drive Business Success</span></p>
                    <p className='line3'>Through AI-Powered Coaching.</p>
                    <a href="#" className="demo-link">GET A CUSTOMIZED DEMO &rarr;</a>
                </div>
            </div>
            <div className='counter-section'>
                <p className='top-line'>Trusted By Leading Organisations</p>
                <div className='company-logos'>
                    <div className='image-container'><img src="deloitte-logo.svg"></img></div>
                    <div className='image-container'><img src="inbev-logo.svg"></img></div>
                </div>
                <div className='stats-container'>
                    <div className='stat-item'>
                        <Counter end={500} color="pink" />
                        <p>Executives</p>
                        <p>Coached</p>
                    </div>
                    <div className='stat-item'>
                        <Counter end={1700} color="teal" />
                        <p>Sessions</p>
                        <p>Completed</p>
                    </div>
                    <div className='stat-item'>
                        <Counter end={5500} color="pink" />
                        <p>Activities</p>
                        <p>Completed</p>
                    </div>
                    <div className='stat-item'>
                        <Counter end={17} color="teal" />
                        <p>Countries</p>
                        <p>Served</p>
                    </div>
                </div>
            </div>
            <div className="wreckers-section">
                <p className='wreckers-title'>Key Use Cases Where Dehurdle Creates Impact</p>
                <p className='wreckers-subtitle'>Dehurdle Helps Executives Break Through:</p>
                <div className='wreckers-grid'>
                    <Wreckers title="OVERTHINKER" subtitle="Drowning in a sea of endless thoughts, often paralyzed by over-analysis, and missing out on the beauty of the present." link="" />
                    <Wreckers title="PROCASTINATOR" subtitle="Drowning in a sea of endless thoughts, often paralyzed by over-analysis, and missing out on the beauty of the present." link="" />
                    <Wreckers title="DISTRACTOR" subtitle="Easily lost in constant distractions, weakening your focus and diluting the achievement of your goals." link="" />
                    <Wreckers title="PLEASER" subtitle="Constantly seeking external validation, often at the expense of self-worth and inner happiness." link="" />
                    <Wreckers title="PESSIMIST" subtitle="Seeing the glass as perpetually half empty, draining your energy and stifling your personal growth." link="" />
                    <Wreckers title="COMPARER" subtitle="Continuously measuring yourself against others, breeding feelings of inadequacy and overshadowing your unique strengths." link="" />
                    <Wreckers title="FEARFUL" subtitle="Dominated by fear, imprisoned in comfort zones, and held back from pursuing your dreams." link="" />
                    <Wreckers title="HYPER-EMOTIONAL" subtitle="Intense emotions leading to impulsiveness, often challenging your ability to maintain balance and harmony." link="" />
                </div>
            </div>
            <div className="work-section">
                <p className='work-title'>How Dehurdle Works</p>
                <p className='work-subtitle'>Continuous. Personalized. Research-Backed. Behavior-Changing. </p>
                <img src="working-flow.svg" alt="How Dehurdle Works" className="work-image" />
            </div>
            <div className="experience-section">
                <ExperienceSection />
            </div>
            <div className="reviews-section"></div>
            <div className="plans-section">
                <Plans />
            </div>

        </div>
     );
}
 
export default Home;