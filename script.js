(() => {
  // Année dans le pied de page
  document.getElementById("year").textContent = "· " + new Date().getFullYear();

  // Menu mobile
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("menu");
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  menu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  // Lien actif selon la section visible
  const links = [...menu.querySelectorAll("a")];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href")));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
        );
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach((s) => s && observer.observe(s));

  // Système triphasé : trois sinusoïdes déphasées de 120°
  const paths = document.querySelectorAll(".wave");
  const W = 1200, H = 300, MID = H / 2, AMP = 90, STEPS = 120;
  const shifts = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];

  function draw(t) {
    paths.forEach((p, i) => {
      let d = "";
      for (let s = 0; s <= STEPS; s++) {
        const x = (s / STEPS) * W;
        const y = MID + AMP * Math.sin((s / STEPS) * 4 * Math.PI - shifts[i] - t);
        d += (s === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1);
      }
      p.setAttribute("d", d);
    });
  }

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  draw(0);
  if (!reduce) {
    const start = performance.now();
    const loop = (now) => {
      draw(((now - start) / 1000) * 0.9);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
})();
