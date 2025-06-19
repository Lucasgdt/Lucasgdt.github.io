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
     setTimeout(() => {
      menuLinks.forEach(li => {
        li.style.display = (li.getAttribute('data-page') === currentPage) ? "none" : "";
      }); 
    }, 300);
     pages.forEach(section => {
       section.style.display = section.getAttribute('data-page') === pageName ? 'block' : 'none';
     });
   }
 
   // Toggle menu on burger click
   burger.addEventListener('click', function () {
    burger.classList.toggle('open');
    menu.classList.toggle('open');
   });
 
   // Navigation : quand on clique sur un lien du menu
   menuLinks.forEach(li => {
     li.addEventListener('click', function (e) {
       e.preventDefault();
       const page = li.getAttribute('data-page');
       menu.classList.remove('open');
       burger.classList.remove('open');
       showPage(page);
     });
   });
 
   // Initialisation sur la page par défaut
   showPage(currentPage);
 });
