document.addEventListener('DOMContentLoaded', function () {
  const burger = document.querySelector('.burger-btn');
  const menu = document.getElementById('menu');
  const menuLinks = menu.querySelectorAll('li');
  const pages = document.querySelectorAll('.page');

  // Page courante affichée
  let currentPage = "home";

  // Animation d'apparition d'une section
  function animateIn(element, duration = 400) {
    element.style.display = 'block';
    element.style.transform = 'translateX(100px)';
    element.style.filter = 'blur(4px)';
    element.style.transition = 'none';
    element.offsetHeight; // Force le repaint

    element.style.transition = `transform ${duration}ms ease, filter ${duration}ms ease`;
    element.style.transform = 'translateX(0)';
    element.style.filter = 'blur(0px)';
  }

  // Affiche la page demandée et met à jour le menu
  function showPage(pageName) {
    currentPage = pageName;
    setTimeout(() => {
     menuLinks.forEach(li => {
      li.style.display = (li.getAttribute('data-page') === currentPage) ? "none" : "";
     });
    }, 300);
    pages.forEach(section => {
     const isCurrent = section.getAttribute('data-page') === pageName;
     if (isCurrent) {
      animateIn(section, 400);
     } else {
      section.style.display = 'none';
     }
    });
  }

  // Ouvre/ferme le menu burger
  burger.addEventListener('click', function () {
    burger.classList.toggle('open');
    menu.classList.toggle('open');
  });

  // Navigation : clic sur un lien du menu
  menuLinks.forEach(li => {
    li.addEventListener('click', function (e) {
     e.preventDefault();
     const page = li.getAttribute('data-page');
     menu.classList.remove('open');
     burger.classList.remove('open');
     showPage(page);
    });
  });

  // Affiche la page par défaut au chargement
  showPage(currentPage);
});
