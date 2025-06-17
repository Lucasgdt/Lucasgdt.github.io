document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".main-nav a[data-section]");
  const contentContainer = document.getElementById("dynamic-container");

  // Fonction pour charger une section
  const loadSection = async (section) => {
    try {
      const res = await fetch(`sections/${section}.html`);
      if (!res.ok) throw new Error("Section introuvable");
      const html = await res.text();
      contentContainer.innerHTML = html;
    } catch (err) {
      contentContainer.innerHTML = `<p>Erreur : ${err.message}</p>`;
    }
  };

  // Gérer les clics sur les liens
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const section = link.dataset.section;
      loadSection(section);
    });
  });

  // Charger "home" par défaut
  loadSection("home");
  console.log("Chargement de la home...");
});
