document.addEventListener("DOMContentLoaded", () => {
  // 1. Control del Menú Móvil
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", !isExpanded);
      navLinks.classList.toggle("active");
    });

    // Cierra el menú al hacer clic en cualquier enlace
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 2. Copiar correo al portapapeles con feedback instantáneo
  const btnCopy = document.getElementById("btn-copy");
  const emailText = document.getElementById("email-text");
  const copyToast = document.getElementById("copy-toast");

  if (btnCopy && emailText) {
    btnCopy.addEventListener("click", async () => {
      const email = emailText.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        
        // Efecto en el botón
        const originalText = btnCopy.textContent;
        btnCopy.textContent = "¡Copiado!";
        
        // Alerta visual
        if (copyToast) {
          copyToast.classList.add("visible");
        }

        setTimeout(() => {
          btnCopy.textContent = originalText;
          if (copyToast) {
            copyToast.classList.remove("visible");
          }
        }, 2500);
      } catch (err) {
        // Fallback en caso de navegadores restrictivos
        window.location.href = `mailto:${email}`;
      }
    });
  }

  // 3. Resaltar sección activa en el Navbar al hacer Scroll
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links .nav-link");

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  window.addEventListener("scroll", highlightNavOnScroll, { passive: true });

  // 4. Año dinámico automático
  const yearElement = document.querySelector("#year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});