document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector('.menu-icon');
    const menu = document.getElementById('menu');
  
    menuIcon.addEventListener('click', function () {
        menu.classList.toggle('open');
        if (menu.classList.contains('open')) {
            menuIcon.textContent = '✖';
        } else {
            menuIcon.textContent = '☰';
        }
    });
  });
  

  const currentYear = new Date().getFullYear();
  const copyrightYear = document.getElementById("copyrightYear");
  copyrightYear.textContent = `©${currentYear}`;
  
  const lastModifiedDate = new Date(document.lastModified);
  const lastModified = document.getElementById("lastModified");
  lastModified.textContent = `Last Modified: ${lastModifiedDate.toLocaleDateString()}`;