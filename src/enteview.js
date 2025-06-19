document.addEventListener('DOMContentLoaded', () => {
  const enterView = document.getElementById('EnterView');
  const text1 = enterView.querySelector('.text1');
  const text2 = enterView.querySelector('.text2');

  // Laisse le texte pendant 2.5s, puis fade-out
  gsap.to(text1, {
      opacity: 0,
      duration: 0.5,
      ease: "power1.out",
      onComplete: () => {
        gsap.to(text2, {
          opacity: 0,
          duration: 0.5,
          delay: 0.5,
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
      }
    });
});