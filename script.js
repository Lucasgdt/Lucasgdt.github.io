// Ajoute ce script en bas de ton <body>, ou dans un fichier JS lié
document.addEventListener('DOMContentLoaded', function () {
  const menu = document.getElementById('menu-overlay');
  const burger = document.getElementById('burger');
  const closeMenu = document.getElementById('close-menu');
  const menuLinks = menu.querySelectorAll('a[data-page]');
  const pages = document.querySelectorAll('.page');

  // Ouvre le menu
  burger.addEventListener('click', function () {
    menu.classList.add('open');
  });

  // Ferme le menu
  closeMenu.addEventListener('click', function () {
    menu.classList.remove('open');
  });

  // Quand on clique sur un lien de menu overlay
  menuLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const page = this.getAttribute('data-page');
      showPage(page);
      menu.classList.remove('open');
    });
  });

  function showPage(pageName) {
    pages.forEach(section => {
      section.style.display = section.getAttribute('data-page') === pageName ? 'block' : 'none';
    });
    // Mettre à jour l'état "is-selected" dans le header
    navLinks.forEach(link => {
      link.parentElement.classList.toggle('is-selected', link.getAttribute('data-page') === pageName);
    });
  }
});
