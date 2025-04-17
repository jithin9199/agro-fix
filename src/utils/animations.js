/**
 * Handles scroll animations for elements with the 'animate-on-scroll' class
 */
export const initScrollAnimations = () => {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  if (animatedElements.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.2 });
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
};

/**
 * Handles parallax effect for the hero section
 * @param {React.RefObject} ref - Reference to the hero section element
 */
export const initParallaxEffect = (ref) => {
  if (!ref || !ref.current) return;
  
  const handleScroll = () => {
    if (!ref || !ref.current) return;
    
    const scrollPosition = window.scrollY;
    ref.current.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
  };
  
  window.addEventListener('scroll', handleScroll);
  
  // Cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}; 