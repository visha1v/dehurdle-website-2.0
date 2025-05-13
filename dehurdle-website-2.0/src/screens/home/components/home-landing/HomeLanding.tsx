import React from 'react';
import './HomeLanding.scss';
import {AppScreens} from 'assets';

const HomeLanding: React.FC = () => {

    return(<section className="home-landing">
        <div className="home-landing__content">
            <p className="home-landing__content--title">Empower Executives to Overcome <span className="highlight">Hurdles</span>, Lead with <span className="highlight">Clarity</span>, And <span className="highlight">Drive Business Success</span></p>
            <p className="home-landing__content--description">Through AI-Powered Coaching.</p>
            <a href="#" className="demo-link">GET A CUSTOMIZED DEMO &rarr;</a>
            </div>
        <div className="home-landing__image">
            <img src={AppScreens} alt="App Screens" />
            </div>
    </section>
    );
};

export default HomeLanding;