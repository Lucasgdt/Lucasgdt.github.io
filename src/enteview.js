document.addEventListener('DOMContentLoaded', () => {
  const enterView = document.getElementById('EnterView');
  const text = enterView.querySelector('.text');

  // Laisse le texte pendant 2.5s, puis fade-out
  gsap.to(text, {
      opacity: 0,
      duration: 0.5,
      ease: "power1.out",
      onComplete: () => {
        gsap.to(enterView, {
          opacity: 0,
          duration: 0.5,
          delay: 0.6,
          ease: "power1.out",
          onComplete: () => {
            enterView.style.display = 'none'; // Cache l'élément après l'animation
          }
        });
      }
    });
});