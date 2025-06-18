document.addEventListener('DOMContentLoaded', function () {
  const burger = document.querySelector('.burger-btn');
  const menu = document.getElementById('menu');
  const menuLinks = menu.querySelectorAll('li');
  const pages = document.querySelectorAll('.page');

  // Stocke la page courante
  let currentPage = "home"; // ou la page par défaut

  // Fonction pour afficher une page et mettre à jour le menu
  function showPage(pageName) {
    currentPage = pageName;
    pages.forEach(section => {
      section.style.display = section.getAttribute('data-page') === pageName ? 'block' : 'none';
    });
    // Masque l'item du menu qui correspond à la page courante
    menuLinks.forEach(li => {
      li.style.display = (li.getAttribute('data-page') === pageName) ? "none" : "";
    });
    // Tu peux aussi gérer la classe active sur les liens si besoin
  }

  // Toggle menu on burger click
  burger.addEventListener('click', function () {
    const isOpen = menu.classList.toggle('open');
    if (isOpen) {
      // Met à jour la visibilité des items à chaque ouverture
      menuLinks.forEach(li => {
        li.style.display = (li.getAttribute('data-page') === currentPage) ? "none" : "";
      });
    }
  });

  // Navigation : quand on clique sur un lien du menu
  menuLinks.forEach(li => {
    li.addEventListener('click', function (e) {
      e.preventDefault();
      const page = li.getAttribute('data-page');
      showPage(page);
      sideMenu.classList.remove('open');
    });
  });

  // Initialisation sur la page par défaut
  showPage(currentPage);
});
