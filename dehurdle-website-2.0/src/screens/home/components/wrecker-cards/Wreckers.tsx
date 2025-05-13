import React from 'react';
import './Wreckers.scss';
import Lottie from 'lottie-react';
import {
  OverthinkerLottie,
  ProcrastinatorLottie,
  DistractorLottie,
  PleaserLottie,
  PessimistLottie,
  ComparerLottie,
  FearfulLottie,
  HyperEmotionalLottie
} from '../../../../assets';

const getLottieAnimation = (title: string) => {
  switch(title.toUpperCase()) {
    case 'OVERTHINKER':
      return OverthinkerLottie;
    case 'PROCASTINATOR':
    case 'PROCRASTINATOR': // Fixed spelling to match your asset export
      return ProcrastinatorLottie;
    case 'DISTRACTOR':
      return DistractorLottie;
    case 'PLEASER':
      return PleaserLottie;
    case 'PESSIMIST':
      return PessimistLottie;
    case 'COMPARER':
      return ComparerLottie;
    case 'FEARFUL':
      return FearfulLottie;
    case 'HYPER-EMOTIONAL':
      return HyperEmotionalLottie;
    default:
      return OverthinkerLottie; 
  }
};

interface WreckersCardProps {
  title: string;
  subtitle: string;
  link: string;
}

const WreckersCard: React.FC<WreckersCardProps> = ({ title, subtitle, link }) => {
    const animationData = getLottieAnimation(title);
    return (
        <div className="wreckers-card">
            <div className="card-content">
                <p className='title'>{title}</p>
                <p className='subtitle'>{subtitle}</p>
                <a href={link} className="wrecker-link">LEARN MORE &rarr;</a>
            </div>
            <div className="lottie-container">
                <Lottie 
                    animationData={animationData}
                    loop={true}
                    autoplay={true}
                    className="wrecker-animation" />
            </div>
        </div>
    );
};

const Wreckers: React.FC = () => {

    return(
        <section className="wrecker-section">
            <div className='wreckers-section'>
            <p className='wreckers-title'>Key Use Cases Where Dehurdle Creates Impact</p>
            <p className='wreckers-subtitle'>Dehurdle Helps Executives Break Through:</p>
                <div className='wreckers-grid'>
                    <WreckersCard title="OVERTHINKER" subtitle="Drowning in a sea of endless thoughts, often paralyzed by over-analysis, and missing out on the beauty of the present." link="" />
                    <WreckersCard title="PROCASTINATOR" subtitle="Drowning in a sea of endless thoughts, often paralyzed by over-analysis, and missing out on the beauty of the present." link="" />
                    <WreckersCard title="DISTRACTOR" subtitle="Easily lost in constant distractions, weakening your focus and diluting the achievement of your goals." link="" />
                    <WreckersCard title="PLEASER" subtitle="Constantly seeking external validation, often at the expense of self-worth and inner happiness." link="" />
                    <WreckersCard title="PESSIMIST" subtitle="Seeing the glass as perpetually half empty, draining your energy and stifling your personal growth." link="" />
                    <WreckersCard title="COMPARER" subtitle="Continuously measuring yourself against others, breeding feelings of inadequacy and overshadowing your unique strengths." link="" />
                    <WreckersCard title="FEARFUL" subtitle="Dominated by fear, imprisoned in comfort zones, and held back from pursuing your dreams." link="" />
                    <WreckersCard title="HYPER-EMOTIONAL" subtitle="Intense emotions leading to impulsiveness, often challenging your ability to maintain balance and harmony." link="" />
                </div>
                </div>
        </section>
    );
};

export default Wreckers;