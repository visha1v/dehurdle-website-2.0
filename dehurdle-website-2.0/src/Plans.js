import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Plans.css';

export default function PricingCarousel() {
  const [activeIndex, setActiveIndex] = useState(2);
  
  const cards = [
    {
      id: 'sea',
      title: "The Sea",
      subtitle: "Built For Organization Transformation",
      activeColors: {
        title: "#176E6D",
        subtitle: "#292F36"
      },
      inactiveColors: {
        title: "#A0EFE4", 
        subtitle: "#C9D3D8"
      }
    },
    {
      id: 'lite',
      title: "Lite Plan",
      subtitle: "Ideal For Startups & Experiments Early Rollout",
      activeColors: {
        title: "#E28D00",
        subtitle: "#292F36"
      },
      inactiveColors: {
        title: "#F3EA91", 
        subtitle: "#C9D3D8"
      }
    },
    {
        id: 'free',
        title: "Free Trial",
        subtitle: "7 Days, Zero Commitment", 
        activeColors: {
            title: "#D72B6A",
            subtitle: "#292F36"
        },
        inactiveColors: {
            title: "#FAD0E5", 
            subtitle: "#C9D3D8"
        }
},
    {
      id: 'membership',
      title: "Membership Plan",
      subtitle: "Structured Sprints & Measurable Growth",
      activeColors: {
        title: "#176E6D",
        subtitle: "#292F36"
      },
      inactiveColors: {
        title: "#A0EFE4", 
        subtitle: "#C9D3D8"
      }
    },
    {
      id: 'custom',
      title: "Custom",
      subtitle: "Per The Needs Of Organization",
      activeColors: {
        title: "#E28D00",
        subtitle: "#292F36"
      },
      inactiveColors: {
        title: "#F3EA91", 
        subtitle: "#C9D3D8"
      }
    },
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  // Calculate indices for visible cards
  const getVisibleCardIndices = () => {
    const totalCards = cards.length;
    const indices = [];
    
    // Add the active card and two cards on each side
    for (let i = -2; i <= 2; i++) {
      indices.push((activeIndex + i + totalCards) % totalCards);
    }
    
    return indices;
  };

  const visibleCardIndices = getVisibleCardIndices();
  
  return (
    <div className="carousel-container">
      <p className='title'>Find The Right Plan</p>
      <div className="carousel-border">
        <div className="carousel-track">
          {cards.map((card, index) => {
            const position = visibleCardIndices.indexOf(index);
            if (position === -1) return null;

            const isActive = position === 2;
            const titleColor = isActive ? card.activeColors.title : card.inactiveColors.title;
            const subtitleColor = isActive ? card.activeColors.subtitle : card.inactiveColors.subtitle;
            
            const cardStyles = {
              opacity: 1,
              zIndex: 10 - Math.abs(position - 2),
              transform: `
                    translateX(${(position - 2) * 50}%) 
                    translateY(${isActive ? 0 : -Math.abs(position - 2) * 40}px) 
                    scale(${isActive ? 1 : 0.85})
                `,
            };
            return (
            <div
                key={index}
                className={`carousel-card carousel-card-${card.id}`}
                style={{
                ...cardStyles,
                border: `2px solid ${titleColor}`,
                boxShadow: isActive ? `0 4px 10px rgba(0, 0, 0, 0.15)` : `0 2px 5px rgba(0, 0, 0, 0.1)`,
                }}>
                <h3 
                className={`card-title title-${card.id}`}
                style={{ color: titleColor, transition: 'color 0.5s ease-in-out' }}
                >
                {card.title}
                </h3>
                <p 
                className="card-subtitle"
                style={{ color: subtitleColor, transition: 'color 0.5s ease-in-out' }}
                >
                {card.subtitle || card.description}
                </p>
            </div>
            );
          })}
        </div>
        
        {/* Navigation dots */}
        <div className="indicator-dots">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`indicator-dot ${activeIndex === index ? 'active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="nav-button nav-button-prev"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={nextSlide}
          className="nav-button nav-button-next"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
        
        {/* "Explore All Plans" button */}
        <div className="explore-button-container">
          <button className="explore-button">
            Explore All Plans
          </button>
        </div>
      </div>
    </div>
  );
}