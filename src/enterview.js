  // léger benchmark
  function benchmark(duration = 1000) {
  return new Promise(resolve => {
    let frameCount = 0;
    const start = performance.now();

    function frame() {
      const now = performance.now();
      if (now - start < duration) {
        frameCount++;
        requestAnimationFrame(frame);
      } else {
        const fps = frameCount / (duration / 1000);
        resolve(fps);
      }
    }

    requestAnimationFrame(frame);
  });
}





export function enterview(onComplete) {
  const enterView = document.getElementById('EnterView');
  const text1 = enterView.querySelector('.text1');
  const text2 = enterView.querySelector('.text2');
  let benchmarkfps = 60;

  benchmark().then(fps => {
    benchmarkfps = Math.round(fps);
  })
  // Laisse le texte pendant 2.25s, puis fade-out
  gsap.to(text1, {
      opacity: 0,
      duration: 0.25,
      ease: "power1.out",
      onComplete: () => {
        gsap.to(text2, {
          opacity: 0,
          duration: 0.25,
          delay: 0.25,
          ease: "power1.out",
          onComplete: () => {
            gsap.to(enterView, {
              opacity: 0,
              duration: 0.5,
              delay: 0.5,
              ease: "power1.out",
              onComplete: () => {
                enterView.remove();
                if (typeof onComplete === "function") {
                  onComplete(benchmarkfps);
                }
              }
            });
          }
        });
      }
    });
};