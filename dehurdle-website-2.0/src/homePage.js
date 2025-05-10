import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import "./homePage.css";

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


const HomePage = () => {
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

        </div>
     );
}
 
export default HomePage;