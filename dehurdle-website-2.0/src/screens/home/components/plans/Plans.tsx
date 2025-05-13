import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Plans.scss';

interface CardColors {
  title: string;
  subtitle: string;
}

interface Card {
  id: string;
  title: string;
  subtitle: string;
  activeColors: CardColors;
  inactiveColors: CardColors;
}

const PricingCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(2);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const autoPlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartRef = useRef<number>(0);
  
  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Auto-play for mobile
  useEffect(() => {
    if (isMobile) {
      const timer = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % cards.length);
      }, 3000);
      
      autoPlayTimerRef.current = timer as ReturnType<typeof setTimeout>;
      
      return () => clearInterval(timer);
    }
  }, [isMobile]);
  
  const cards: Card[] = [
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

  const nextSlide = (): void => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const prevSlide = (): void => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const goToSlide = (index: number): void => {
    setActiveIndex(index);
  };

  // Handle touch events for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;

    // Swipe threshold of 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide(); // Swipe left
      } else {
        prevSlide(); // Swipe right
      }
    }
  };

  // Different card indices calculation based on device
  const getVisibleCardIndices = (): number[] => {
    const totalCards = cards.length;
    const indices: number[] = [];
    
    if (isMobile) {
      // Only the active card is visible on mobile
      indices.push(activeIndex);
    } else {
      // V-shape carousel for desktop/tablet
      for (let i = -2; i <= 2; i++) {
        indices.push((activeIndex + i + totalCards) % totalCards);
      }
    }
    
    return indices;
  };

  const visibleCardIndices = getVisibleCardIndices();
  
  return (
    <div className={`carousel-container ${isMobile ? 'mobile' : ''}`}>
      <p className='title'>Find The Right Plan</p>
      <div className="carousel-border">
        <div 
          className="carousel-track" 
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {cards.map((card, index) => {
            const position = visibleCardIndices.indexOf(index);
            if (position === -1) return null;

            let cardStyles: React.CSSProperties;
            let isActive: boolean;

            if (isMobile) {
              // Mobile styling - simple single card
              isActive = index === activeIndex;
              cardStyles = {
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 10 : 0,
                transform: `translateX(${(index - activeIndex) * 100}%)`,
                transition: 'all 0.3s ease-in-out',
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                margin: 'auto',
                border: `2px solid ${card.activeColors.title}`,
                visibility: isActive ? 'visible' : 'hidden',
              };
            } else {
              // Desktop V-shape styling
              isActive = position === 2; // Center position
              cardStyles = {
                opacity: 1,
                zIndex: 10 - Math.abs(position - 2),
                transform: `
                      translateX(${(position - 2) * 50}%) 
                      translateY(${isActive ? 0 : -Math.abs(position - 2) * 40}px) 
                      scale(${isActive ? 1 : 0.85})
                  `,
                border: `2px solid ${isActive ? card.activeColors.title : card.inactiveColors.title}`,
                boxShadow: isActive ? `0 4px 10px rgba(0, 0, 0, 0.15)` : `0 2px 5px rgba(0, 0, 0, 0.1)`,
              };
            }

            const titleColor = isActive ? card.activeColors.title : card.inactiveColors.title;
            const subtitleColor = isActive ? card.activeColors.subtitle : card.inactiveColors.subtitle;

            return (
              <div
                key={index}
                className={`carousel-card carousel-card-${card.id} ${isActive ? 'active' : ''}`}
                style={cardStyles}
              >
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
                  {card.subtitle}
                </p>
              </div>
            );
          })}
        </div>
        
        {/* Navigation dots - always visible */}
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
        
        {/* Navigation arrows - only for desktop/tablet */}
        {!isMobile && (
          <>
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
          </>
        )}
        
        {/* "Explore All Plans" button */}
        <div className="explore-button-container">
          <button className="explore-button">
            Explore All Plans
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingCarousel;