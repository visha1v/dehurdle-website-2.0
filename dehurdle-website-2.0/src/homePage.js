import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import "./homePage.css";

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
                
            </div>

        </div>
     );
}
 
export default HomePage;