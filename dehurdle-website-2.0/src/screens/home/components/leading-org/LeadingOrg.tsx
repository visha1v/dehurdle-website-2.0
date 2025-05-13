import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import './LeadingOrg.scss';
import { DeloitteIcon, ABInBevIcon } from '../../../../assets';

interface CounterProps {
  end: number;
  suffix?: string;
  color: 'pink' | 'teal';
}

const Counter: React.FC<CounterProps> = ({ end, suffix = '+', color }) => {
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

const LeadingOrg: React.FC = () => {
  return (
    <section className="counter-section">
      <p className='top-line'>Trusted By Leading Organisations</p>
      <div className='company-logos'>
        <div className='image-container'><DeloitteIcon /></div>
        <div className='image-container'><ABInBevIcon /></div>
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
    </section>
  );
};

export default LeadingOrg;