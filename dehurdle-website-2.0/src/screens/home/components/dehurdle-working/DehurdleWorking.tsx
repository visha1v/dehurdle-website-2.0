import React from 'react';
import './DeWorking.scss';
import {WorkFlowChart} from 'assets';

const DehurdleWorking: React.FC = () => {
    return (
        <section className="dehurdle-working">
            <p className='work-title'>How Dehurdle Works</p>
            <p className='work-subtitle'>Continuous. Personalized. Research-Backed. Behavior-Changing. </p>
            <WorkFlowChart className='flow-chart' />
        </section>
    );

};

export default DehurdleWorking;