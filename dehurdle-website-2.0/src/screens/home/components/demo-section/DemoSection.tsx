import React from 'react';
import './DemoSection.scss';
import { ExecutiveArt } from 'assets';

const DemoSection: React.FC = () => {

    return (
        <section className="demo-section">
            <div className="content">
                <p>Ready To Build Future-Ready Executives?</p>
                <div className="explore-button-container">
                    <button className="explore-button">
                        Explore All Plans
                    </button>
                </div>
            </div>
            <ExecutiveArt className="executive-art" />
        </section>
    );

};

export default DemoSection;